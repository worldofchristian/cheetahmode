import React from 'react';

const PaceInput = ({ paceValue, handlePaceValueChange, selectedMetric, handleMetricChange, handleCalculate }) => {
  return (
    <div 
    className='fixed bottom-0 w-full bg-base-400 backdrop-filter bg-opacity-5 backdrop-blur-xl shadow-xl p-4'>
        <div
        className='flex items-center justify-center my-8'>
            <div
            className='flex-col'>
                <input 
                type="number" 
                placeholder="Enter pace"
                className="input input-bordered w-full max-w-xs mt-6 shadow-xl"
                id="paceValue" 
                value={paceValue}
                onChange={handlePaceValueChange} 
                />

                <div 
                className='items-center justify-center'>
                    <div 
                    className='flex-col'>
                        <select 
                        className="select select-bordered w-full max-w-xs shadow-xl mt-6"
                        id="metric"
                        value={selectedMetric}
                        onChange={handleMetricChange}
                        >
                            <option 
                            disabled
                            value=''
                            >Choose one</option>

                            <option 
                            value="minutesPerKm"
                            >minutes/km</option>

                            <option 
                            value="minutesPerMile"
                            >minutes/mile</option>
                        </select>

                        <button 
                        className='btn btn-primary shadow-xl mt-6 w-full'
                        onClick={handleCalculate}
                        >Convert</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaceInput;