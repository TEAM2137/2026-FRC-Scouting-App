'use client'

import { useState } from 'react';

interface Props {
    setDisplay: (page: string) => void
}

const ScoutPit = ({setDisplay}: Props) => {
    
    return (
        <div className="flex flex-col w-screen pl-20 text-xs">
            Scout Pit Page
        </div>
    )
}

export default ScoutPit;