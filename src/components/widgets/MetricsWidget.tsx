import React from 'react';
import { Activity, Users, Zap, DollarSign } from 'lucide-react';

export function MetricsWidget() {
  const metrics = [
    { label: 'Total Agents', value: '1,248', change: '+12%', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Active Tasks', value: '342', change: '+5%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Avg Latency', value: '420ms', change: '-15ms', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Daily Cost', value: '$2,450', change: '+2.4%', icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="themed-inner-card flex flex-col justify-center p-4 rounded-lg border"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {m.label}
            </span>
            <div className={`p-1.5 rounded-md ${m.bg}`}>
              <m.icon size={14} className={m.color} />
            </div>
          </div>
          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {m.value}
            </span>
            <span className="text-xs mb-1 font-medium text-emerald-400">{m.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
