import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_TRENDS_DATA } from '../../data';
import { useTheme } from '../../ThemeContext';
import { CHART_THEME } from '../../lib/chartTheme';

export function TrendsWidget() {
  const { theme } = useTheme();
  const ct = CHART_THEME[theme];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_TRENDS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} vertical={false} />
            <XAxis dataKey="time" stroke={ct.axis} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={ct.axis} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: ct.tooltipBg, borderColor: ct.tooltipBorder, borderRadius: '8px' }}
              itemStyle={{ color: ct.tooltipText }}
            />
            <Area type="monotone" dataKey="tokens" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorTokens)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
