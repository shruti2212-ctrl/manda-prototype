'use client';

import { ReactNode, useRef, useState } from 'react';
import { CustomerType } from '@/lib/types';
import BackButton from '@/components/BackButton';

interface Props {
  email: string;
  customerType: CustomerType;
  onVerified: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function VerifyCodeStep({ email, onVerified, onBack, progress }: Props) {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (index === 5 && value) {
      setTimeout(onVerified, 300);
    }
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2000);
  };

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />
      <div className="page-header">
        <h1>Check your email</h1>
        <p className="intro">We&apos;ve sent a 6-digit code to <strong>{email}</strong></p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Verification code</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {codes.map((code, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleInput(i, e.target.value)}
                style={{ width: 48, textAlign: 'center', fontSize: 24, fontWeight: 700, padding: '12px 0' }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--secondary-40)' }}>Didn&apos;t receive it? </span>
          <span
            onClick={handleResend}
            style={{ fontSize: 13, fontWeight: 600, color: resent ? 'var(--success-mid)' : 'var(--primary-40)', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {resent ? 'Code resent' : 'Resend code'}
          </span>
        </div>
      </div>
    </div>
  );
}
