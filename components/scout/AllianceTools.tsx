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

    eventCode: string,

}

const AllianceTools = ({eventCode}: IProps) => {

return (
<div className='w-19/20'>
<div className="grid place-items-center pb-1">Alliance Tools</div>
<div className="flex flex-row flex-wrap gap-2 place-items-center bg-blue-950 rounded-lg p-2">



<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 1</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 2</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 3</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 4</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 5</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 6</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 7</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>

<div className=' w-32 sm:w-60 md:w-72 text-center'>
<p>Allience 8</p>
<div className=' border-3 w-full text-center'>
    <div className="grid grid-cols-2 place-items-center">
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    <p className='font-bold text-base'>2137</p><p className='text-[8px]'>The Oxford RoboCats</p>
    </div>
</div>
</div>


</div>



</div>

)
    }
export default AllianceTools;