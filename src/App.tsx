import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const targetDate = new Date('2026-01-01T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeUnits = () => {
    const totalMilliseconds = targetDate - currentTime;
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
    const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7) % 4;
    const months = Math.floor(days / 30.44) % 12;
    
    const totalDays = Math.floor(targetDate.getTime() - new Date('2025-01-01').getTime()) / (1000 * 60 * 60 * 24);
    const yearProgress = (days / totalDays) * 100;

    return {
      seconds: { value: seconds, max: 60, progress: (seconds / 60) * 100 },
      minutes: { value: minutes, max: 60, progress: (minutes / 60) * 100 },
      hours: { value: hours, max: 24, progress: (hours / 24) * 100 },
      days: { value: days % 30, max: 30, progress: ((days % 30) / 30) * 100 },
      weeks: { value: weeks, max: 4, progress: (weeks / 4) * 100 },
      months: { value: months, max: 12, progress: (months / 12) * 100 },
      year: { value: days, progress: yearProgress }
    };
  };

  const timeUnits = getTimeUnits();

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-thin mb-4 text-gray-800">New Year 2026</h1>
          <p className="text-3xl font-bold text-gray-900">{formatTime(currentTime)}</p>
        </div>
        
        <div className="space-y-8">
          {Object.entries(timeUnits).map(([unit, data]) => (
            <div key={unit} className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-thin capitalize text-gray-600">{unit}</span>
                <span className="text-sm font-bold text-gray-800">
                  {unit === 'year' ? 
                    `${Math.floor(data.progress)}%` : 
                    `${data.value} / ${data.max}`
                  }
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gray-800 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${data.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
