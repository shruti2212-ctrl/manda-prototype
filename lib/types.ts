export type CustomerType = 'existing' | 'new';

export type StepId =
  | '1' | '1a' | '1b' | '1c'
  | '2' | '3' | '3b'
  | 'personal'
  | '4' | '5' | '6' | '7'
  | '9' | '10' | '10b' | '10c' | '11';

export interface HubItems {
  details: boolean;
  docs: boolean;
  deal: boolean;
}

export interface CompanyData {
  sector: string;
  revenue: number;
  ebitda: number;
  hasStatutoryAccounts: boolean;
  hasMcat: boolean;
}

export interface AppState {
  currentStep: StepId;
  customerType: CustomerType;
  selectedCompany: string;
  pscName: string;
  hubItems: HubItems;
  accountingSoftwareConnected: boolean;
  openBankingConnected: boolean;
  overriddenRevenue: number | null;
  overriddenEbitda: number | null;
  email: string;
  dob: { day: string; month: string; year: string };
}
