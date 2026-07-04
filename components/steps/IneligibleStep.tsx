interface Props {
  reason: string;
  onTryAnother: () => void;
}

const reasons: Record<string, string> = {
  revenue: 'Your annual revenue is below our £500k minimum threshold. We work with businesses generating at least £500,000 in annual revenue.',
  shareholding: 'You need to hold at least 50% voting rights to authorise a sale. Only majority shareholders can proceed with the manda platform.',
  psc: 'Only a Person of Significant Control (PSC) listed on Companies House can authorise a sale of the business.',
};

export default function IneligibleStep({ reason, onTryAnother }: Props) {
  return (
    <div className="step active">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '60px 0', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--coral-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#FB5950" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: '42px' }}>We can&apos;t take this forward right now</h1>
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: '24px', maxWidth: 400 }}>
          {reasons[reason] || 'Based on the information provided, we are unable to proceed at this time.'}
        </p>
        <button className="btn btn-secondary" onClick={onTryAnother} style={{ marginTop: 16 }}>Try another company</button>
      </div>
    </div>
  );
}
