import { ReactNode } from 'react';
import { HubItems, StepId } from '@/lib/types';

interface Props {
  hubItems: HubItems;
  onNavigate: (step: StepId) => void;
  progress: ReactNode;
}

export default function HubStep({ hubItems, onNavigate, progress }: Props) {
  const items = [
    { key: 'details' as const, label: 'Business details', time: '~ 3 mins', step: '5' as StepId },
    { key: 'docs' as const, label: 'Documents', time: '~ 5 mins', step: '6' as StepId, optional: true },
    { key: 'deal' as const, label: 'Deal details', time: '~ 3 mins', step: '7' as StepId },
  ];

  return (
    <div className="step active">
      {progress}
      <div className="save-indicator">Your progress is saved. Return anytime using your email.</div>

      <div className="page-header">
        <h1>Complete checks</h1>
        <p className="intro">You can complete the steps below in any order.</p>
      </div>

      <div className="hub-list">
        {items.map((item) => (
          <div
            key={item.key}
            className={`hub-item ${hubItems[item.key] ? 'completed' : ''}`}
            onClick={() => onNavigate(item.step)}
          >
            <div className="hub-item-left">
              <span className="item-text">{item.label}</span>
              {item.optional && (
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 6px', borderRadius: 4, marginLeft: 8 }}>Optional</span>
              )}
              <span className="arrow">
                <svg viewBox="0 0 6 10"><polyline points="1 1 5 5 1 9" /></svg>
              </span>
            </div>
            <div className="hub-item-right">
              {hubItems[item.key] ? (
                <div className="check-done">
                  <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
                </div>
              ) : (
                <>
                  <span className="time">{item.time}</span>
                  <span className="clock">
                    <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" /><polyline points="8 4 8 8 11 10" /></svg>
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
