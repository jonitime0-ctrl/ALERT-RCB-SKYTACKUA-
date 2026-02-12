
import React from 'react';
import { AVIATION_AIRFIELDS, AIRCRAFT_TYPES } from '../constants';

interface StrategicAviationProps {
  state: {
    airfields: Set<string>;
    aircraft: Set<string>;
    isLaunchDetected: boolean;
  };
  updateState?: (s: any) => void;
}

const StrategicAviation: React.FC<StrategicAviationProps> = ({ state, updateState }) => {
  const toggleAirfield = (id: string) => {
    if (!updateState) return;
    const newSet = new Set(state.airfields);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    updateState({ ...state, airfields: newSet });
  };

  const toggleAircraft = (id: string) => {
    if (!updateState) return;
    const newSet = new Set(state.aircraft);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    updateState({ ...state, aircraft: newSet });
  };

  const setIsLaunchDetected = (v: boolean) => {
    if (!updateState) return;
    updateState({ ...state, isLaunchDetected: v });
  };

  const isAnyActive = state.airfields.size > 0 || state.aircraft.size > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-600/20 rounded-lg">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight">Стратегічна авіація РФ</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Airfields Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Аеродроми базування</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVIATION_AIRFIELDS.map((site) => (
              <button
                key={site.id}
                onClick={() => toggleAirfield(site.id)}
                disabled={!updateState}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left ${
                  state.airfields.has(site.id)
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
                } ${!updateState ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className={`p-2 rounded-xl ${state.airfields.has(site.id) ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <div>
                  <div className="font-bold text-sm">{site.name}</div>
                  <div className={`text-[10px] uppercase font-bold ${state.airfields.has(site.id) ? 'text-blue-100' : 'text-slate-500'}`}>{site.location}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Aircraft Types Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Типи авіації</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AIRCRAFT_TYPES.map((aircraft) => (
              <button
                key={aircraft.id}
                onClick={() => toggleAircraft(aircraft.id)}
                disabled={!updateState}
                className={`group flex flex-col p-4 rounded-2xl border transition-all duration-300 text-left ${
                  state.aircraft.has(aircraft.id)
                    ? 'bg-slate-800 border-slate-700 text-white ring-2 ring-blue-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                } ${!updateState ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-black text-lg">{aircraft.name}</span>
                  {state.aircraft.has(aircraft.id) && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>}
                </div>
                <div className={`text-[10px] leading-tight mb-2 ${state.aircraft.has(aircraft.id) ? 'text-slate-400' : 'text-slate-500'}`}>{aircraft.description}</div>
                <div className={`mt-auto text-[10px] font-black tracking-widest px-2 py-1 rounded-lg ${state.aircraft.has(aircraft.id) ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  ОЗБ: {aircraft.missileType}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Launch Control Panel */}
      <div className={`p-8 rounded-[2rem] transition-all duration-500 border ${
        state.isLaunchDetected 
          ? 'bg-red-600/10 border-red-500 shadow-2xl shadow-red-600/20' 
          : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className={`text-2xl font-black ${state.isLaunchDetected ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
              {state.isLaunchDetected ? '⚠️ ФІКСАЦІЯ ПУСКУ РАКЕТ!' : 'МОНІТОР ПУСКІВ'}
            </h4>
            <div className="text-sm text-slate-500">
              {state.aircraft.size > 0 
                ? `В повітрі: ${Array.from(state.aircraft).map(id => AIRCRAFT_TYPES.find(a => a.id === id)?.name).join(', ')}` 
                : 'Повітряна активність стратегічної авіації відсутня'}
            </div>
          </div>

          {updateState && (
            <button
              disabled={!isAnyActive}
              onClick={() => setIsLaunchDetected(!state.isLaunchDetected)}
              className={`px-12 py-5 rounded-2xl font-black tracking-widest uppercase transition-all duration-300 transform active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${
                state.isLaunchDetected 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-600/40' 
                  : 'bg-slate-800 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-900 shadow-lg'
              }`}
            >
              {state.isLaunchDetected ? 'СКАСУВАТИ ТРИВОГУ' : 'ФІКСУВАТИ ПУСК'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategicAviation;
