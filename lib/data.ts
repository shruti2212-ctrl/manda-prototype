import { CompanyData, CustomerType } from './types';

export const companies: Record<string, CompanyData> = {
  'Bright Digital Solutions Ltd': { sector: 'Technology & Digital Services', revenue: 1200000, ebitda: 300000, hasStatutoryAccounts: true, hasMcat: true },
  'Green Logistics Group Ltd': { sector: 'Logistics & Distribution', revenue: 3500000, ebitda: 520000, hasStatutoryAccounts: true, hasMcat: true },
  'Nova Consulting Partners Ltd': { sector: 'Professional Services', revenue: 800000, ebitda: 180000, hasStatutoryAccounts: true, hasMcat: false },
  'Bright Marketing Group Ltd': { sector: 'Marketing & Media', revenue: 950000, ebitda: 210000, hasStatutoryAccounts: false, hasMcat: false },
};

export const ebitdaMultiples: Record<string, number> = {
  'Technology & Digital Services': 8.5,
  'Software': 10.0,
  'IT Services': 7.5,
  'Professional Services': 6.5,
  'Consulting': 6.0,
  'Recruitment': 6.5,
  'Legal Services': 8.0,
  'Marketing & Media': 7.0,
  'Manufacturing': 6.0,
  'Food & Beverage Manufacturing': 6.5,
  'Electronics Manufacturing': 6.5,
  'Healthcare': 7.0,
  'Care Homes': 7.0,
  'Veterinary': 8.0,
  'Pharma & Biotech': 9.0,
  'Retail & E-commerce': 5.0,
  'E-commerce': 5.0,
  'Construction & Engineering': 5.0,
  'Property Services': 7.0,
  'Housebuilding': 4.5,
  'Logistics & Distribution': 6.0,
  'Transport': 5.5,
  'Financial Services': 7.5,
  'Insurance Broking': 8.0,
  'Fintech': 9.0,
  'Education & Training': 7.5,
  'Nurseries & Childcare': 8.0,
  'Hospitality & Leisure': 6.0,
  'Hotels': 7.0,
  'Restaurants & Bars': 5.0,
  'Energy & Utilities': 7.0,
  'Renewables': 8.0,
  'Agriculture & Food Production': 6.0,
  'Defence & Aerospace': 6.5,
};

export const revenueMultiples: Record<string, number> = {
  'Technology & Digital Services': 2.0,
  'Software': 3.0,
  'IT Services': 1.5,
  'Professional Services': 1.0,
  'Consulting': 1.0,
  'Recruitment': 0.5,
  'Legal Services': 1.5,
  'Marketing & Media': 0.8,
  'Manufacturing': 0.5,
  'Food & Beverage Manufacturing': 0.6,
  'Electronics Manufacturing': 0.8,
  'Healthcare': 1.0,
  'Care Homes': 0.8,
  'Veterinary': 1.5,
  'Pharma & Biotech': 2.0,
  'Retail & E-commerce': 0.4,
  'E-commerce': 0.4,
  'Construction & Engineering': 0.3,
  'Property Services': 1.0,
  'Housebuilding': 0.4,
  'Logistics & Distribution': 0.4,
  'Transport': 0.4,
  'Financial Services': 1.5,
  'Insurance Broking': 2.0,
  'Fintech': 3.0,
  'Education & Training': 1.2,
  'Nurseries & Childcare': 1.5,
  'Hospitality & Leisure': 0.7,
  'Hotels': 1.0,
  'Restaurants & Bars': 0.5,
  'Energy & Utilities': 1.0,
  'Renewables': 1.5,
  'Agriculture & Food Production': 0.5,
  'Defence & Aerospace': 1.0,
};

export function getCompanyData(
  selectedCompany: string,
  overriddenRevenue: number | null,
  overriddenEbitda: number | null
): CompanyData {
  const base = companies[selectedCompany] || {
    sector: 'Technology & Digital Services',
    revenue: 1200000,
    ebitda: 300000,
    hasStatutoryAccounts: true,
    hasMcat: false,
  };
  return {
    ...base,
    revenue: overriddenRevenue || base.revenue,
    ebitda: overriddenEbitda || base.ebitda,
  };
}

export function getConfidenceLevel(
  customerType: CustomerType,
  overriddenRevenue: number | null,
  overriddenEbitda: number | null,
  accountingSoftwareConnected: boolean,
  openBankingConnected: boolean,
  companyData: CompanyData
) {
  if (overriddenRevenue || overriddenEbitda) {
    return { level: 'low', text: 'Low confidence (self-reported)', spread: 0.4 };
  }
  let sources = 0;
  if (companyData.hasStatutoryAccounts) sources++;
  if (customerType === 'existing' && companyData.hasMcat) sources++;
  if (accountingSoftwareConnected) sources++;
  if (openBankingConnected) sources++;
  if (sources >= 2) return { level: 'medium', text: 'Medium confidence', spread: 0.2 };
  if (sources === 1) return { level: 'medium', text: 'Medium confidence', spread: 0.2 };
  return { level: 'low-medium', text: 'Low to medium confidence', spread: 0.35 };
}

export function calculateValuation(companyData: CompanyData, spread: number) {
  let mid: number;
  if (companyData.ebitda) {
    const multiple = ebitdaMultiples[companyData.sector] || 6.0;
    mid = companyData.ebitda * multiple;
  } else {
    const multiple = revenueMultiples[companyData.sector] || 0.8;
    mid = companyData.revenue * multiple;
  }
  return {
    low: mid * (1 - spread),
    mid,
    high: mid * (1 + spread),
  };
}

export function formatCurrency(val: number): string {
  if (val >= 1000000) return '£' + (val / 1000000).toFixed(1) + 'M';
  return '£' + (val / 1000).toFixed(0) + 'k';
}

export function formatFullCurrency(val: number): string {
  return '£' + val.toLocaleString('en-GB');
}
