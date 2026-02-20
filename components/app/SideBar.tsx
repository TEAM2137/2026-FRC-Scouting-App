'use client'

import { useState } from "react"
import { PanelRightClose, PanelRightOpen, CalendarDays } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/AppContext"


const SideBar = () => {
    const router = useRouter();
    const [isOpen, setOpen] = useState<boolean>(false)
    const { appEvent, setAppEvent } = useAppContext();

    return (
        <div className={`fixed top-0 left-0 z-10 ${isOpen ? "w-64" : "w-16"} h-screen flex max-w-screen flex-col gap-4 p-4 overflow-hidden bg-[#0F1031]`}>
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
                    <Image src="/images/TEAM2137-Robocat-Head.svg" alt="Acme Logo" width={32} height={32} />
                </Button>
                <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>NEXT SCOUT</div>
            </div>
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.push('/selectevent')}>
                    <CalendarDays className="m-auto" />
                </Button>
                {appEvent && <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>{appEvent?.name}</div>}
                {!appEvent && <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>Select Event to Scout</div>}
            </div>
            {appEvent && 
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.push('/scout/matches')}>
                    <CalendarDays className="m-auto" />
                </Button>
                <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>Scout Matches</div>
            </div>}
            {appEvent && 
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.push('/scout/pits')}>
                    <CalendarDays className="m-auto" />
                </Button>
                <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>Pit Scout</div>
            </div>}
            {appEvent && 
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.push('/scout/data')}>
                    <CalendarDays className="m-auto" />
                </Button>
                <div className={`text-lg font-normal p-1 ${!isOpen && "hidden" }`}>View Event Data</div>
            </div>}
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