'use client';

import { ReactNode, useState } from 'react';
import BackButton from '@/components/BackButton';

interface Props {
  onSelect: (name: string) => void;
  onIneligible: () => void;
  onBack: () => void;
  progress: ReactNode;
}

const existingCompanies = [
  { key: 'bright', name: 'Bright Digital Solutions Ltd' },
  { key: 'green', name: 'Green Logistics Group Ltd' },
  { key: 'nova', name: 'Nova Consulting Partners Ltd' },
];

export default function CompanyPickerStep({ onSelect, onIneligible, onBack, progress }: Props) {
  const [selectedKey, setSelectedKey] = useState('');
  const [revenueRange, setRevenueRange] = useState('');

  const handleContinue = () => {
    if (!revenueRange) { alert('Please select your revenue range'); return; }
    if (revenueRange === 'under500k') { onIneligible(); return; }
    const company = existingCompanies.find(c => c.key === selectedKey);
    onSelect(company?.name || 'Bright Digital Solutions Ltd');
  };

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div className="page-header">
        <h1>Which company are you selling?</h1>
        <p className="intro">We found multiple businesses linked to your account. Select the one you&apos;d like to sell.</p>
      </div>

      <div className="form-fields">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {existingCompanies.map((company) => (
            <div
              key={company.key}
              onClick={() => setSelectedKey(company.key)}
              style={{
                border: `1px solid ${selectedKey === company.key ? 'var(--primary-40)' : 'var(--secondary-90)'}`,
                borderRadius: 8, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--primary-10)' }}>{company.name}</div>
            </div>
          ))}
        </div>

        {selectedKey && (
          <>
            <div className="field-group" style={{ marginTop: 16 }}>
              <div className="field-label">Approximate annual revenue</div>
              <select value={revenueRange} onChange={(e) => setRevenueRange(e.target.value)}>
                <option value="">Select range</option>
                <option value="under500k">Under &pound;500k</option>
                <option value="500k-1m">&pound;500k - &pound;1M</option>
                <option value="1m-2m">&pound;1M - &pound;2M</option>
                <option value="2m-5m">&pound;2M - &pound;5M</option>
                <option value="5m-plus">&pound;5M+</option>
              </select>
              <div className="input-hint">This helps us determine if we&apos;re the right platform for you</div>
            </div>

            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary btn-full" onClick={handleContinue}>Continue</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
