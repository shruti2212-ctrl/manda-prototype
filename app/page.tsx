'use client';

import { useState, useCallback } from 'react';
import { StepId, CustomerType, HubItems } from '@/lib/types';
import Sidebar from '@/components/Sidebar';
import ProgressIndicator from '@/components/ProgressIndicator';
import EmailStep from '@/components/steps/EmailStep';
import VerifyCodeStep from '@/components/steps/VerifyCodeStep';
import CompanySearchStep from '@/components/steps/CompanySearchStep';
import CompanyPickerStep from '@/components/steps/CompanyPickerStep';
import LoadingStep from '@/components/steps/LoadingStep';
import EligibleStep from '@/components/steps/EligibleStep';
import IneligibleStep from '@/components/steps/IneligibleStep';
import PersonalDetailsStep from '@/components/steps/PersonalDetailsStep';
import HubStep from '@/components/steps/HubStep';
import BusinessDetailsStep from '@/components/steps/BusinessDetailsStep';
import DocumentsStep from '@/components/steps/DocumentsStep';
import DealDetailsStep from '@/components/steps/DealDetailsStep';
import ReviewStep from '@/components/steps/ReviewStep';
import AgreementsStep from '@/components/steps/AgreementsStep';
import EngagementLetterStep from '@/components/steps/EngagementLetterStep';
import ValuationLoadingStep from '@/components/steps/ValuationLoadingStep';
import ValuationStep from '@/components/steps/ValuationStep';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepId>('1');
  const [stepHistory, setStepHistory] = useState<StepId[]>(['1']);
  const [customerType, setCustomerType] = useState<CustomerType>('existing');
  const [selectedCompany, setSelectedCompany] = useState('Bright Digital Solutions Ltd');
  const [pscName, setPscName] = useState('Shruti Vaghe');
  const [hubItems, setHubItems] = useState<HubItems>({ details: false, docs: false, deal: false });
  const [accountingSoftwareConnected, setAccountingSoftwareConnected] = useState(false);
  const [openBankingConnected, setOpenBankingConnected] = useState(false);
  const [overriddenRevenue, setOverriddenRevenue] = useState<number | null>(null);
  const [overriddenEbitda, setOverriddenEbitda] = useState<number | null>(null);
  const [email, setEmail] = useState('shruti@example.co.uk');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [ineligibleReason, setIneligibleReason] = useState('');

  const goTo = useCallback((step: StepId) => {
    setCurrentStep(step);
    setStepHistory(prev => [...prev, step]);
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setStepHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      setCurrentStep(newHistory[newHistory.length - 1]);
      window.scrollTo(0, 0);
      return newHistory;
    });
  }, []);

  const completeHubItem = useCallback((key: keyof HubItems) => {
    setHubItems(prev => {
      const updated = { ...prev, [key]: true };
      if (updated.details && updated.deal) {
        setTimeout(() => goTo('9'), 0);
      } else {
        setTimeout(() => goTo('4'), 0);
      }
      return updated;
    });
  }, [goTo]);

  const handleCustomerTypeChange = useCallback((type: CustomerType) => {
    setCustomerType(type);
  }, []);

  const getProgressPhase = (): number => {
    const step1Steps: StepId[] = ['1', '1a', '1b', '1c', '2', '3', '3b'];
    const step2Steps: StepId[] = ['personal', '4', '5', '6', '7'];
    const step3Steps: StepId[] = ['9', '10', '10b', '10c', '11'];
    if (step1Steps.includes(currentStep)) return 1;
    if (step2Steps.includes(currentStep)) return 2;
    if (step3Steps.includes(currentStep)) return 3;
    return 1;
  };

  const showProgress = !['2', '3', '3b', '10c', '11'].includes(currentStep);

  const renderStep = () => {
    const progressPhase = getProgressPhase();
    const progress = showProgress ? <ProgressIndicator phase={progressPhase} /> : null;

    switch (currentStep) {
      case '1':
        return <EmailStep email={email} setEmail={setEmail} customerType={customerType} onCustomerTypeChange={handleCustomerTypeChange} onContinue={() => goTo('1a')} progress={progress} />;
      case '1a':
        return <VerifyCodeStep email={email} customerType={customerType} onVerified={() => goTo(customerType === 'existing' ? '1c' : '1b')} onBack={goBack} progress={progress} />;
      case '1b':
        return <CompanySearchStep customerType={customerType} onSelectCompany={(name) => setSelectedCompany(name)} onCheckEligibility={(reason) => { if (reason) { setIneligibleReason(reason); goTo('3b'); } else { goTo('2'); } }} onPscChange={setPscName} dob={dob} setDob={setDob} onBack={goBack} progress={progress} />;
      case '1c':
        return <CompanyPickerStep onSelect={(name) => { setSelectedCompany(name); goTo('2'); }} onIneligible={() => { setIneligibleReason('revenue'); goTo('3b'); }} onBack={goBack} progress={progress} />;
      case '2':
        return <LoadingStep customerType={customerType} onComplete={() => goTo('3')} />;
      case '3':
        return <EligibleStep companyName={selectedCompany} onContinue={() => goTo('personal')} />;
      case '3b':
        return <IneligibleStep reason={ineligibleReason} onTryAnother={() => goTo(customerType === 'existing' ? '1c' : '1b')} />;
      case 'personal':
        return <PersonalDetailsStep email={email} dob={dob} customerType={customerType} pscName={pscName} onContinue={() => goTo('4')} onBack={goBack} progress={progress} />;
      case '4':
        return <HubStep hubItems={hubItems} onNavigate={goTo} progress={progress} />;
      case '5':
        return <BusinessDetailsStep selectedCompany={selectedCompany} customerType={customerType} onSave={() => completeHubItem('details')} onBack={goBack} progress={progress} />;
      case '6':
        return <DocumentsStep customerType={customerType} accountingSoftwareConnected={accountingSoftwareConnected} openBankingConnected={openBankingConnected} onConnectAccounting={() => setAccountingSoftwareConnected(true)} onConnectOpenBanking={() => setOpenBankingConnected(true)} selectedCompany={selectedCompany} overriddenRevenue={overriddenRevenue} overriddenEbitda={overriddenEbitda} onSave={() => completeHubItem('docs')} onBack={goBack} progress={progress} />;
      case '7':
        return <DealDetailsStep selectedCompany={selectedCompany} customerType={customerType} overriddenRevenue={overriddenRevenue} overriddenEbitda={overriddenEbitda} onOverrideRevenue={setOverriddenRevenue} onSave={() => completeHubItem('deal')} onBack={goBack} progress={progress} />;
      case '9':
        return <ReviewStep selectedCompany={selectedCompany} overriddenRevenue={overriddenRevenue} overriddenEbitda={overriddenEbitda} onContinue={() => goTo('10')} onBack={goBack} progress={progress} />;
      case '10':
        return <AgreementsStep onOpenAgreement={() => goTo('10b')} onBack={goBack} progress={progress} />;
      case '10b':
        return <EngagementLetterStep selectedCompany={selectedCompany} pscName={pscName} onSign={() => { goTo('10c'); setTimeout(() => goTo('11'), 3000); }} onBack={goBack} progress={progress} />;
      case '10c':
        return <ValuationLoadingStep />;
      case '11':
        return <ValuationStep selectedCompany={selectedCompany} customerType={customerType} overriddenRevenue={overriddenRevenue} overriddenEbitda={overriddenEbitda} accountingSoftwareConnected={accountingSoftwareConnected} openBankingConnected={openBankingConnected} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <div className="content-area">
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
