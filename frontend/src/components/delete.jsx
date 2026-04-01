import React from 'react'

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#163321]/50 backdrop-blur-[3px] flex justify-center items-center z-50 p-4">
            <div className="bg-[#E4E9D8] text-[#163321] p-10 rounded-[2rem] shadow-2xl max-w-sm w-full">
                <h3 className="text-3xl tracking-tight mb-4" style={{ fontWeight: 400 }}>Delete Record</h3>
                <p className="text-[#163321]/75 mb-10 font-light leading-relaxed">Are you sure you want to permanently delete this field record? This action cannot be undone.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={onConfirm} className="w-full bg-[#163321] text-[#E4E9D8] py-3.5 rounded-full font-semibold hover:bg-[#163321]/85 transition-colors">Yes, Remove It</button>
                    <button onClick={onCancel} className="w-full bg-transparent border border-[#163321]/20 text-[#163321] py-3.5 rounded-full font-semibold hover:bg-[#163321]/5 transition-colors">Keep Record</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
