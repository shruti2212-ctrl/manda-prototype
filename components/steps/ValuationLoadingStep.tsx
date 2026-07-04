export default function ValuationLoadingStep() {
  return (
    <div className="step active">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '60px 0', textAlign: 'center' }}>
        <div className="loading-dots"><span /><span /><span /></div>
        <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: '42px' }}>Calculating your valuation</h1>
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: '24px', color: 'var(--primary-10)' }}>Analysing comparable transactions in your sector...</p>
      </div>
    </div>
  );
}
