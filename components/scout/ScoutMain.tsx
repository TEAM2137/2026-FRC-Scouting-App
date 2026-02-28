'use client'

import { useState } from 'react';

interface Props {
    setDisplay: (page: string) => void
}

const ScoutMain = ({setDisplay}: Props) => {
    
    return (
        <div className="flex flex-col w-screen pl-20 text-xs">
            Main Scouting Display Page
        </div>
    )
}


export default ScoutMain;