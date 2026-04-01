import React from 'react'
import { CheckIcon, AlertIcon, SpinnerIcon } from './Icons'

const Toast = ({ notifications }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col-reverse gap-3 w-80 pointer-events-none">
            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className={`pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm font-medium leading-snug animate-fade-in-up
                    ${notif.type === 'success' ? 'bg-[#163321] text-[#E4E9D8]'
                            : notif.type === 'warning' ? 'bg-amber-700 text-amber-50'
                                : notif.type === 'error' ? 'bg-red-700 text-red-50'
                                    : 'bg-white text-[#163321] border border-[#163321]/10'}`}
                >
                    <span className="shrink-0 mt-0.5">
                        {notif.type === 'success' ? <CheckIcon />
                            : notif.type === 'warning' || notif.type === 'error' ? <AlertIcon />
                                : <SpinnerIcon />}
                    </span>
                    <span>{notif.text}</span>
                </div>
            ))}
        </div>
    )
}

export default Toast
