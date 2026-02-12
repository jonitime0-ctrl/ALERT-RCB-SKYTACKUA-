
import React, { useState, useEffect } from 'react';
import { Theme, StatEntry } from './types';
import Navbar from './components/Navbar';
import KyivTime from './components/KyivTime';
import ShahedMonitor from './components/ShahedMonitor';
import Statistics from './components/Statistics';
import BallisticMonitor from './components/BallisticMonitor';
import StrategicAviation from './components/StrategicAviation';
import KalibrMonitor from './components/KalibrMonitor';
import AdminPanel from './components/AdminPanel';
import { INITIAL_STATS } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [stats, setStats] = useState<StatEntry[]>(INITIAL_STATS);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Global Threat State
  const [activeShaheds, setActiveShaheds] = useState<Set<string>>(new Set());
  const [activeBallistics, setActiveBallistics] = useState<Set<string>>(new Set());
  const [isKalibrActive, setIsKalibrActive] = useState<boolean>(false);
  const [aviationState, setAviationState] = useState<{
    airfields: Set<string>;
    aircraft: Set<string>;
    isLaunchDetected: boolean;
  }>({
    airfields: new Set(),
    aircraft: new Set(),
    isLaunchDetected: false
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const deleteStat = (id: string) => {
    setStats(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16 relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2">
              SkyTrack<span className="text-blue-500">Ua</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Централізований моніторинг повітряних загроз</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <KyivTime />
            <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-red-500 animate-pulse">
              <span className="flex h-2 w-2 rounded-full bg-red-500 mt-1"></span>
              Система активна
            </div>
          </div>
        </header>

        {/* Admin Section */}
        <section id="admin">
          <AdminPanel 
            isAdmin={isAdmin} 
            setIsAdmin={setIsAdmin}
            activeShaheds={activeShaheds}
            setActiveShaheds={setActiveShaheds}
            activeBallistics={activeBallistics}
            setActiveBallistics={setActiveBallistics}
            isKalibrActive={isKalibrActive}
            setIsKalibrActive={setIsKalibrActive}
            aviationState={aviationState}
            setAviationState={setAviationState}
          />
        </section>

        {/* Section 1: Shahed Launch Sites */}
        <section id="shahed">
          <ShahedMonitor activeSites={activeShaheds} toggleSite={isAdmin ? (id) => {
             const n = new Set(activeShaheds);
             if (n.has(id)) n.delete(id); else n.add(id);
             setActiveShaheds(n);
          } : undefined} />
        </section>

        {/* Section 2: Ballistic Threats */}
        <section id="ballistic">
          <BallisticMonitor activeThreats={activeBallistics} toggleThreat={isAdmin ? (id) => {
             const n = new Set(activeBallistics);
             if (n.has(id)) n.delete(id); else n.add(id);
             setActiveBallistics(n);
          } : undefined} />
        </section>

        {/* Section 3: Kalibr Threats */}
        <section id="kalibr">
          <KalibrMonitor isActive={isKalibrActive} setIsActive={isAdmin ? setIsKalibrActive : undefined} />
        </section>

        {/* Section 4: Strategic Aviation */}
        <section id="aviation">
          <StrategicAviation 
            state={aviationState} 
            updateState={isAdmin ? setAviationState : undefined} 
          />
        </section>

        {/* Section 5: Analytics and Alerts Map */}
        <section id="stats">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h2 className="text-3xl font-black uppercase">Статистика та Карта</h2>
          </div>
          <Statistics stats={stats} onDelete={deleteStat} />
        </section>
      </main>

      {/* Decorative Christmas Tree Background */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0 flex justify-around items-end opacity-20 dark:opacity-10 overflow-hidden h-96">
        <div className="christmas-tree translate-y-10"></div>
        <div className="christmas-tree scale-150 translate-y-20"></div>
        <div className="christmas-tree translate-y-12"></div>
        <div className="christmas-tree scale-125 translate-y-16"></div>
        <div className="christmas-tree translate-y-8"></div>
      </div>

      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 py-12 mt-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold mb-4">SkyTrackUa</h4>
            <p className="text-slate-500 text-sm">Інформаційний ресурс для відстеження активності ворожих засобів ураження.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Навігація</h4>
            <ul className="text-slate-500 text-sm space-y-2">
              <li><a href="#shahed" className="hover:text-blue-500">Шахеди</a></li>
              <li><a href="#ballistic" className="hover:text-blue-500">Балістика</a></li>
              <li><a href="#kalibr" className="hover:text-blue-500">Калібри</a></li>
              <li><a href="#aviation" className="hover:text-blue-500">Авіація</a></li>
              <li><a href="#stats" className="hover:text-blue-500">Статистика</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Контакти</h4>
            <p className="text-slate-500 text-sm">З питань співпраці пишіть у наш офіційний Telegram.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} SkyTrackUa. Слава Україні!
        </div>
      </footer>

      <style>{`
        .christmas-tree {
          width: 0;
          height: 0;
          border-left: 100px solid transparent;
          border-right: 100px solid transparent;
          border-bottom: 160px solid #059669;
          position: relative;
        }
        .christmas-tree:before {
          content: '';
          width: 0;
          height: 0;
          border-left: 80px solid transparent;
          border-right: 80px solid transparent;
          border-bottom: 120px solid #059669;
          position: absolute;
          top: -100px;
          left: -80px;
        }
        .christmas-tree:after {
          content: '';
          width: 0;
          height: 0;
          border-left: 60px solid transparent;
          border-right: 60px solid transparent;
          border-bottom: 90px solid #059669;
          position: absolute;
          top: -160px;
          left: -60px;
        }
      `}</style>
    </div>
  );
};

export default App;
