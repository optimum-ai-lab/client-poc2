import type { Theme } from '../types';

export interface ChartColors {
  grid: string;
  axis: string;
  axisLabel: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  cursor: string;
}

export const CHART_THEME: Record<Theme, ChartColors> = {
  dark: {
    grid: '#334155',
    axis: '#64748b',
    axisLabel: '#94a3b8',
    tooltipBg: '#1e293b',
    tooltipBorder: '#334155',
    tooltipText: '#e2e8f0',
    cursor: '#334155',
  },
  yellow: {
    grid: '#fde68a',
    axis: '#b45309',
    axisLabel: '#92400e',
    tooltipBg: '#fffbeb',
    tooltipBorder: '#fde68a',
    tooltipText: '#78350f',
    cursor: '#fef3c7',
  },
  ocean: {
    grid: '#0a2540',
    axis: '#38bdf8',
    axisLabel: '#7dd3fc',
    tooltipBg: '#041628',
    tooltipBorder: '#0a2540',
    tooltipText: '#bfdbfe',
    cursor: '#082030',
  },
};
