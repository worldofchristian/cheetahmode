import React, { useState } from 'react';

const PaceCalculator = () => {
  // state
  const [paceValue, setPaceValue] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('minutesPerKm');
  const [convertedPaces, setConvertedPaces] = useState({
    minutesPerKm: '',
    minutesPerMile: '',
    kmPerHour: '',
    mph: '',
    minutePerMile: '',
    minutePerKm: '',
  });

  // handler for pace value change
  const handlePaceValueChange = (event) => {
    setPaceValue(event.target.value);
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
  
  const handleCalculate = () => {
    const convertedPaces = calculatePaces(paceValue, selectedMetric);
    setConvertedPaces(convertedPaces);
  };

  return (
    <div
    className='flex items-center justify-center p-4 max-w-xl w-full rounded-xl shadow-xl'>
        <div
        className='flex-col'>

            <input 
            type="number" placeholder="Enter pace" 
            className="input input-bordered w-full max-w-xs mt-6" 
            id="paceValue" 
            value={paceValue} 
            onChange={handlePaceValueChange} />

            <div
            className='items-center justify-center'>
                <div
                className='flex-col'>
                    <select 
                    className="select select-bordered w-full max-w-xs mt-6"
                    id="metric" 
                    value={selectedMetric}
                    onChange={handleMetricChange}>
                        <option disabled selected
                        >Choose a metric</option>
                        <option
                        value="minutesPerKm"
                        >minutes/km</option>
                        <option
                        value="minutesPerMile"
                        >minutes/mile</option>
                    </select>

                    <button 
                    className='btn btn-primary mt-6 w-full'
                    onClick={handleCalculate}
                    >Convert</button>
                </div>
            </div>

            <div
            className='flex items-center justify-center'>
                <div 
                className="stats stats-vertical shadow my-6">
                    <div 
                    className="stat">
                        <div 
                        className="stat-title"
                        >minutes/km</div>
                        <div 
                        className="stat-value"
                        >{convertedPaces.minutesPerKm}</div>
                    </div>
                    
                    <div 
                    className="stat">
                        <div 
                        className="stat-title"
                        >minutes/mile</div>
                        <div 
                        className="stat-value">{convertedPaces.minutesPerMile}</div>
                    </div>
                    
                    <div 
                    className="stat">
                        <div 
                        className="stat-title"
                        >km/h</div>
                        <div 
                        className="stat-value"
                        >{convertedPaces.kmPerHour}</div>
                    </div>

                    <div 
                    className="stat">
                        <div 
                        className="stat-title"
                        >mph</div>
                        <div 
                        className="stat-value"
                        >{convertedPaces.mph}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default PaceCalculator;
