import React from 'react';
import { MOCK_ACTIVITIES } from '../../data';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export function ActivitiesWidget() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'failed': return <XCircle size={16} className="text-red-500" />;
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col space-y-3">
        {MOCK_ACTIVITIES.map((activity) => (
          <div key={activity.id} className="themed-activity-item flex items-start gap-3 p-3 rounded-lg border">
            <div className="mt-0.5">
              {getStatusIcon(activity.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {activity.agentName}
                </span>
                <span className="text-xs whitespace-nowrap ml-2" style={{ color: 'var(--color-text-muted)' }}>
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>
                {activity.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
