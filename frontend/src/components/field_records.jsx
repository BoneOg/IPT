import React from 'react'
import { PlusIcon, PlayIcon, TrashIcon, SpinnerIcon } from './Icons'

const FieldRecords = ({
    sensors,
    onAdd,
    onDelete,
    onEdit,
    onRunDiagnostics,
    onRunAll,
    onDeleteAll,
    isSimulating,
    isDeletingAll,
    analysisResults,
    analyzingIds,
    recordsRef
}) => {
    return (
        <section id="field-records" ref={recordsRef} className="px-8 md:px-16 pb-24 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl tracking-tight mb-2" style={{ fontWeight: 400 }}>Field Records</h2>
                    <p className="text-sm opacity-55 font-light">Monitor and manage all active crop sensor distributions.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onRunAll}
                        disabled={sensors.length === 0 || isSimulating}
                        className="flex items-center gap-2 bg-[#163321]/5 text-[#163321] font-semibold py-2.5 px-6 rounded-full hover:bg-[#163321]/10 transition-colors text-xs border border-[#163321]/10 disabled:opacity-40"
                    >
                        <PlayIcon />
                        Run All Diagnostics
                    </button>
                    <button
                        onClick={onDeleteAll}
                        disabled={sensors.length === 0 || isSimulating || isDeletingAll}
                        className="flex items-center gap-2 bg-red-600/5 text-red-700 font-semibold py-2.5 px-6 rounded-full hover:bg-red-600/10 transition-colors text-xs border border-red-600/10 disabled:opacity-40"
                    >
                        <TrashIcon />
                        Delete All
                    </button>
                    <div className="w-px h-6 bg-[#163321]/10 mx-1 hidden sm:block" />
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 bg-[#163321] text-[#E4E9D8] font-semibold py-2.5 px-7 rounded-full hover:bg-[#163321]/85 transition-colors text-xs shadow-md"
                    >
                        <PlusIcon />
                        Add New Data
                    </button>
                </div>
            </div>

            {sensors.length === 0 ? (
                <div className="bg-[#C7DBB8] p-10 rounded-[2rem] text-center">
                    <p className="text-lg font-light opacity-80">No records found. Click <strong>Simulate</strong> or <strong>Add New Data</strong> to begin.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sensors.map((sensor) => {
                        const analysis = analysisResults[sensor.id]
                        const isAnalyzing = !!analyzingIds[sensor.id]

                        return (
                            <div key={sensor.id} className="bg-[#C7DBB8] text-[#163321] rounded-[2rem] p-7 h-[620px] flex flex-col justify-between shadow-sm hover:scale-[1.015] transition-transform duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl tracking-tight leading-tight" style={{ fontWeight: 500 }}>{sensor.plant_name}</h3>
                                        <span className="text-[10px] font-mono text-[#163321]/50">Record #{sensor.id}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(sensor)} className="text-xs px-4 py-1.5 rounded-full font-medium text-[#C7DBB8] bg-[#163321] hover:opacity-80 transition-opacity">Edit</button>
                                        <button onClick={() => onDelete(sensor.id)} className="text-xs px-4 py-1.5 rounded-full font-medium bg-red-800 text-red-100 hover:opacity-80 transition-opacity">Delete</button>
                                    </div>
                                </div>

                                <div className="border-t border-[#163321]/10 pt-4 grid grid-cols-3 gap-y-4 gap-x-2 text-sm">
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">Moisture</span><span className="font-semibold">{sensor.soil_moisture}%</span></div>
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">Soil Temp</span><span className="font-semibold">{sensor.soil_temperature}°C</span></div>
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">pH Level</span><span className="font-semibold">{sensor.soil_ph}</span></div>
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">Air Temp</span><span className="font-semibold">{sensor.air_temperature}°C</span></div>
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">Humidity</span><span className="font-semibold">{sensor.humidity}%</span></div>
                                    <div><span className="text-[10px] uppercase tracking-wider text-[#163321]/50 block mb-0.5">Leaf Wet</span><span className="font-semibold">{sensor.leaf_wetness}%</span></div>
                                </div>

                                <div className="mt-6 flex-1 flex flex-col justify-end">
                                    <div className="bg-[#E4E9D8] rounded-2xl p-5 h-[360px] flex flex-col justify-between transition-all duration-300">
                                        <div>
                                            {isAnalyzing ? (
                                                <div className="py-20 flex flex-col items-center justify-center gap-3 text-sm text-[#163321]/60">
                                                    <SpinnerIcon />
                                                    <span>Processing Models...</span>
                                                </div>
                                            ) : analysis ? (
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#163321]/40 mb-1">Disease Prediction</p>
                                                        <p className={`text-xs font-semibold ${analysis.riskLevel === 'LOW' ? 'text-green-800' : analysis.riskLevel === 'HIGH' ? 'text-red-800' : 'text-yellow-800'}`}>
                                                            {analysis.healthRisk}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#163321]/40 mb-1">Irrigation Optimization</p>
                                                        <p className={`text-xs font-medium ${sensor.soil_moisture < 40 ? 'text-red-800' : 'text-[#163321]/80'}`}>
                                                            {analysis.irrigation}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#163321]/40 mb-1">Yield Forecast (Historical Model)</p>
                                                        <p className="text-xs text-[#163321]/80 font-medium">{analysis.yieldForecast}</p>
                                                    </div>
                                                    <div className="pt-3 border-t border-[#163321]/5">
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#163321]/40 mb-1">Action Plan</p>
                                                        <p className={`text-xs italic leading-snug font-medium ${analysis.riskLevel === 'HIGH' ? 'text-red-800' : 'text-[#163321]/80'}`}>
                                                            {analysis.actionPlan}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="py-20 flex flex-col items-center justify-center text-center">
                                                    <p className="text-xs text-[#163321]/30 font-light italic">Enter diagnostics to run classification and regression models.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end mt-4 border-t border-[#163321]/5 pt-4">
                                            <button
                                                onClick={() => onRunDiagnostics(sensor)}
                                                disabled={isAnalyzing}
                                                className="font-semibold py-2 px-6 rounded-full text-xs bg-[#163321] text-[#E4E9D8] hover:bg-[#163321]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                            >
                                                {analysis ? 'Re-run Diagnostics' : 'Run Diagnostics'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

export default FieldRecords
