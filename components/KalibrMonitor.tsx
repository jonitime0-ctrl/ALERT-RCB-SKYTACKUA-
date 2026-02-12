
import React from 'react';

interface KalibrMonitorProps {
  isActive: boolean;
  setIsActive?: (v: boolean) => void;
}

const KalibrMonitor: React.FC<KalibrMonitorProps> = ({ isActive, setIsActive }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Крилаті ракети "Калібр"</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div 
          className={`relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8 ${
            isActive 
            ? 'bg-red-600/10 border-red-500 active-alert shadow-2xl shadow-red-500/20' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-3xl ${isActive ? 'bg-red-600 text-white' : 'bg-blue-600/10 text-blue-500'}`}>
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black">Акваторія Чорного моря</h3>
                <p className="text-slate-500 font-medium">Носії КРМБ "Калібр" (Фрегати, Підводні човни)</p>
              </div>
            </div>

            {isActive && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                  Зафіксовано пуски з моря
                </div>
                <p className="text-red-500 font-bold max-w-xl">
                  Увага! Зафіксовано пуски ракет типу "Калібр" з Чорного моря. Залишайтеся в укриттях!
                </p>
              </div>
            )}
            
            {!isActive && (
              <p className="text-slate-500 text-sm max-w-xl italic">
                Носії "Калібрів" можуть перебувати на бойовому чергуванні. На даний момент пусків не зафіксовано.
              </p>
            )}
          </div>

          {setIsActive && (
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-full md:w-auto px-12 py-6 rounded-3xl font-black tracking-widest uppercase transition-all duration-500 transform active:scale-95 shadow-xl ${
                isActive 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/40' 
                  : 'bg-slate-800 dark:bg-white dark:text-slate-900 text-white hover:opacity-90'
              }`}
            >
              {isActive ? 'СКАСУВАТИ ПУСК' : 'ВІДМІТИТИ ПУСК'}
            </button>
          )}

          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KalibrMonitor;
