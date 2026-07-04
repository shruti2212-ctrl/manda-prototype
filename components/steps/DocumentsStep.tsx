'use client';

import { ReactNode } from 'react';
import { CustomerType } from '@/lib/types';
import { getCompanyData } from '@/lib/data';
import BackButton from '@/components/BackButton';

interface Props {
  customerType: CustomerType;
  accountingSoftwareConnected: boolean;
  openBankingConnected: boolean;
  onConnectAccounting: () => void;
  onConnectOpenBanking: () => void;
  selectedCompany: string;
  overriddenRevenue: number | null;
  overriddenEbitda: number | null;
  onSave: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function DocumentsStep({
  customerType, accountingSoftwareConnected, openBankingConnected,
  onConnectAccounting, onConnectOpenBanking, selectedCompany,
  overriddenRevenue, overriddenEbitda, onSave, onBack, progress,
}: Props) {
  const data = getCompanyData(selectedCompany, overriddenRevenue, overriddenEbitda);
  const obConnectedAlready = customerType === 'existing' || openBankingConnected;

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
        <h1>Upload documents</h1>
        <p className="intro">Connect data sources or upload documents to improve your valuation accuracy.</p>
      </div>

      <div className="hub-list" style={{ marginBottom: 16 }}>
        {data.hasStatutoryAccounts && (
          <>
            <div style={{ padding: '12px 0' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--structure-40)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Already available</div>
            </div>
            <div className="hub-item" style={{ cursor: 'default' }}>
              <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--secondary-40)' }}>Statutory accounts (3 years)</span></div>
              <div className="prefilled-note">{checkSvg} From Companies House</div>
            </div>
          </>
        )}

        <div style={{ padding: '16px 0 12px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--structure-40)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Connect your data</div>
        </div>

        <div className="hub-item" style={{ cursor: 'default' }}>
          <div className="hub-item-left">
            <span className="item-text" style={{ color: obConnectedAlready ? 'var(--secondary-40)' : 'var(--primary-10)' }}>Open Banking</span>
          </div>
          {obConnectedAlready && !openBankingConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--secondary-40)' }}>Historical data available</span>
              <span onClick={onConnectOpenBanking} style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', cursor: 'pointer', textDecoration: 'underline' }}>Reconnect for fresher data</span>
            </div>
          ) : openBankingConnected ? (
            <div className="prefilled-note">{checkSvg} Connected</div>
          ) : (
            <span onClick={onConnectOpenBanking} style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-40)', cursor: 'pointer' }}>Connect</span>
          )}
        </div>

        <div className="hub-item" style={{ cursor: 'default' }}>
          <div className="hub-item-left">
            <span className="item-text" style={{ color: accountingSoftwareConnected ? 'var(--secondary-40)' : 'var(--primary-10)' }}>Accounting software (Xero, FreeAgent, Sage)</span>
          </div>
          {accountingSoftwareConnected ? (
            <div className="prefilled-note">{checkSvg} Xero connected</div>
          ) : (
            <span onClick={onConnectAccounting} style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-40)', cursor: 'pointer' }}>Connect</span>
          )}
        </div>

        {!accountingSoftwareConnected && (
          <div style={{ padding: '4px 0 0 0' }}>
            <span style={{ fontSize: 12, color: 'var(--secondary-40)' }}>Can&apos;t connect? </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', cursor: 'pointer' }}>Upload management accounts instead</span>
          </div>
        )}

        <div style={{ padding: '16px 0 12px', borderTop: '1px solid var(--secondary-90)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--structure-40)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Upload documents</div>
          <div style={{ fontSize: 12, color: 'var(--secondary-40)', marginTop: 4 }}>Needed before buyer introductions</div>
        </div>

        {!accountingSoftwareConnected && (
          <div className="hub-item" style={{ cursor: 'pointer' }}>
            <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--primary-10)' }}>Aged debtors/creditors breakdown</span></div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 8px', borderRadius: 4 }}>Upload</div>
          </div>
        )}
        <div className="hub-item" style={{ cursor: 'pointer' }}>
          <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--primary-10)' }}>Debt &amp; obligations detail</span></div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 8px', borderRadius: 4 }}>Upload</div>
        </div>
        {!accountingSoftwareConnected && (
          <div className="hub-item" style={{ cursor: 'pointer' }}>
            <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--primary-10)' }}>Fixed asset register</span></div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 8px', borderRadius: 4 }}>Upload</div>
          </div>
        )}
        <div className="hub-item" style={{ cursor: 'pointer' }}>
          <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--primary-10)' }}>Budget/forecast</span></div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 8px', borderRadius: 4 }}>Upload</div>
        </div>
        {!accountingSoftwareConnected && (
          <div className="hub-item" style={{ cursor: 'pointer' }}>
            <div className="hub-item-left"><span className="item-text" style={{ color: 'var(--primary-10)' }}>Revenue breakdown by customer</span></div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-40)', background: 'var(--secondary-95)', padding: '2px 8px', borderRadius: 4 }}>Upload</div>
          </div>
        )}
      </div>

      <div className="btn-row" style={{ marginTop: 24 }}>
        <button className="btn btn-primary btn-full" onClick={onSave}>Save and return</button>
      </div>
    </div>
  );
}
