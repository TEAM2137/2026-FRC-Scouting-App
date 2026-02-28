'use client'

import { useState } from 'react';

interface Props {
    setDisplay: (page: string) => void
}

const ScoutMatches = ({setDisplay}: Props) => {
    
    return (
        <div className="flex flex-col w-screen pl-20 text-xs">
            Scout Matches Page
        </div>
    )
}

export default ScoutMatches;