'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { IEvent } from '@/models/frc-events/Event';

interface DisplayEvent {
    week: string;
    startDate: Date;
    endDate: Date;
    code: string;
    name: string;
    divisionCode: string;
    districtCode: string;
    city: string;
    stateprov: string;
    country: string;
    teams: string[];
}   

export const Weeks = [
    { week: 'Week 1', sdate: new Date('2026-03-02'), edate: new Date('2026-03-09') },
    { week: 'Week 2', sdate: new Date('2026-03-10'), edate: new Date('2026-0315') },
]







const Page = () => {
    const router = useRouter();
    const [event, setEvent] = useState<any>(null);
    const [events, setEvents] = useState<DisplayEvent[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [district, setDistrict] = useState('FIM');

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`/api/frc-events/events`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            const DisplayEvents = []
            for (const event of data) {

                let week = ''
                for (const weekData of Weeks) {
                    const compDate = new Date(weekData.sdate);
                    if (event.dateStart >= compDate && compDate <= weekData.edate) {
                        week = weekData.week;
                        break;
                    }
                }

                const displayEvent: DisplayEvent = {
                    week: week,
                    startDate: new Date(event.dateStart),
                    endDate: new Date(event.dateEnd),
                    code: event.code,
                    name: event.name,
                    divisionCode: event.divisionCode,
                    districtCode: event.districtCode,
                    city: event.city,
                    stateprov: event.stateprov,
                    country: event.country,
                    teams: event.teams.map((team: any) => team.name),
                };

                if (district !== '' && district !== event.districtCode) {
                    continue;
                }


                DisplayEvents.push(displayEvent)
            }
            setEvents(DisplayEvents);
            
        };
        fetchEvent();
    }, [refresh]);

    return (
        <div className="flex flex-col items-center justify-center w-screen pl-20">
            <h1>Select Event</h1>
            <p>Select an event to view teams and events.</p>
            <button onClick={() => setRefresh(!refresh)}>Refresh</button>
            <div className="flex flex-row flex-wrap gap-2">
            {events.map((event: DisplayEvent, index: number) => (
                <div key={index} className="flex flex-col w-50 text-xs bg-slate-800 rounded-lg p-2">
                    <h2>{event.name}</h2>
                    <p>Code: {event.code}</p>
                    <p>Division Code: {event.divisionCode}</p>
                    <p>District Code: {event.districtCode}</p>
                    <p>City: {event.city}</p>
                    <p>State/Prov: {event.stateprov}</p>
                    <p>Country: {event.country}</p>
                    <p>Date Start: {new Date(event.startDate).toLocaleDateString()}</p>
                    <p>Date End: {new Date(event.endDate).toLocaleDateString()}</p>
                    <p>Week: {event.week}</p>
                </div>
            ))}</div>
        </div>
    );
}

export default Page;