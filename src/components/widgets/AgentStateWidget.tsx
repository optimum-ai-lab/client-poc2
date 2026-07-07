import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_AGENT_STATES } from '../../data';
import { useTheme } from '../../ThemeContext';
import { CHART_THEME } from '../../lib/chartTheme';

export function AgentStateWidget() {
  const { theme } = useTheme();
  const ct = CHART_THEME[theme];

  return (
    <div className="h-full w-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={MOCK_AGENT_STATES}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} horizontal={true} vertical={false} />
          <XAxis type="number" stroke={ct.axis} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke={ct.axisLabel} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: ct.cursor, opacity: 0.4 }}
            contentStyle={{ backgroundColor: ct.tooltipBg, borderColor: ct.tooltipBorder, borderRadius: '8px' }}
          />
          <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
