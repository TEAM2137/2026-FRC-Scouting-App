'Use client'


import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { useAppContext } from '@/context/AppContext';
import { IMatchScout } from "@/models/scout/MatchScout"


interface IProps {
    teamNumber: string,
    eventCode: string,
    tournamentLevel: string,
}

    const Allincetools = ({teamNumber, eventCode, tournamentLevel,}: IProps) => {
({
            teamNumber: teamNumber,
            eventCode: eventCode,
            tournamentLevel: tournamentLevel,
            }
        )
return (
    <div className='mt-5 ml-20'>
<div className="grid place-items-center pb-1">Alliance Tools</div>
<div className="flex flex-row flex-wrap gap-2 place-items-center bg-blue-950 rounded-lg p-2">



<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 1</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 2</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 3</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 4</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 5</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 6</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 7</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>
<div className=' w-40 sm:w-60 md:w-75 text-center'>
<p>Allience 8</p>
<div className=' border-3 w-40 sm:w-60 md:w-75 text-center'><p>ph</p>
<p>ph</p>
<p>ph</p></div>
</div>

</div>



</div>

)
    }
export default Allincetools;