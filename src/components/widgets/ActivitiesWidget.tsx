import React, { useRef, useState } from 'react';
import { MOCK_ACTIVITIES } from '../../data';
import { Calendar, CheckCircle2, Clock, X, XCircle } from 'lucide-react';

function toDateBounds() {
  const today = new Date();
  const max = today.toISOString().slice(0, 10);
  const min = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return { min, max };
}

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ActivitiesWidget() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const { min, max } = toDateBounds();

  const filtered = selectedDate
    ? MOCK_ACTIVITIES.filter(a => a.date === selectedDate)
    : MOCK_ACTIVITIES;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'failed':  return <XCircle size={16} className="text-red-500" />;
      case 'pending': return <Clock size={16} className="text-amber-500" />;
      default:        return null;
    }
  };

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Date filter toolbar */}
      <div className="flex items-center justify-end gap-2 shrink-0">
        {selectedDate && (
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-widget-inner)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <span>{formatDisplayDate(selectedDate)}</span>
            <button
              onClick={() => setSelectedDate('')}
              className="themed-icon-button rounded p-0.5"
              aria-label="Clear date filter"
            >
              <X size={11} />
            </button>
          </div>
        )}

        {/* Hidden native date input */}
        <input
          ref={dateInputRef}
          type="date"
          min={min}
          max={max}
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="themed-date-input"
          aria-label="Filter by date"
        />

        <button
          onClick={() => dateInputRef.current?.showPicker()}
          className={`themed-icon-button p-1.5 rounded-md border ${selectedDate ? 'themed-date-active' : ''}`}
          style={{ borderColor: 'var(--color-border)' }}
          aria-label="Open date picker"
        >
          <Calendar size={15} />
        </button>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filtered.length === 0 ? (
          <div
            className="h-full flex flex-col items-center justify-center gap-2 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Calendar size={28} style={{ opacity: 0.4 }} />
            <span>No activity found for this date</span>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {filtered.map((activity) => (
              <div
                key={activity.id}
                className="themed-activity-item flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="mt-0.5">{getStatusIcon(activity.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {activity.agentName}
                    </span>
                    <span
                      className="text-xs whitespace-nowrap ml-2"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
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
        )}
      </div>
    </div>
  );
}
