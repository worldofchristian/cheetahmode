import React, { useState } from 'react';
import Lottie from 'lottie-react';
import RaceTimes from './RaceTimes';
import PaceInput from './PaceInput';
import KAC7BGcQLN from '../lottie/KAC7BGcQLN.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: KAC7BGcQLN,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const PaceCalculator = () => {
  // state
  const [paceValue, setPaceValue] = useState('');
  const [tempPaceValue, setTempPaceValue] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('minutesPerKm');
  const [convertedPaces, setConvertedPaces] = useState({
    minutesPerKm: '',
    minutesPerMile: '',
    kmPerHour: '',
    mph: '',
    minutePerMile: '',
    minutePerKm: '',
  });
  const [convertedTimes, setConvertedTimes] = useState({
    fivek: '',
    tenk: '',
    halfmarathon: '',
    marathon: '',
    fiftyk: '',
    fiftymile: '',
    hundredk: '',
    hundredmile: ''
  })

  // convert minutes to hour:minute format
  const formatTime = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = Math.round(timeInMinutes % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };  

  // sets the temporary pace value 
  const handlePaceValueChange = (event) => {
    setTempPaceValue(event.target.value);
  };  

  // handler for convert btn click
  const handleConvertClick = () => {
    setPaceValue(tempPaceValue); // update state to make it consistent, but use tempPaceValue for calculations right away
    handleCalculate(tempPaceValue); // pass the temporary value directly
  }; 

  // handler for metric change
  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  // pace calculator
  const calculatePaces = (paceValue, selectedMetric) => {
    const kmPerMile = 1.609;
    const paceNumber = parseFloat(paceValue);
  
    // Check if paceNumber is not a valid number
    if (isNaN(paceNumber)) {
      return {
        minutesPerKm: null,
        minutesPerMile: null,
      };
    }
  
    let minutesPerKm = null;
    let minutesPerMile = null;
  
    if (selectedMetric === 'minutesPerKm') {
      minutesPerKm = paceNumber;
      minutesPerMile = paceNumber * kmPerMile;
    } else if (selectedMetric === 'minutesPerMile') {
      minutesPerMile = paceNumber;
      minutesPerKm = paceNumber / kmPerMile;
    }
  
    const kmPerHour = 60 / minutesPerKm;
    const mph = 60 / minutesPerMile;
  
    return {
      minutesPerKm: minutesPerKm.toFixed(1),
      minutesPerMile: minutesPerMile.toFixed(1),
      kmPerHour: kmPerHour.toFixed(1),
      mph: mph.toFixed(1),
    };
  };  
  
  const handleCalculate = (valueToCalculate) => {
    const convertedPaces = calculatePaces(valueToCalculate, selectedMetric); // use the passed-in value
    setConvertedPaces(convertedPaces);

    const minutesPerKm = parseFloat(convertedPaces.minutesPerKm);

    // Common race distances in Km
    const raceDistances = {
    '5k': 5,
    '10k': 10,
    'half marathon': 21.1,
    'marathon': 42.195,
    '50k': 50,
    '50 mile': 80.4672, // converted from miles to km
    '100k': 100,
    '100 mile': 160.934 // converted from miles to km
    };

    let newConvertedTimes = {};

    for (const [race, distance] of Object.entries(raceDistances)) {
      newConvertedTimes[race] = formatTime(minutesPerKm * distance);
    }

    setConvertedTimes(newConvertedTimes);
  };

  return (
    <div
    className='main-content flex items-center justify-center p-4 max-w-xl w-full'>
      <div
      className='flex-col'>
        <div
        className='flex flex-col items-center justify-center mt-2'>

          {paceValue ? (
          <>
          <div
          className='flex-col'>
            <div 
            className="flex-col p-4">
              <h2 
              className="text-3xl font-bold mt-2"
              >{convertedPaces.minutesPerKm}</h2>

              <p 
              className="text-sm tracking-wide text-slate-200"
              >minutes/km</p>
            </div>

            <div 
            className="flex-col p-4">
              <h2 
              className="text-3xl font-bold mt-2"
              >{convertedPaces.minutesPerMile}</h2>

              <p 
              className="text-sm tracking-wide text-slate-200"
              >minutes/mile</p>
            </div>

            <div 
            className="flex-col p-4">
              <h2 
              className="text-3xl font-bold mt-2"
              >{convertedPaces.kmPerHour}</h2>

              <p 
              className="text-sm tracking-wide text-slate-200"
              >kilometers/hour</p>
            </div>

            <div 
            className="flex-col p-4">
              <h2 
              className="text-3xl font-bold mt-2"
              >{convertedPaces.mph}</h2>

              <p 
              className="text-sm tracking-wide text-slate-200"
              >miles/hour</p>
              </div>
            </div>

            <div
            className='flex items-center justify-center mt-2'>
              <RaceTimes 
              raceTimes={convertedTimes} 
              />
            </div>
            </>
          ) : (
            <div
            className='fixed bottom-80'>
              <div
              className='max-w-xs'>
                <Lottie 
                animationData={KAC7BGcQLN}
                options={defaultOptions}
                height={10}
                width={10}
                />
              </div>
            </div>
          )}

            <PaceInput 
            paceValue={tempPaceValue}
            handlePaceValueChange={handlePaceValueChange}
            selectedMetric={selectedMetric}
            handleMetricChange={handleMetricChange}
            handleCalculate={handleConvertClick}
            />
          </div>
        </div>
    </div>
  );
};

export default PaceCalculator;