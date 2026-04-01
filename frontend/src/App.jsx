import { useState, useEffect, useRef } from 'react'
import { analyzeCrop } from './data'

import Navbar from './components/navbar'
import Hero from './components/hero'
import FieldRecords from './components/field_records'
import AddDataModal from './components/add'
import EditModal from './components/edit'
import DeleteModal from './components/delete'
import DeleteAllModal from './components/delete_all'
import Toast from './components/toast'

const emptyForm = {
  plant_name: '', soil_moisture: '', soil_temperature: '', soil_ph: '',
  air_temperature: '', humidity: '', leaf_wetness: ''
}

const PLANT_NAMES = ['Cacao', 'Rice', 'Banana', 'Corn', 'Tomato', 'Cassava', 'Sweet Potato', 'Sugarcane', 'Coffee Beans', 'Mango', 'Papaya', 'Pineapple', 'Coconut', 'Eggplant', 'Mongo']
const rand = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2))

const generateRandomRecord = () => ({
  plant_name: PLANT_NAMES[Math.floor(Math.random() * PLANT_NAMES.length)],
  soil_moisture: rand(10, 95),
  soil_temperature: rand(10, 45),
  soil_ph: rand(4.5, 8.5),
  air_temperature: rand(15, 42),
  humidity: rand(20, 98),
  leaf_wetness: rand(0, 100),
})

const delay = (ms) => new Promise(r => setTimeout(r, ms))

function App() {
  const [sensors, setSensors] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [analysisResults, setAnalysisResults] = useState({})
  const [analyzingIds, setAnalyzingIds] = useState({})
  const [deleteModalId, setDeleteModalId] = useState(null)
  const [editModal, setEditModal] = useState(null)
  const [editFormData, setEditFormData] = useState(emptyForm)
  const [addDataModal, setAddDataModal] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [isDeletingAll, setIsDeletingAll] = useState(false)
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false)
  const [notifications, setNotifications] = useState([])

  const recordsRef = useRef(null)

  const fetchSensors = async () => {
    const res = await fetch('http://localhost:8000/api/v1/posts/')
    const data = await res.json()
    setSensors(data)
    return data
  }

  useEffect(() => { fetchSensors() }, [])

  const pushNotification = (text, type = 'info') => {
    const id = Date.now() + Math.random()
    setNotifications(prev => [{ id, text, type }, ...prev])
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8000/api/v1/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => {
      setFormData(emptyForm)
      setAddDataModal(false)
      fetchSensors()
      pushNotification('Record saved successfully.', 'success')
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/v1/posts/${editModal}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData)
    }).then(() => {
      setEditModal(null)
      fetchSensors()
      pushNotification('Record updated.', 'info')
    })
  }

  const handleConfirmDelete = () => {
    if (!deleteModalId) return
    fetch(`http://localhost:8000/api/v1/posts/${deleteModalId}/`, { method: 'DELETE' })
      .then(() => {
        fetchSensors()
        setAnalysisResults(prev => { const n = { ...prev }; delete n[deleteModalId]; return n })
        setDeleteModalId(null)
        pushNotification('Record deleted.', 'warning')
      })
  }

  const handleRunDiagnostics = async (sensor) => {
    setAnalyzingIds(prev => ({ ...prev, [sensor.id]: true }))
    await delay(1200)
    const result = analyzeCrop(sensor)
    setAnalysisResults(prev => ({ ...prev, [sensor.id]: result }))
    setAnalyzingIds(prev => { const n = { ...prev }; delete n[sensor.id]; return n })
    pushNotification(`${sensor.plant_name}: Risk level ${result.riskLevel}`, result.riskLevel === 'LOW' ? 'success' : result.riskLevel === 'HIGH' ? 'error' : 'warning')
  }

  const handleRunAllDiagnostics = async () => {
    if (sensors.length === 0) return
    pushNotification('Running diagnostics on all field records...', 'info')
    await Promise.all(sensors.map(s => handleRunDiagnostics(s)))
    pushNotification('Completed diagnostics for all records.', 'success')
  }

  const handleDeleteAll = async () => {
    const ids = sensors.map(s => s.id)
    if (ids.length === 0) return
    setIsDeletingAll(true)
    pushNotification(`Clearing all ${ids.length} records...`, 'warning')
    try {
      for (const id of ids) {
        await fetch(`http://localhost:8000/api/v1/posts/${id}/`, { method: 'DELETE' })
      }
      setSensors([])
      setAnalysisResults({})
      setShowDeleteAllConfirm(false)
      pushNotification('All field records cleared successfully.', 'success')
    } catch {
      pushNotification('Failed to clear some records.', 'error')
      fetchSensors()
    } finally {
      setIsDeletingAll(false)
    }
  }

  const handleSimulate = async () => {
    if (isSimulating) return
    setIsSimulating(true)

    setTimeout(() => {
      const recordsElement = document.getElementById('field-records') || recordsRef.current;
      if (recordsElement) {
        recordsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    await delay(1000)

    for (let i = 0; i < 10; i++) {
      await delay(1000)
      const record = generateRandomRecord()
      let newSensor
      try {
        const res = await fetch('http://localhost:8000/api/v1/posts/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record)
        })
        newSensor = await res.json()
      } catch {
        pushNotification(`Failed to create record ${i + 1}.`, 'error')
        continue
      }

      await fetchSensors()
      pushNotification(`Created: ${record.plant_name} (${i + 1}/10)`, 'info')
      await delay(400)
      setAnalyzingIds(prev => ({ ...prev, [newSensor.id]: true }))
      await delay(1400)
      const result = analyzeCrop(newSensor)
      setAnalysisResults(prev => ({ ...prev, [newSensor.id]: result }))
      setAnalyzingIds(prev => { const n = { ...prev }; delete n[newSensor.id]; return n })
      pushNotification(`${record.plant_name}: Risk level ${result.riskLevel}`, result.riskLevel === 'LOW' ? 'success' : result.riskLevel === 'HIGH' ? 'error' : 'warning')
    }
    setIsSimulating(false)
    pushNotification('Simulation complete — 10 records created & analyzed.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#E4E9D8] text-[#163321]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />

      <Hero onSimulate={handleSimulate} isSimulating={isSimulating} />

      <FieldRecords
        sensors={sensors}
        onAdd={() => setAddDataModal(true)}
        onDelete={setDeleteModalId}
        onEdit={(s) => { setEditFormData(s); setEditModal(s.id) }}
        onRunDiagnostics={handleRunDiagnostics}
        onRunAll={handleRunAllDiagnostics}
        onDeleteAll={() => setShowDeleteAllConfirm(true)}
        isSimulating={isSimulating}
        isDeletingAll={isDeletingAll}
        analysisResults={analysisResults}
        analyzingIds={analyzingIds}
        recordsRef={recordsRef}
      />

      <AddDataModal
        isOpen={addDataModal}
        onClose={() => setAddDataModal(false)}
        formData={formData}
        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        onSubmit={handleAddSubmit}
      />

      <EditModal
        isOpen={!!editModal}
        onClose={() => { setEditModal(null); setEditFormData(emptyForm) }}
        formData={editFormData}
        onChange={(e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value })}
        onSubmit={handleEditSubmit}
      />

      <DeleteModal
        isOpen={!!deleteModalId}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalId(null)}
      />

      <DeleteAllModal
        isOpen={showDeleteAllConfirm}
        onConfirm={handleDeleteAll}
        onCancel={() => setShowDeleteAllConfirm(false)}
        isDeleting={isDeletingAll}
        sensorCount={sensors.length}
      />

      <Toast notifications={notifications} />
    </div>
  )
}

export default App
