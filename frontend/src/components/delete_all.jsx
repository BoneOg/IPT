import React from 'react'
import { TrashIcon, SpinnerIcon } from './Icons'

const DeleteAllModal = ({ isOpen, onConfirm, onCancel, isDeleting, sensorCount }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#163321]/60 backdrop-blur-[4px] flex justify-center items-center z-[60] p-4">
            <div className="bg-[#E4E9D8] text-[#163321] p-10 rounded-[2rem] shadow-2xl max-w-md w-full border border-white/20">
                <h3 className="text-3xl tracking-tight mb-4" style={{ fontWeight: 400 }}>Wipe All Records?</h3>
                <p className="text-[#163321]/75 mb-10 font-light leading-relaxed">
                    This will permanently delete all <span className="font-bold decoration-red-800">{sensorCount} active sensor records</span>. This massive action cannot be reversed.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="w-full bg-red-800 text-red-50 py-4 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {isDeleting ? <><SpinnerIcon /> Clearing...</> : "Yes, Purge Everything"}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="w-full bg-transparent border border-[#163321]/20 text-[#163321] py-4 rounded-full font-semibold hover:bg-[#163321]/5 transition-colors"
                    >
                        No, Keep My Data
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAllModal
