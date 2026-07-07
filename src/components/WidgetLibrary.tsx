import React from 'react';
import { WIDGET_LIBRARY } from '../data';
import { Plus, X } from 'lucide-react';
import { WidgetConfig } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface WidgetLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  activeWidgetIds: string[];
  onAddWidget: (widget: WidgetConfig) => void;
}

export function WidgetLibrary({ isOpen, onClose, activeWidgetIds, onAddWidget }: WidgetLibraryProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 shadow-2xl flex flex-col border-l"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Widget Library
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Add widgets to customize your dashboard
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-md transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-hover-surface)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {WIDGET_LIBRARY.map((widget) => {
                const isActive = activeWidgetIds.includes(widget.id);
                return (
                  <div
                    key={widget.id}
                    className="p-3 rounded-lg border flex items-start justify-between gap-4 transition-colors"
                    style={{
                      backgroundColor: isActive ? 'var(--color-surface-muted)' : 'var(--color-hover-surface)',
                      borderColor: isActive ? 'var(--color-border-muted)' : 'var(--color-border)',
                      opacity: isActive ? 0.6 : 1,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {widget.title}
                      </h3>
                      <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                        {widget.description}
                      </p>
                      <div className="mt-2 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>
                        Size: {widget.size}
                      </div>
                    </div>
                    <button
                      disabled={isActive}
                      onClick={() => onAddWidget(widget)}
                      className="p-1.5 rounded-md flex-shrink-0 transition-colors text-white"
                      style={{
                        backgroundColor: isActive ? 'var(--color-hover-surface)' : 'var(--color-accent)',
                        cursor: isActive ? 'not-allowed' : 'pointer',
                        color: isActive ? 'var(--color-text-muted)' : 'white',
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
