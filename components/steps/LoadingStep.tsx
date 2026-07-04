'use client';

import { useEffect } from 'react';
import { CustomerType } from '@/lib/types';

interface Props {
  customerType: CustomerType;
  onComplete: () => void;
}

export default function LoadingStep({ customerType, onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="step active">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '60px 0', textAlign: 'center' }}>
        <div className="loading-dots"><span /><span /><span /></div>
        <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: '42px' }}>
          {customerType === 'existing' ? 'Checking your details' : 'Checking your company'}
        </h1>
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: '24px', color: 'var(--primary-10)' }}>
          {customerType === 'existing'
            ? 'Verifying your account and eligibility...'
            : 'Verifying details on Companies House and running eligibility checks...'}
        </p>
      </div>
    </div>
  );
}
