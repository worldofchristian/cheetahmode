import React, { useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';

const RaceTimes = ({ raceTimes }) => {
  const [isRaceTimesOpen, setIsRaceTimesOpen] = useState(false);

  return (
    <div>
        <button
        className={`btn ${isRaceTimesOpen ? 'btn-primary' : 'btn-neutral'} gap-2 my-2`}
        onClick={() => setIsRaceTimesOpen(!isRaceTimesOpen)}
        >Race Times

        {isRaceTimesOpen ? <FaAngleDown /> : <FaAngleRight />}
        </button>

        {isRaceTimesOpen && (
        <div>
            {Object.entries(raceTimes).map(([race, time]) => (
            <div
            className='my-8' 
            key={race}>
                <p
                className='text-3xl font-bold'
                >{time}</p>

                <p
                className='text-sm tracking-wide text-slate-200 mb-2'
                >{race}</p>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RaceTimes;