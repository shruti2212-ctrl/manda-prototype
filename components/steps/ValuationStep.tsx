'use client';

import { useEffect, useRef } from 'react';
import { CustomerType } from '@/lib/types';
import { getCompanyData, getConfidenceLevel, calculateValuation, formatCurrency } from '@/lib/data';

interface Props {
  selectedCompany: string;
  customerType: CustomerType;
  overriddenRevenue: number | null;
  overriddenEbitda: number | null;
  accountingSoftwareConnected: boolean;
  openBankingConnected: boolean;
}

export default function ValuationStep({ selectedCompany, customerType, overriddenRevenue, overriddenEbitda, accountingSoftwareConnected, openBankingConnected }: Props) {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = confettiRef.current;
    if (!zone) return;
    zone.innerHTML = '';
    const colors = ['#FB5950', '#08172B', '#205eac', '#00b278', '#FFD43B'];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + '%';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDelay = Math.random() * 0.5 + 's';
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      c.style.width = (6 + Math.random() * 8) + 'px';
      c.style.height = (6 + Math.random() * 8) + 'px';
      zone.appendChild(c);
    }
    const timer = setTimeout(() => { if (zone) zone.innerHTML = ''; }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const data = getCompanyData(selectedCompany, overriddenRevenue, overriddenEbitda);
  const confidence = getConfidenceLevel(customerType, overriddenRevenue, overriddenEbitda, accountingSoftwareConnected, openBankingConnected, data);
  const valuation = calculateValuation(data, confidence.spread);

  return (
    <div className="step active">
      <div style={{ position: 'relative' }}>
        <div className="confetti-zone" ref={confettiRef} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '40px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: '42px' }}>Your valuation estimate</h1>
          <p style={{ fontSize: 20, fontWeight: 300, lineHeight: '28px', color: 'var(--primary-10)' }}>
            Based on comparable transactions in your sector, here&apos;s what we think your business could be worth.
          </p>

          <div className="valuation-card" style={{ width: '100%' }}>
            <div className="label">Estimated business value</div>
            <div className="valuation-range">
              <span className="low">{formatCurrency(valuation.low)}</span>
              <span className="mid">{formatCurrency(valuation.mid)}</span>
              <span className="high">{formatCurrency(valuation.high)}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--structure-40)', marginTop: 8, fontWeight: 300 }}>Based on comparable transactions in your sector</div>
            <div className={`confidence-badge confidence-${confidence.level}`}>{confidence.text}</div>
          </div>

          <p style={{ fontSize: 12, color: 'var(--structure-40)', fontWeight: 300, textAlign: 'center', maxWidth: 480, lineHeight: 1.6 }}>
            This is an indicative estimate only. The final sale price will depend on market conditions, buyer appetite, and the outcome of due diligence.
          </p>

          <div className="info-box" style={{ width: '100%' }}>
            <div className="info-icon">
              <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" /><line x1="8" y1="7" x2="8" y2="11" /><circle cx="8" cy="5" r="0.5" fill="currentColor" /></svg>
            </div>
            <div className="info-text">A member of our deal team will be in touch within 2 working days to start matching you with buyers.</div>
          </div>

          <div className="next-steps" style={{ width: '100%' }}>
            <div className="title">What happens next</div>
            <div className="desc">
              1. We match you with qualified buyers in your sector<br />
              2. Your deal team manager schedules an introductory call<br />
              3. Interested buyers request more details (under NDA)
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', marginTop: 8 }}>
            <button className="btn btn-primary btn-full" style={{ maxWidth: 400 }}>Schedule a call with our team</button>
          </div>
        </div>
      </div>
    </div>
  );
}
