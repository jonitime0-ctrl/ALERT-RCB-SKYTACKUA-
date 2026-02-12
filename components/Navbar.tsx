
import React from 'react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const sections = [
    { id: 'shahed', label: 'Шахеди' },
    { id: 'ballistic', label: 'Балістика' },
    { id: 'kalibr', label: 'Калібри' },
    { id: 'aviation', label: 'Авіація' },
    { id: 'stats', label: 'Статистика' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">S</div>
          <span className="font-black text-xl tracking-tighter hidden sm:block">SkyTrackUa</span>
        </div>

        <div className="hidden lg:flex gap-1">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {sec.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white transition-all duration-300"
          title="Змінити тему"
        >
          {theme === 'light' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
