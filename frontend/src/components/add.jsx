import React from 'react'

const AddDataModal = ({ isOpen, onClose, formData, onChange, onSubmit }) => {
    if (!isOpen) return null;

    const labelCls = "text-[10px] font-semibold uppercase tracking-wider text-[#163321]/50 mb-1.5 block"
    const inputStyle = "w-full bg-transparent border-b border-[#163321]/15 text-[#163321] px-1 py-2 focus:outline-none focus:border-[#163321]/50 transition-colors font-medium placeholder-[#163321]/25 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

    return (
        <div className="fixed inset-0 bg-[#163321]/50 backdrop-blur-[3px] flex justify-center items-center z-50 p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="w-full max-w-5xl bg-white text-[#163321] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto">
                <div className="lg:w-[35%] shrink-0 p-10 md:p-12 flex flex-col justify-between bg-[#163321] text-[#E4E9D8]">
                    <div>
                        <h2 className="text-3xl md:text-4xl tracking-tight leading-tight mb-4" style={{ fontWeight: 400 }}>Add New<br />Field Data</h2>
                        <p className="text-[#E4E9D8]/55 text-sm font-light leading-relaxed">
                            Record live sensor readings for your crops. Each entry can be analyzed to give actionable insights on soil health and environmental conditions.
                        </p>
                    </div>
                    <div className="mt-10 hidden lg:block">
                        {['Soil Conditions', 'Air & Humidity', 'Leaf Health'].map(tag => (
                            <div key={tag} className="flex items-center gap-3 mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C7DBB8]" />
                                <span className="text-xs text-[#E4E9D8]/45 tracking-wide">{tag}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 p-10 md:p-12">
                    <form onSubmit={onSubmit} className="flex flex-col gap-7">
                        <div>
                            <label className={labelCls}>Crop / Plant Name</label>
                            <input type="text" name="plant_name" value={formData.plant_name} onChange={onChange} required placeholder="e.g. Cacao, Rice, Banana" className={inputStyle.replace('[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none', '')} />
                        </div>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                            <div>
                                <label className={labelCls}>Soil Moisture <span className="normal-case font-normal opacity-60">0–100%</span></label>
                                <input type="number" step="0.01" min="0" max="100" name="soil_moisture" value={formData.soil_moisture} onChange={onChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelCls}>Soil Temperature <span className="normal-case font-normal opacity-60">0–60°C</span></label>
                                <input type="number" step="0.01" min="0" max="60" name="soil_temperature" value={formData.soil_temperature} onChange={onChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelCls}>Soil pH Level <span className="normal-case font-normal opacity-60">0–14</span></label>
                                <input type="number" step="0.01" min="0" max="14" name="soil_ph" value={formData.soil_ph} onChange={onChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelCls}>Air Temperature <span className="normal-case font-normal opacity-60">0–60°C</span></label>
                                <input type="number" step="0.01" min="0" max="60" name="air_temperature" value={formData.air_temperature} onChange={onChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelCls}>Relative Humidity <span className="normal-case font-normal opacity-60">0–100%</span></label>
                                <input type="number" step="0.01" min="0" max="100" name="humidity" value={formData.humidity} onChange={onChange} required className={inputStyle} />
                            </div>
                            <div>
                                <label className={labelCls}>Leaf Wetness <span className="normal-case font-normal opacity-60">0–100%</span></label>
                                <input type="number" step="0.01" min="0" max="100" name="leaf_wetness" value={formData.leaf_wetness} onChange={onChange} required className={inputStyle} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-2">
                            <button type="button" onClick={onClose} className="bg-transparent border border-[#163321]/20 text-[#163321] font-semibold py-3.5 px-10 rounded-full hover:bg-[#163321]/5 transition-colors text-sm">Cancel</button>
                            <button type="submit" className="bg-[#163321] text-[#E4E9D8] font-semibold py-3.5 px-10 rounded-full hover:bg-[#163321]/85 transition-colors text-sm">Save Record</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDataModal
