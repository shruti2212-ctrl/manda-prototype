'use client';

import { ReactNode, useState } from 'react';
import { CustomerType } from '@/lib/types';
import BackButton from '@/components/BackButton';

interface Props {
  customerType: CustomerType;
  onSelectCompany: (name: string) => void;
  onCheckEligibility: (ineligibleReason: string | null) => void;
  onPscChange: (name: string) => void;
  dob: { day: string; month: string; year: string };
  setDob: (dob: { day: string; month: string; year: string }) => void;
  onBack: () => void;
  progress: ReactNode;
}

const searchResults = [
  { name: 'Bright Digital Solutions Ltd', details: '12345678 · Incorporated 2018 · London' },
  { name: 'Bright Marketing Group Ltd', details: '98765432 · Incorporated 2015 · Manchester' },
];

export default function CompanySearchStep({ customerType, onSelectCompany, onCheckEligibility, onPscChange, dob, setDob, onBack, progress }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [companySelected, setCompanySelected] = useState(false);
  const [revenueRange, setRevenueRange] = useState('');
  const [selectedPsc, setSelectedPsc] = useState('');

  const handleSelect = (name: string) => {
    setSearchValue(name);
    setShowResults(false);
    setCompanySelected(true);
    onSelectCompany(name);
  };

  const handlePscChange = (value: string) => {
    setSelectedPsc(value);
    const names: Record<string, string> = { shruti: 'Shruti Vaghe', james: 'James Vaghe' };
    if (names[value]) onPscChange(names[value]);
  };

  const handleSubmit = () => {
    if (!searchValue) { alert('Please search for your company'); return; }
    if (customerType === 'new' && !revenueRange) { alert('Please select your revenue range'); return; }
    if (customerType === 'new' && revenueRange === 'under500k') { onCheckEligibility('revenue'); return; }
    if (!selectedPsc) { alert('Please select which person you are'); return; }
    if (selectedPsc === 'none') { onCheckEligibility('psc'); return; }
    if (selectedPsc === 'james') { onCheckEligibility('shareholding'); return; }
    if (!dob.day || !dob.month || !dob.year) { alert('Please enter your full date of birth'); return; }
    onCheckEligibility(null);
  };

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div className="page-header">
        <h1>Find your company</h1>
        <p className="intro">Search for your company and we&apos;ll check if it qualifies for our platform.</p>
      </div>

      <div className="form-fields">
        <div className="field-group">
          <div className="field-label">Company name or number</div>
          <div className="search-wrap">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => { setSearchValue(e.target.value); setShowResults(e.target.value.length > 2); }}
              placeholder="Start typing to search Companies House..."
            />
            <div className={`search-results ${showResults ? 'show' : ''}`}>
              {searchResults.map((r) => (
                <div key={r.name} className="search-result" onClick={() => handleSelect(r.name)}>
                  <div className="company-name">{r.name}</div>
                  <div className="company-details">{r.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {companySelected && (
          <>
            <div className="field-group">
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

            <div className="field-group">
              <div className="field-label">Which of these people are you?</div>
              {[
                { value: 'shruti', name: 'Shruti Vaghe', desc: 'PSC · 75% or more voting rights' },
                { value: 'james', name: 'James Vaghe', desc: 'PSC · 25% or more voting rights' },
                { value: 'none', name: "I'm not listed here", desc: '' },
              ].map((psc) => (
                <div key={psc.value} style={{ border: '1px solid var(--secondary-90)', borderRadius: 8, padding: 16, marginBottom: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="psc"
                      value={psc.value}
                      checked={selectedPsc === psc.value}
                      onChange={() => handlePscChange(psc.value)}
                      style={{ width: 18, height: 18, accentColor: 'var(--primary-40)' }}
                    />
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--primary-10)' }}>{psc.name}</div>
                      {psc.desc && <div style={{ fontSize: 13, color: 'var(--secondary-40)' }}>{psc.desc}</div>}
                    </div>
                  </label>
                </div>
              ))}
              <div style={{ fontSize: 12, color: 'var(--secondary-40)', marginTop: 8 }}>Only a PSC can authorise a sale. Source: Companies House</div>
            </div>

            {selectedPsc && selectedPsc !== 'none' && selectedPsc !== 'james' && (
              <div className="field-group">
                <div className="field-label">Confirm your date of birth</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <input type="text" placeholder="DD" maxLength={2} value={dob.day} onChange={(e) => setDob({ ...dob, day: e.target.value })} />
                  <input type="text" placeholder="MM" maxLength={2} value={dob.month} onChange={(e) => setDob({ ...dob, month: e.target.value })} />
                  <input type="text" placeholder="YYYY" maxLength={4} value={dob.year} onChange={(e) => setDob({ ...dob, year: e.target.value })} />
                </div>
                <div className="input-hint">We verify the full date against the protected Companies House register</div>
              </div>
            )}

            <div className="btn-row">
              <button className="btn btn-primary btn-full" onClick={handleSubmit}>Check eligibility</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
