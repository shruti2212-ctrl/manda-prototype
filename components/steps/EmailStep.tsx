import { ReactNode } from 'react';
import { CustomerType } from '@/lib/types';

interface Props {
  email: string;
  setEmail: (email: string) => void;
  customerType: CustomerType;
  onCustomerTypeChange: (type: CustomerType) => void;
  onContinue: () => void;
  progress: ReactNode;
}

export default function EmailStep({ email, setEmail, customerType, onCustomerTypeChange, onContinue, progress }: Props) {
  return (
    <div className="step active">
      {/* Demo toggle */}
      <div style={{ display: 'flex', gap: 0, border: '1px solid var(--secondary-90)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
        <button
          onClick={() => onCustomerTypeChange('existing')}
          style={{
            flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
            background: customerType === 'existing' ? 'var(--primary-10)' : 'white',
            color: customerType === 'existing' ? 'white' : 'var(--primary-10)',
          }}
        >
          Existing iwoca customer
        </button>
        <button
          onClick={() => onCustomerTypeChange('new')}
          style={{
            flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', border: 'none', cursor: 'pointer',
            background: customerType === 'new' ? 'var(--primary-10)' : 'white',
            color: customerType === 'new' ? 'white' : 'var(--primary-10)',
          }}
        >
          New customer
        </button>
      </div>

      {progress}

      <div className="page-header">
        <h1>Sell your business</h1>
        <p className="intro">Enter your email to get started. You can use this to come back and continue later.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Email address</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.co.uk"
          />
        </div>
        <div className="btn-row">
          <button className="btn btn-primary btn-full" onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}
