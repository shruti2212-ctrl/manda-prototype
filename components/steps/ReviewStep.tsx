import { ReactNode } from 'react';
import { getCompanyData, formatFullCurrency } from '@/lib/data';
import BackButton from '@/components/BackButton';

interface Props {
  selectedCompany: string;
  overriddenRevenue: number | null;
  overriddenEbitda: number | null;
  onContinue: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function ReviewStep({ selectedCompany, overriddenRevenue, overriddenEbitda, onContinue, onBack, progress }: Props) {
  const data = getCompanyData(selectedCompany, overriddenRevenue, overriddenEbitda);

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div className="page-header">
        <h1>Review your details</h1>
        <p className="intro">Check everything looks right before proceeding to sign.</p>
      </div>

      <div className="review-section">
        <div className="review-section-title">Company</div>
        <div className="review-item"><span className="label">Company</span><span className="value">{selectedCompany}</span></div>
        <div className="review-item"><span className="label">Sector</span><span className="value">{data.sector}</span></div>
        <div className="review-item"><span className="label">Registered address</span><span className="value">10 Queen Street Place, London, EC4R 1AG</span></div>
      </div>

      <div className="review-section">
        <div className="review-section-title">Financials</div>
        <div className="review-item"><span className="label">Revenue</span><span className="value">{formatFullCurrency(data.revenue)}</span></div>
      </div>

      <div className="review-section">
        <div className="review-section-title">Deal</div>
        <div className="review-item"><span className="label">Timeline</span><span className="value">3-6 months</span></div>
        <div className="review-item"><span className="label">Reason</span><span className="value">Ready for next venture</span></div>
      </div>

      <div className="btn-row">
        <button className="btn btn-primary btn-full" onClick={onContinue}>Confirm and continue</button>
      </div>
    </div>
  );
}
