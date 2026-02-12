'use client'

import { useState } from "react"
import { PanelRightClose, PanelRightOpen } from "lucide-react"

import { Button } from "@/components/ui/button"


const SideBar = () => {
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <div className={`fixed top-0 left-0 z-10 ${isOpen ? "w-64" : "w-16"} h-screen flex max-w-screen flex-col gap-4 p-4 overflow-hidden bg-[#0F1031]`}>
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <PanelRightOpen className="m-auto" /> : <PanelRightClose className="m-auto" />}
                </Button>
                <div className={`text-lg font-bold p-1 ${!isOpen && "hidden" }`}>NEXT SCOUT</div>
            </div>
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
                    {isOpen ? <PanelRightOpen className="m-auto" /> : <PanelRightClose className="m-auto" />}
                </Button>
                <div className={`text-lg font-bold ${!isOpen && "hidden" }`}></div>
            </div>

        </div>
    )
}

export default SideBar