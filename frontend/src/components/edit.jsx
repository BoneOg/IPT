import React from 'react'

const EditModal = ({ isOpen, onClose, formData, onChange, onSubmit }) => {
    if (!isOpen) return null;

    const labelCls = "text-[10px] font-semibold uppercase tracking-wider text-[#163321]/50 mb-1.5 block"
    const inputStyle = "w-full bg-transparent border-b border-[#163321]/20 text-[#163321] px-1 py-2 focus:outline-none focus:border-[#163321] transition-colors font-medium placeholder-[#163321]/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

    return (
        <div className="fixed inset-0 bg-[#163321]/50 backdrop-blur-[3px] flex justify-center items-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bg-[#E4E9D8] text-[#163321] rounded-[2rem] shadow-2xl w-full max-w-3xl p-10 md:p-14 overflow-y-auto max-h-[90vh]">
                <h3 className="text-3xl tracking-tight mb-2" style={{ fontWeight: 400 }}>Edit Record</h3>
                <p className="text-[#163321]/60 text-sm font-light mb-10">Update the sensor readings for this field entry.</p>
                <form onSubmit={onSubmit}>
                    <div className="mb-8">
                        <label className={labelCls}>Crop / Plant Name</label>
                        <input type="text" name="plant_name" value={formData.plant_name} onChange={onChange} required placeholder="e.g. Cacao, Rice, Banana"
                            className="w-full bg-transparent border-b border-[#163321]/20 text-[#163321] px-1 py-2 focus:outline-none focus:border-[#163321] transition-colors font-medium placeholder-[#163321]/30" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 mb-10">
                        <div>
                            <label className={labelCls}>Moisture <span className="normal-case font-normal opacity-60">0–100%</span></label>
                            <input type="number" step="0.01" min="0" max="100" name="soil_moisture" value={formData.soil_moisture} onChange={onChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelCls}>Soil Temp <span className="normal-case font-normal opacity-60">0–60°C</span></label>
                            <input type="number" step="0.01" min="0" max="60" name="soil_temperature" value={formData.soil_temperature} onChange={onChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelCls}>Soil pH <span className="normal-case font-normal opacity-60">0–14</span></label>
                            <input type="number" step="0.01" min="0" max="14" name="soil_ph" value={formData.soil_ph} onChange={onChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelCls}>Air Temp <span className="normal-case font-normal opacity-60">0–60°C</span></label>
                            <input type="number" step="0.01" min="0" max="60" name="air_temperature" value={formData.air_temperature} onChange={onChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelCls}>Humidity <span className="normal-case font-normal opacity-60">0–100%</span></label>
                            <input type="number" step="0.01" min="0" max="100" name="humidity" value={formData.humidity} onChange={onChange} required className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelCls}>Leaf Wetness <span className="normal-case font-normal opacity-60">0–100%</span></label>
                            <input type="number" step="0.01" min="0" max="100" name="leaf_wetness" value={formData.leaf_wetness} onChange={onChange} required className={inputStyle} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-transparent border border-[#163321]/20 text-[#163321] font-semibold py-3.5 px-10 rounded-full hover:bg-[#163321]/5 transition-colors text-sm">Cancel</button>
                        <button type="submit" className="bg-[#163321] text-[#E4E9D8] font-semibold py-3.5 px-10 rounded-full hover:bg-[#163321]/85 transition-colors text-sm">Update Record</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal
