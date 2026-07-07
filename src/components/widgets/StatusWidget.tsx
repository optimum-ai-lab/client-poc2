import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MOCK_STATUS_DATA } from '../../data';
import { useTheme } from '../../ThemeContext';
import { CHART_THEME } from '../../lib/chartTheme';

export function StatusWidget() {
  const { theme } = useTheme();
  const ct = CHART_THEME[theme];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={MOCK_STATUS_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {MOCK_STATUS_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: ct.tooltipBg, borderColor: ct.tooltipBorder, borderRadius: '8px' }}
            itemStyle={{ color: ct.tooltipText }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: ct.axisLabel }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
