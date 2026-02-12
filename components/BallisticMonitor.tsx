
import React from 'react';
import { BALLISTIC_SITES } from '../constants';

interface BallisticMonitorProps {
  activeThreats: Set<string>;
  toggleThreat?: (id: string) => void;
}

const BallisticMonitor: React.FC<BallisticMonitorProps> = ({ activeThreats, toggleThreat }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-orange-600/20 rounded-lg">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Балістичне озброєння</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BALLISTIC_SITES.map((site) => {
            const isActive = activeThreats.has(site.id);
            return (
              <button
                key={site.id}
                onClick={() => toggleThreat?.(site.id)}
                disabled={!toggleThreat}
                className={`p-6 rounded-3xl border text-left transition-all duration-500 transform active:scale-95 group relative overflow-hidden ${
                  isActive
                    ? 'bg-red-600 border-red-500 text-white shadow-2xl shadow-red-600/40 active-alert scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-orange-500/50'
                } ${!toggleThreat ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {isActive ? 'ЗАГРОЗА' : 'НАПРЯМОК'}
                    </span>
                    {isActive && <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>}
                  </div>
                  <div className="font-black text-xl mb-1">{site.name}</div>
                  <div className={`text-xs ${isActive ? 'text-red-100' : 'text-slate-500'}`}>{site.location}</div>
                  
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-white/20 animate-pulse">
                      <div className="text-xs font-black tracking-tight leading-tight uppercase">
                        ⚠️ Загроза застосування балістичного озброєння!
                      </div>
                    </div>
                  )}
                </div>
                {isActive && (
                  <div className="absolute -bottom-8 -right-8 opacity-10 scale-150 transition-transform duration-700">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="glass-effect p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-6 border-dashed border-2 border-slate-200 dark:border-slate-800">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 ${activeThreats.size > 0 ? 'bg-red-600 text-white animate-bounce shadow-2xl shadow-red-600/50' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <div>
            <h3 className={`text-xl font-black mb-2 transition-colors duration-500 ${activeThreats.size > 0 ? 'text-red-600' : 'text-slate-500'}`}>
              {activeThreats.size > 0 ? `${activeThreats.size} НАПРЯМКИ ПІД ЗАГРОЗОЮ` : 'СПОКІЙНА ОБСТАНОВКА'}
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              {activeThreats.size > 0 
                ? 'Зафіксовано активність балістичних комплексів "Іскандер-М" або "KN-23" на вибраних напрямках. Негайно перейдіть в укриття!' 
                : 'На цей момент активних запусків балістики не виявлено.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallisticMonitor;
