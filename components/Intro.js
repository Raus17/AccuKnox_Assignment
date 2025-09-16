import React from 'react'
import {RefreshCcw , Settings } from "lucide-react"

const Intro = () => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">CNAPP DASHBOARD</p>
            <div className="flex gap-4">
                <button className="px-3 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200">
                    Add Widget +
                </button>
                <button className="px-2 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200">
                    <RefreshCcw size={17} />
                </button>
                <button className="px-3 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200">
                    <Settings size={17} />
                </button>
            </div>
        </div>
    )
}

export default Intro