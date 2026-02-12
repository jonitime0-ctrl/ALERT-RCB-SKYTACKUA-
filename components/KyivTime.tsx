
import React, { useState, useEffect } from 'react';

const KyivTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format to Kyiv Time (EET/EEST)
  const kyivTimeStr = time.toLocaleTimeString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
      <div className="relative">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-0 animate-ping"></div>
      </div>
      <div>
        <span className="text-xs uppercase font-bold text-blue-500 block">Київський час</span>
        <span className="text-xl font-mono font-bold">{kyivTimeStr}</span>
      </div>
    </div>
  );
};

export default KyivTime;
