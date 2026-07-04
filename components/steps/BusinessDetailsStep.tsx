'use client';

import { ReactNode, useState } from 'react';
import { CustomerType } from '@/lib/types';
import { getCompanyData } from '@/lib/data';
import BackButton from '@/components/BackButton';

interface Props {
  selectedCompany: string;
  customerType: CustomerType;
  onSave: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function BusinessDetailsStep({ selectedCompany, customerType, onSave, onBack, progress }: Props) {
  const data = getCompanyData(selectedCompany, null, null);
  const source = customerType === 'existing' ? 'From iwoca' : 'From Companies House';
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [headcount, setHeadcount] = useState('');

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
        <h1>Business details</h1>
        <p className="intro">Tell us about your company. Fields marked &ldquo;public&rdquo; will be visible to potential buyers.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Company name</div>
          <input type="text" value={selectedCompany} className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} From Companies House</div>
        </div>

        <div className="field-group">
          <div className="field-label">Sector</div>
          <input type="text" value={data.sector} className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} {source}</div>
        </div>

        <div className="field-group">
          <div className="field-label">One-line description</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Digital marketing agency specialising in B2B SaaS companies"
          />
        </div>

        <div className="field-group">
          <div className="field-label">Company website <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span></div>
          <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="e.g. www.brightdigital.co.uk" />
        </div>

        <div className="field-group">
          <div className="field-label">Headcount</div>
          <select value={headcount} onChange={(e) => setHeadcount(e.target.value)}>
            <option value="">Select range</option>
            <option>1-5</option>
            <option>6-15</option>
            <option>16-30</option>
            <option>31-50</option>
            <option>50+</option>
          </select>
        </div>

        <div className="field-group">
          <div className="field-label">Registered address</div>
          <input type="text" value="10 Queen Street Place, London, EC4R 1AG" className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} From Companies House</div>
        </div>

        <div className="field-group">
          <div className="field-label">Years trading</div>
          <input type="text" value="6 years (since 2018)" className="prefilled" readOnly />
          <div className="prefilled-note">{checkSvg} From Companies House</div>
        </div>

        <div className="btn-row">
          <button className="btn btn-primary btn-full" onClick={onSave}>Save and return</button>
        </div>
      </div>
    </div>
  );
}
