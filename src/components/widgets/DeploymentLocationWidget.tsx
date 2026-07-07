import React from 'react';
import { MOCK_DEPLOYMENTS } from '../../data';
import { Server } from 'lucide-react';

export function DeploymentLocationWidget() {
  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="flex flex-col space-y-4">
        {MOCK_DEPLOYMENTS.map((dep, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="themed-inner-card p-2 rounded-md">
                <Server size={16} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {dep.region}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {dep.count} agents deployed
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {dep.health}%
              </span>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Health
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
