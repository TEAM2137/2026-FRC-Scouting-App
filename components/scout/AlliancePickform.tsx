import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
import { useEffect } from "react"
import { getRankings } from "@/lib/bluealliance/getRankings"
import { useAppContext } from "@/context/AppContext"

const  AlliancePickform = () => {
   const sendtoDB = () => {
    //send to db
   }
   const [data, setData] = useState({
    PickListName: "",
    eventCode: "",
    picks: []
   })
  
}
 interface IProps {

    eventCode: string,
   }
const AllianceTools = ({eventCode}: IProps) => {
    const [alliances, setAlliances] = useState<string[]>([]);
    const [rankings, setRankings] = useState<any[]>([]);
    const [displayRankings, setDisplayRankings] = useState<any[]>([]);
    const [showEventRankings, setShowEventRankings] = useState<boolean>(true);
    const [showPickLists, setShowPickLists] = useState<boolean[]>([true,true,true,true,true]);
    const { appEvent } = useAppContext();

    const getTeamName = (teamNumber: string) => {
        if (appEvent?.teams) {
            const team = appEvent?.teams.find((team) => team.number === teamNumber);
            if (team) {
                return team.name;
            }
        }
        return teamNumber;
    }

    const addSelection = (teamNumber: string) => {
        //const updatedAliances = alliances
        //updatedAliances.push(teamNumber);
        setAlliances(alliances.concat(teamNumber));
    }

    const subtractAlliance = () => {
        const updatedAlliances = alliances.filter((alliance) => alliance !== alliances[alliances.length - 1]);
        setAlliances(updatedAlliances);
    }

    const handleShowPickLists = (index: number) => {
        const updatedShowPickLists = showPickLists.map((showPickList, i) => i === index ? !showPickList : showPickList);
        setShowPickLists(updatedShowPickLists);
    }

    useEffect(() => {
        const fetchRankings = async () => {
            const rankings = await getRankings(eventCode);
            if (rankings !== null) {
                setRankings(JSON.parse(rankings));
            }
        }
        fetchRankings();
    }, []);

    useEffect(() => {
        if (rankings.length > 0) {
            setDisplayRankings(rankings);
        }
    }, [rankings]);

    useEffect(() => {
        setDisplayRankings(rankings.filter((ranking) => !alliances.includes(ranking.teamNumber)));
    }, [alliances]);
 return (
    <Card>
        <CardContent>
            <Label>Alliance Pick Name</Label>
            <Input placeholder="Alliance Pick list Name" required onChange={(e) => {setData({...data, PickListName: e.target.value})}}/>
            
            
            <Button onClick={sendtoDB}>Submit</Button>
        </CardContent>
    </Card>


 )}