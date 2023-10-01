import React, { useState } from 'react';
import { FaAngleRight, FaAngleDown, FaInfoCircle } from 'react-icons/fa';

const RaceTimes = ({ raceTimes }) => {
  const [isRaceTimesOpen, setIsRaceTimesOpen] = useState(false);

  return (
    <div>
        <button
        className={`btn ${isRaceTimesOpen ? 'btn-primary' : 'btn-neutral'} gap-2 my-8`}
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
                className='text-4xl font-bold'
                >{time}</p>

                <p
                className='text-base tracking-wide text-slate-200 mb-2'
                >{race}</p>
            </div>
            ))}

            <div
            className='max-w-sm'>
                <FaInfoCircle 
                className='mb-2'
                />

                <p
                className='text-base tracking-wide text-slate-200 mb-2'
                >Carb gels can reduce fatigue on long runs by helping maintain glycogen levels</p>

                <div
                className='flex flex-row'>
                    <FaAngleRight className='mt-' />
                    
                    <p
                    className='text-base tracking-wide text-slate-200 mb-2 underline cursor-pointer font-medium'
                    >See more</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default RaceTimes;