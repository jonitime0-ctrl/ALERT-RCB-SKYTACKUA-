
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { StatEntry } from '../types';

interface StatisticsProps {
  stats: StatEntry[];
  onDelete: (id: string) => void;
}

const Statistics: React.FC<StatisticsProps> = ({ stats, onDelete }) => {
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  
  const pieData = stats.reduce((acc: any[], curr) => {
    const existing = acc.find(item => item.name === curr.location);
    if (existing) existing.value += curr.count;
    else acc.push({ name: curr.location, value: curr.count });
    return acc;
  }, []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-effect p-8 rounded-[2rem] lg:col-span-2">
          <h3 className="text-xl font-black mb-8 flex justify-between items-center">
            Динаміка інтенсивності атак
            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase">Останні 30 днів</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: 'white' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-effect p-8 rounded-[2rem]">
          <h3 className="text-xl font-black mb-8">Частка по локаціях</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
             {pieData.map((d, i) => (
               <div key={d.name} className="flex items-center gap-2 text-[10px] font-bold">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                 <span className="truncate">{d.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-[2rem] overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-100/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-2xl font-black">Карта повітряних тривог</h3>
            <p className="text-xs text-slate-500">Актуальна ситуація станом на зараз</p>
          </div>
          <a 
            href="https://alerts.in.ua" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            Відкрити повну мапу
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
        <div className="aspect-video w-full bg-slate-950">
           <iframe 
            src="https://alerts.in.ua" 
            className="w-full h-full border-none opacity-80"
            title="Ukraine Air Raid Alert Map"
           />
        </div>
      </div>

      <div className="glass-effect rounded-[2rem] overflow-hidden">
        <div className="p-8 bg-slate-100/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-black">Історичний журнал пусків</h3>
          <p className="text-xs text-slate-500">Систематизовані дані про попередні атаки</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-200/20 dark:bg-slate-800/20 text-slate-500 text-xs uppercase font-black tracking-widest">
                <th className="px-8 py-5">Дата події</th>
                <th className="px-8 py-5">Локація зафіксована</th>
                <th className="px-8 py-5 text-center">Одиниці</th>
                <th className="px-8 py-5">Деталі атаки</th>
                <th className="px-8 py-5 text-right">Керування</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {stats.map((entry) => (
                <tr key={entry.id} className="hover:bg-blue-500/5 transition-colors group">
                  <td className="px-8 py-6 font-bold">{entry.date}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-500">
                      {entry.location}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center font-mono font-black text-lg text-red-500">{entry.count}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{entry.details}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => onDelete(entry.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
