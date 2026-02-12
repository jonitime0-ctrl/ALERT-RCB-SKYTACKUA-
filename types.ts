
export enum ThreatType {
  SHAHED = 'SHAHED',
  BALLISTIC = 'BALLISTIC',
  AVIATION = 'AVIATION',
  KALIBR = 'KALIBR'
}

export interface LaunchSite {
  id: string;
  name: string;
  location: string;
  type: ThreatType;
}

export interface Aircraft {
  id: string;
  name: string;
  description: string;
  missileType: string;
}

export interface StatEntry {
  id: string;
  date: string;
  count: number;
  location: string;
  details: string;
}

export type Theme = 'light' | 'dark';
