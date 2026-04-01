import React from 'react'
import { SpinnerIcon } from './Icons'

const Hero = ({ onSimulate, isSimulating }) => {
    return (
        <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-84 max-w-4xl mx-auto">
            <p className="text-sm font-semibold tracking-widest uppercase mb-6 opacity-60">Smart Crop Monitoring</p>
            <h1 className="text-5xl md:text-7xl tracking-[-0.03em] mb-4 leading-[1.05]" style={{ fontWeight: 400 }}>
                FarmShield AI
            </h1>
            <p className="text-lg md:text-xl opacity-75 leading-relaxed font-light max-w-2xl mb-12">
                Our commitment to your crops goes beyond just data. Discover the unique benefits that set us apart and ensure you have the best experience on your farming journey.
            </p>
            <button
                onClick={onSimulate}
                disabled={isSimulating}
                className="flex items-center gap-3 bg-[#163321] text-[#E4E9D8] font-bold py-4 px-10 rounded-full hover:bg-[#163321]/85 transition-colors text-lg tracking-widest shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSimulating ? <><SpinnerIcon /> Simulating…</> : 'Simulate'}
            </button>
        </section>
    )
}

export default Hero
