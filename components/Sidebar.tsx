'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <h2>Sell your business with manda</h2>
        <ul className="sidebar-benefits">
          <li>
            <span className="check-icon">
              <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
            </span>
            Free valuation estimate based on real market data
          </li>
          <li>
            <span className="check-icon">
              <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
            </span>
            Access to qualified, vetted buyers
          </li>
          <li>
            <span className="check-icon">
              <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
            </span>
            Your data stays private until you&apos;re ready
          </li>
          <li>
            <span className="check-icon">
              <svg viewBox="0 0 14 14"><polyline points="1 7 5 11 13 3" /></svg>
            </span>
            Takes about 10 minutes to complete
          </li>
        </ul>
        <div className="sidebar-help" onClick={() => setHelpOpen(!helpOpen)}>
          <span>Still need help?</span>
          <span className="chevron">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {helpOpen && (
          <div style={{ marginTop: 12, padding: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 }}>
            <div style={{ marginBottom: 8 }}><strong>Call us</strong><br />020 3778 0274</div>
            <div><strong>Email</strong><br />support@manda.co.uk</div>
            <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>Mon-Fri 9am-5:30pm</div>
          </div>
        )}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-logo">manda</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>by iwoca</div>
      </div>
    </aside>
  );
}
