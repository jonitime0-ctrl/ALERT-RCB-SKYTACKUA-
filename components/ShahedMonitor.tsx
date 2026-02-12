
import React from 'react';
import { SHAHED_SITES } from '../constants';

interface ShahedMonitorProps {
  activeSites: Set<string>;
  toggleSite?: (id: string) => void;
}

const ShahedMonitor: React.FC<ShahedMonitorProps> = ({ activeSites, toggleSite }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-600/20 rounded-lg">
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.47c-.31.17-.69.17-1 0l-7.97-4.47A1.006 1.006 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.97-4.47c.31-.17.69-.17 1 0l7.97 4.47c.32.17.53.5.53.88v9z"/></svg>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Пуски БПЛА Shahed</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SHAHED_SITES.map((site) => {
          const isActive = activeSites.has(site.id);
          return (
            <button 
              key={site.id}
              onClick={() => toggleSite?.(site.id)}
              disabled={!toggleSite}
              className={`relative flex flex-col p-5 rounded-3xl transition-all duration-500 border text-left group overflow-hidden ${
                isActive 
                ? 'bg-red-600 border-red-500 shadow-2xl shadow-red-600/30 text-white active-alert' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-red-500/50'
              } ${!toggleSite ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {isActive ? 'АКТИВНО' : 'ОЧІКУВАННЯ'}
                </div>
                {isActive && (
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-75"></span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-black mb-1 relative z-10 leading-tight">{site.name}</h3>
              <p className={`text-xs mb-4 relative z-10 ${isActive ? 'text-red-100' : 'text-slate-500'}`}>{site.location}</p>

              <div className={`mt-auto font-bold text-xs uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`}>
                {isActive ? 'ВІДМІЧЕНО ПУСКИ ШАХЕДІВ' : (toggleSite ? 'Відмітити пуск' : 'Пуски відсутні')}
              </div>
              
              {isActive && (
                <div className="absolute -bottom-4 -right-4 opacity-10 scale-150 rotate-12 transition-transform duration-700 group-hover:scale-110">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.47c-.31.17-.69.17-1 0l-7.97-4.47A1.006 1.006 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.97-4.47c.31-.17.69-.17 1 0l7.97 4.47c.32.17.53.5.53.88v9z"/></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShahedMonitor;
