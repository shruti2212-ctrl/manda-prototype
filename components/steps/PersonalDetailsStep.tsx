'use client';

import { ReactNode, useState } from 'react';
import { CustomerType } from '@/lib/types';
import BackButton from '@/components/BackButton';

interface Props {
  email: string;
  dob: { day: string; month: string; year: string };
  customerType: CustomerType;
  pscName: string;
  onContinue: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function PersonalDetailsStep({ email, dob, customerType, pscName, onContinue, onBack, progress }: Props) {
  const [phone, setPhone] = useState(customerType === 'existing' ? '+44 7700 123456' : '');

  const dobDisplay = dob.day && dob.month && dob.year
    ? `${dob.day.padStart(2, '0')} / ${dob.month.padStart(2, '0')} / ${dob.year}`
    : customerType === 'existing' ? '15 / 03 / 1992' : '';

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
        <h1>Personal details</h1>
        <p className="intro">Here&apos;s what we have on file. Only your phone number can be updated.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Full name</div>
          <input type="text" value={pscName} className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} From Companies House (PSC register)</div>
        </div>

        <div className="field-group">
          <div className="field-label">Email</div>
          <input type="text" value={email} className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} Provided at sign-up</div>
        </div>

        <div className="field-group">
          <div className="field-label">Date of birth</div>
          <input type="text" value={dobDisplay} className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} Verified against protected register</div>
        </div>

        <div className="field-group">
          <div className="field-label">Phone number</div>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 900000" />
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary btn-full" onClick={onContinue}>Confirm and continue</button>
      </div>
    </div>
  );
}
