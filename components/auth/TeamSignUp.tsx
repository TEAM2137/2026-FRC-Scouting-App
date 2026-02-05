'use client'

import { storeTeam } from '@/lib/auth/storeTeam';
import { useState, useEffect } from 'react';

const teams = [ '12345', '67890', '24680' ];

const TeamSignUp = () => {
  const [teamNumber, setTeamNumber] = useState('');
  const [managerName, setManagerName] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async () => {
    if (teamNumber === '') {
      setError('Team Number is required');
      return;
    } 
    if (!teams.includes(teamNumber)) {
        setError('Team Number is not valid');
        return;
    }

    const teamData = { 
        teamNumber: teamNumber,
        managerName: managerName,
     };
    const result = await storeTeam(teamData);

    if (result.success) {
        setError(result.message);
    } else {
        setError(result.message);
    }
    
  };

  return (
    <div className="flex flex-col gap-3 bg-slate-200 text-slate-900 rounded-xl p-4">
        <p className="text-2xl font-bold mb-4">Team Sign Up</p>

            <div className="grid gap-3">
              <label htmlFor="TeamNumber">Team Number</label>
              <input id="TeamNumber" type="text" required placeholder="12345" value={teamNumber} onChange={(e) => setTeamNumber(e.target.value)}/>
              <input id="ManagerName" type="text" required placeholder="Joe Schmo" value={managerName} onChange={(e) => setManagerName(e.target.value)}/>
              <button type="submit" 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleFormSubmit()}>
                Submit
              </button>
            </div>


        {error !== '' && <p className="text-red-500">{error}</p>}

    </div>
    )
}
//get the user input for email and password finished on tuesday
export default TeamSignUp;