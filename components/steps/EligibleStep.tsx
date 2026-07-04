interface Props {
  companyName: string;
  onContinue: () => void;
}

export default function EligibleStep({ companyName, onContinue }: Props) {
  return (
    <div className="step active">
      <div className="approved-screen">
        <div className="approved-icon">
          <svg viewBox="0 0 60 60" fill="none">
            <path d="M30 2C14.536 2 2 14.536 2 30s12.536 28 28 28 28-12.536 28-28S45.464 2 30 2z" stroke="#08172B" strokeWidth="2.5" />
            <path d="M20 30l7 7 13-13" stroke="#00b278" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <p className="approved-heading">Your business is <span className="green">eligible</span> for the manda platform.</p>
        <div className="approved-pill">{companyName}</div>
      </div>
      <div className="divider" />
      <div className="approved-cta">
        <h3>Let&apos;s get you deal-ready</h3>
        <p>Complete a few onboarding checks so we can match you with the right buyers and provide your valuation.</p>
        <button className="btn btn-primary" onClick={onContinue}>Continue to onboarding</button>
      </div>
    </div>
  );
}
