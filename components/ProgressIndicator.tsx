interface Props {
  phase: number;
}

export default function ProgressIndicator({ phase }: Props) {
  const steps = [
    { label: 'Apply', num: 1 },
    { label: 'Complete checks', num: 2 },
    { label: 'Sign and activate', num: 3 },
  ];

  return (
    <div className="progress-indicator">
      {steps.map((step) => {
        const isComplete = phase > step.num;
        const isActive = phase === step.num;
        return (
          <div className="progress-step" key={step.num}>
            <div className={`progress-bar ${isComplete ? 'complete' : isActive ? 'active' : ''}`} />
            <div className={`progress-label ${isActive ? 'current' : ''}`}>
              {isComplete && (
                <span className="check-sm">
                  <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
                </span>
              )}
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
