# manda - Seller Onboarding Prototype

**Prototype:** [manda-prototype-shruti2212projects.vercel.app](https://manda-prototype-shruti2212projects.vercel.app)

**Prototype spec:** [manda-prototype-shruti2212projects.vercel.app/manda-seller-onboarding-spec.html](https://manda-prototype-shruti2212projects.vercel.app/manda-seller-onboarding-spec.html)

**Figma:** [View in Figma](https://www.figma.com/design/vOTd6GfdMz2AdTvMa30qc1/manda---Seller-Onboarding-Screens)

A fully interactive prototype for manda's seller onboarding journey. manda is an M&A platform that connects business sellers with vetted buyers, facilitating the end-to-end acquisition process for SMEs. This prototype covers the sell-side onboarding flow, from initial sign-up through eligibility screening, data collection, agreement signing, and a dynamic valuation estimate based on sector comparables and EBITDA multiples.

## What it does

This prototype demonstrates a complete sell-side onboarding experience:

1. **Email verification** - enter email, receive a 6-digit code
2. **Company search** - find your company via Companies House lookup
3. **Eligibility check** - automated screening (revenue, accounts, filings)
4. **Hub checklist** - guided completion of business details, documents, and deal info
5. **Engagement letter** - read and e-sign the agreement (type or draw signature)
6. **Valuation estimate** - dynamic valuation range based on EBITDA multiples, sector comparables, and data confidence level

## Key features

- **Progressive data collection** - one question per page, reducing cognitive load
- **Smart confidence model** - valuation spread narrows as more data sources connect (accounting software, open banking)
- **Sector-based multiples** - EBITDA and revenue multipliers by industry vertical
- **Existing customer detection** - existing lending customers skip steps where data is already available
- **Canvas signature** - draw or type your signature on the engagement letter

## Tech stack

- **Next.js 15** (App Router) with TypeScript
- **React** client components with useState-driven step navigation
- **Tailwind CSS** + custom CSS variables for manda brand system
- **Product Design system** font family, brand colour palette, spacing tokens, and component patterns from the internal design system
- Deployed on **Vercel**

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.
