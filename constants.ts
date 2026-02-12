
import { LaunchSite, ThreatType, StatEntry, Aircraft } from './types';

export const SHAHED_SITES: LaunchSite[] = [
  { id: 's1', name: 'Приморсько-Ахтарськ', location: 'Краснодарський край, РФ', type: ThreatType.SHAHED },
  { id: 's2', name: 'Єйськ', location: 'Краснодарський край, РФ', type: ThreatType.SHAHED },
  { id: 's3', name: 'Мис Чауда', location: 'ТОТ Крим', type: ThreatType.SHAHED },
  { id: 's4', name: 'Халіно', location: 'Курська обл, РФ', type: ThreatType.SHAHED },
  { id: 's5', name: 'Балаклава', location: 'ТОТ Крим', type: ThreatType.SHAHED },
];

export const BALLISTIC_SITES: LaunchSite[] = [
  { id: 'b1', name: 'Джанкой', location: 'ТОТ Крим', type: ThreatType.BALLISTIC },
  { id: 'b2', name: 'Бєлгородщина', location: 'Бєлгородська обл, РФ', type: ThreatType.BALLISTIC },
  { id: 'b3', name: 'Воронежчина', location: 'Воронезька обл, РФ', type: ThreatType.BALLISTIC },
  { id: 'b4', name: 'Курщина', location: 'Курська обл, РФ', type: ThreatType.BALLISTIC },
  { id: 'b5', name: 'Мис Тарханкут', location: 'ТОТ Крим', type: ThreatType.BALLISTIC },
];

export const AVIATION_AIRFIELDS: LaunchSite[] = [
  { id: 'a1', name: 'Оленья', location: 'Мурманська обл, РФ', type: ThreatType.AVIATION },
  { id: 'a2', name: 'Енгельс-2', location: 'Саратовська обл, РФ', type: ThreatType.AVIATION },
  { id: 'a3', name: 'Шайковка', location: 'Калузька обл, РФ', type: ThreatType.AVIATION },
  { id: 'a4', name: 'Саваслейка', location: 'Нижньогородська обл, РФ', type: ThreatType.AVIATION },
  { id: 'a5', name: 'Моздок', location: 'Північна Осетія, РФ', type: ThreatType.AVIATION },
];

export const AIRCRAFT_TYPES: Aircraft[] = [
  { id: 'mig31k', name: 'МіГ-31К', description: 'Носій гіперзвукових ракет "Кинджал"', missileType: 'Х-47М2 "Кинджал"' },
  { id: 'tu95ms', name: 'Ту-95МС', description: 'Стратегічний бомбардувальник-ракетоносець', missileType: 'Х-101 / Х-555' },
  { id: 'tu22m3', name: 'Ту-22М3', description: 'Дальній бомбардувальник-ракетоносець', missileType: 'Х-22 / Х-32' },
  { id: 'tu160', name: 'Ту-160', description: 'Надзвуковий стратегічний бомбардувальник', missileType: 'Х-101 / Х-555' },
];

export const INITIAL_STATS: StatEntry[] = [
  { id: '1', date: '2024-02-10', count: 24, location: 'Чауда', details: 'Пуск з Криму' },
  { id: '2', date: '2024-02-12', count: 15, location: 'Курськ', details: 'Північний напрямок' },
  { id: '3', date: '2024-02-15', count: 40, location: 'Приморсько-Ахтарськ', details: 'Масований пуск' },
  { id: '4', date: '2024-02-18', count: 22, location: 'Єйськ', details: 'Атака на Південь' },
  { id: '5', date: '2024-02-20', count: 35, location: 'Балаклава', details: 'Комбінована атака' },
];
