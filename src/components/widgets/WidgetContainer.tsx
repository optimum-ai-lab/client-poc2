import React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface WidgetContainerProps {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function WidgetContainer({ title, onRemove, children, className }: WidgetContainerProps) {
  return (
    <div
      className={cn('flex flex-col rounded-3xl p-5 overflow-hidden h-full border', className)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-xs font-bold uppercase tracking-tighter"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {title}
        </h3>
        {onRemove && (
          <button
            onClick={onRemove}
            className="themed-icon-button p-1 rounded-md"
            aria-label="Remove widget"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
