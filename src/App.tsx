import React, { useState } from 'react';
import { LayoutDashboard, Plus, Settings } from 'lucide-react';
import { WidgetConfig } from './types';
import { WIDGET_LIBRARY } from './data';
import { WidgetLibrary } from './components/WidgetLibrary';
import { WidgetContainer } from './components/widgets/WidgetContainer';
import { MetricsWidget } from './components/widgets/MetricsWidget';
import { TrendsWidget } from './components/widgets/TrendsWidget';
import { StatusWidget } from './components/widgets/StatusWidget';
import { AgentStateWidget } from './components/widgets/AgentStateWidget';
import { DeploymentLocationWidget } from './components/widgets/DeploymentLocationWidget';
import { IssueRateWidget } from './components/widgets/IssueRateWidget';
import { ActivitiesWidget } from './components/widgets/ActivitiesWidget';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';

const THEME_LABELS: Record<string, string> = {
  dark: 'Dark',
  yellow: 'Yellow',
};

export default function App() {
  const { theme, setTheme } = useTheme();

  const [activeWidgets, setActiveWidgets] = useState<WidgetConfig[]>(
    WIDGET_LIBRARY.filter(w => ['metrics_1', 'trends_1', 'status_1', 'activities_1'].includes(w.id))
  );

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const handleAddWidget = (widget: WidgetConfig) => {
    setActiveWidgets(prev => [...prev, widget]);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setActiveWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'metrics': return <MetricsWidget />;
      case 'trends': return <TrendsWidget />;
      case 'status': return <StatusWidget />;
      case 'agent_state': return <AgentStateWidget />;
      case 'deployment': return <DeploymentLocationWidget />;
      case 'issue_rate': return <IssueRateWidget />;
      case 'activities': return <ActivitiesWidget />;
      default: return <div style={{ color: 'var(--color-text-muted)' }} className="text-sm p-4">Widget component not found.</div>;
    }
  };

  const getColSpan = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-12 md:col-span-4 lg:col-span-3 row-span-2';
      case 'medium': return 'col-span-12 md:col-span-6 lg:col-span-4 row-span-2';
      case 'large': return 'col-span-12 lg:col-span-8 row-span-4';
      case 'full': return 'col-span-12 row-span-2';
      default: return 'col-span-12 md:col-span-6 row-span-2';
    }
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen font-sans p-4 flex flex-col gap-4 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-canvas)',
        color: 'var(--color-text-primary)',
        // @ts-ignore
        '--tw-selection-color': 'var(--color-selection)',
      }}
    >
      {/* Top Navigation */}
      <header
        className="flex items-center justify-between rounded-2xl px-6 py-3 shrink-0 border"
        style={{
          backgroundColor: 'var(--color-surface-muted)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-accent)',
              boxShadow: `0 0 20px var(--color-accent-shadow)`,
            }}
          >
            <LayoutDashboard size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Agent Dashboard
            </h1>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Global Agent Fleet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <select
            value={theme}
            onChange={e => setTheme(e.target.value as 'dark' | 'yellow')}
            className="text-sm font-medium rounded-lg px-3 py-2 border cursor-pointer transition-colors focus:outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            aria-label="Select theme"
          >
            {Object.entries(THEME_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <button
            onClick={() => setIsLibraryOpen(true)}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ backgroundColor: 'var(--color-accent)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Widget</span>
          </button>

          <button
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
            style={{
              backgroundColor: 'var(--color-hover-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeWidgets.length === 0 ? (
          <div
            className="h-full min-h-[60vh] flex flex-col items-center justify-center border-2 border-dashed rounded-3xl"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface-muted)',
            }}
          >
            <LayoutDashboard size={48} className="mb-4" style={{ color: 'var(--color-text-muted)' }} />
            <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Your dashboard is empty
            </h2>
            <p className="text-sm mb-6 max-w-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
              Customize your view by adding widgets from the library to monitor your agent fleet.
            </p>
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Plus size={16} />
              Open Widget Library
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
            <AnimatePresence mode="popLayout">
              {activeWidgets.map((widget) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  key={widget.id}
                  className={getColSpan(widget.size)}
                >
                  <WidgetContainer
                    title={widget.title}
                    onRemove={() => handleRemoveWidget(widget.id)}
                  >
                    {renderWidgetContent(widget.type)}
                  </WidgetContainer>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <WidgetLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        activeWidgetIds={activeWidgets.map(w => w.id)}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
}
