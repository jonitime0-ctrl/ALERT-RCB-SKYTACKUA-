
import React, { useState } from 'react';

interface AdminPanelProps {
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
  activeShaheds: Set<string>;
  setActiveShaheds: (s: Set<string>) => void;
  activeBallistics: Set<string>;
  setActiveBallistics: (s: Set<string>) => void;
  isKalibrActive: boolean;
  setIsKalibrActive: (v: boolean) => void;
  aviationState: any;
  setAviationState: (v: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isAdmin, 
  setIsAdmin, 
  activeShaheds, 
  // Added missing setActiveShaheds to props destructuring
  setActiveShaheds,
  activeBallistics, 
  // Added missing setActiveBallistics to props destructuring
  setActiveBallistics,
  isKalibrActive, 
  setIsKalibrActive,
  // Added missing aviationState and setAviationState to props destructuring
  aviationState,
  setAviationState
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'zz6m7') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Невірний пароль');
    }
  };

  if (!isAdmin) {
    return (
      <div className="glass-effect p-6 rounded-3xl border border-blue-500/20 max-w-md mx-auto">
        <h3 className="text-xl font-black mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Адмін Панель
        </h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Введіть пароль..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30">
            Увійти
          </button>
        </form>
      </div>
    );
  }

  const activeCount = activeShaheds.size + activeBallistics.size + (isKalibrActive ? 1 : 0);

  return (
    <div className="glass-effect p-8 rounded-[2rem] border-2 border-blue-600/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <button 
          onClick={() => setIsAdmin(false)}
          className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1"
        >
          Вийти <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1m6-10V4a3 3 0 00-6 0v1" /></svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-black mb-1">Вітаємо, Адмін</h3>
          <p className="text-slate-500 text-sm">Керування активними загрозами в реальному часі</p>
          <div className="mt-4 flex gap-4">
            <div className="bg-red-600/10 border border-red-500/20 px-4 py-2 rounded-2xl">
              <span className="text-xs font-bold text-red-500 block">АКТИВНИХ ЦІЛЕЙ</span>
              <span className="text-2xl font-black text-red-600">{activeCount}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
             <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Швидкі команди</h4>
             <div className="space-y-2">
                <button 
                  onClick={() => { setActiveShaheds(new Set()); setActiveBallistics(new Set()); setIsKalibrActive(false); }}
                  className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-all"
                >
                  Скинути всі тривоги
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
