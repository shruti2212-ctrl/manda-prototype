import { ReactNode } from 'react';
import BackButton from '@/components/BackButton';

interface Props {
  onOpenAgreement: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function AgreementsStep({ onOpenAgreement, onBack, progress }: Props) {
  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div style={{ marginTop: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary-10)', lineHeight: '42px' }}>Read and sign agreements</h1>
        <p style={{ fontSize: 20, fontWeight: 300, color: 'var(--primary-10)', lineHeight: '28px', marginTop: 16 }}>
          Review and sign your engagement agreement to unlock your valuation estimate.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--secondary-90)', borderBottom: '1px solid var(--secondary-90)', marginTop: 36 }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onOpenAgreement(); }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, borderBottom: '1px solid var(--secondary-90)', textDecoration: 'none' }}
        >
          <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--primary-40)' }}>Read and sign your engagement agreement</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#205eac" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
