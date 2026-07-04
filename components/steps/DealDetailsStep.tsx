'use client';

import { ReactNode, useState } from 'react';
import { CustomerType } from '@/lib/types';
import { getCompanyData, formatFullCurrency } from '@/lib/data';
import BackButton from '@/components/BackButton';

interface Props {
  selectedCompany: string;
  customerType: CustomerType;
  overriddenRevenue: number | null;
  overriddenEbitda: number | null;
  onOverrideRevenue: (val: number | null) => void;
  onSave: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function DealDetailsStep({ selectedCompany, customerType, overriddenRevenue, overriddenEbitda, onOverrideRevenue, onSave, onBack, progress }: Props) {
  const data = getCompanyData(selectedCompany, overriddenRevenue, overriddenEbitda);
  const source = customerType === 'existing' ? 'From iwoca' : 'From Companies House';

  const [revenue, setRevenue] = useState(formatFullCurrency(data.revenue));
  const [revenueEditable, setRevenueEditable] = useState(false);
  const [reason, setReason] = useState('Ready for next venture');
  const [timeline, setTimeline] = useState('3-6 months');
  const [askingPrice, setAskingPrice] = useState('');
  const [valuationBasis, setValuationBasis] = useState('Profit multiple');
  const [postSale, setPostSale] = useState('Short handover (1-3 months)');

  const handleRevenueChange = (val: string) => {
    setRevenue(val);
    const parsed = parseInt(val.replace(/[^0-9]/g, ''));
    if (parsed) onOverrideRevenue(parsed);
  };

  const checkSvg = (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#00b278" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 7 5 11 13 3" />
    </svg>
  );

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div className="page-header">
        <h1>Deal details</h1>
        <p className="intro">Help us understand what you&apos;re looking for in a sale.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Revenue (last 12 months)</div>
          <input
            type="text"
            value={revenue}
            onChange={(e) => handleRevenueChange(e.target.value)}
            className={revenueEditable ? '' : 'prefilled'}
            readOnly={!revenueEditable}
          />
          {!revenueEditable && (
            <div className="prefilled-note">
              {checkSvg} {source}
              <span onClick={() => setRevenueEditable(true)} style={{ color: 'var(--primary-40)', cursor: 'pointer', marginLeft: 8 }}>Edit</span>
            </div>
          )}
        </div>

        <div className="field-group">
          <div className="field-label">Reason for selling</div>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="">Select reason</option>
            <option>Ready for next venture</option>
            <option>Retirement</option>
            <option>Health reasons</option>
            <option>Partner dispute</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field-group">
          <div className="field-label">Timeline</div>
          <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
            <option>ASAP (within 3 months)</option>
            <option>3-6 months</option>
            <option>6-12 months</option>
            <option>No rush, exploring options</option>
          </select>
        </div>

        <div className="field-group">
          <div className="field-label">Asking price</div>
          <input
            type="text"
            value={askingPrice}
            onChange={(e) => setAskingPrice(e.target.value)}
            placeholder="e.g. 2,000,000"
          />
          <div className="input-hint">What&apos;s the minimum you&apos;d accept for the business? (GBP)</div>
        </div>

        <div className="field-group">
          <div className="field-label">How did you arrive at this price?</div>
          <select value={valuationBasis} onChange={(e) => setValuationBasis(e.target.value)}>
            <option>Revenue multiple</option>
            <option>Profit multiple</option>
            <option>Asset-based</option>
            <option>Previous offer received</option>
            <option>Unsure</option>
          </select>
        </div>

        <div className="field-group">
          <div className="field-label">Post-sale involvement</div>
          <select value={postSale} onChange={(e) => setPostSale(e.target.value)}>
            <option>Clean break</option>
            <option>Short handover (1-3 months)</option>
            <option>Willing to stay on (6-12 months)</option>
            <option>Open to discuss</option>
          </select>
        </div>

        <div className="btn-row">
          <button className="btn btn-primary btn-full" onClick={onSave}>Save and return</button>
        </div>
      </div>
    </div>
  );
}
