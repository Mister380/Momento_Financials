# Momento Financial Model: Assumptions & Methodology

This document provides detailed explanations of the assumptions and methodology used in the Momento financial model. It serves as a companion guide to the Excel model and offers rationale for key decisions made in the forecasting process.

## Market Assumptions

### Target Market Size
- **Initial Market**: Paris cultural event attendees
  - Population: ~2.2 million in Paris proper, ~12 million in greater Paris area
  - Cultural event attendance: ~40% of population attends at least one cultural event per month
  - Initial target: Young professionals and cultural enthusiasts (approximately 15% of event attendees)
- **Serviceable Available Market (SAM)**:
  - Year 1: Focus on Paris (~720,000 potential users)
  - Year 2: Expansion to major French cities (~1.8 million potential users)
  - Year 3: Preparation for international expansion (~3.5 million potential users)

### Competition & Market Penetration
- Current solutions are fragmented across general ticketing platforms, venue-specific apps, and event discovery services
- No dominant player offering calendar integration + recommendations + booking in one seamless experience
- Expected market penetration:
  - Year 1: 0.3% of SAM (~2,000 active users)
  - Year 2: 0.7% of expanded SAM (~12,500 active users)
  - Year 3: 1.1% of further expanded SAM (~40,000 active users)

## User Growth Assumptions

### Initial Acquisition
- Starting with 500 users from beta testing and early adopter recruitment
- Growth through primarily digital channels and word-of-mouth
- User Acquisition Cost (UAC) starting at €8.00 per user

### Growth Trajectory
- **Monthly Growth Rate**:
  - Year 1: 15% month-over-month growth
  - Year 2: 20% month-over-month growth (accelerated by marketing and expansion)
  - Year 3: 15% month-over-month growth (stabilizing as market matures)

### Retention & Churn
- **Monthly Retention Rates**:
  - Year 1: 60% (early product with core functionality)
  - Year 2: 70% (improved product with enhanced features)
  - Year 3: 75% (mature product with strong user engagement)
- These retention rates translate to average user lifespans of:
  - Year 1: 2.5 months
  - Year 2: 3.3 months
  - Year 3: 4.0 months

## Revenue Assumptions

### Subscription Pricing Strategy
- **Tiered Approach** based on feature access and usage levels:
  - Freemium (Basic): €0.00/month
  - Standard Premium: €4.99/month
  - VIP/Elite Premium: €9.99/month
- Pricing benchmarked against comparable lifestyle apps and entertainment services

### Conversion Rates
- **Freemium to Paid Conversion**:
  - Year 1: 10% of active users on paid plans (8% Standard, 2% VIP)
  - Year 2: 15% of active users on paid plans (12% Standard, 3% VIP)
  - Year 3: 20% of active users on paid plans (15% Standard, 5% VIP)
- Gradual increase expected as product value proposition strengthens

### Commission Structure
- **Ticket Sales Commission**: 7% of ticket value
- **Average Ticket Price**: €35 (weighted average across various event types)
- **Organizer Adoption Rate**:
  - Year 1: 15% of relevant event organizers in Paris
  - Year 2: 30% of relevant event organizers in covered cities
  - Year 3: 45% of relevant event organizers in covered cities
- **Average Tickets per Active User**:
  - Year 1: 2.5 tickets annually (0.21 monthly)
  - Year 2: 2.0 tickets monthly
  - Year 3: 1.9 tickets monthly

### Seasonality
- Cultural events have natural seasonality with:
  - Peak periods: June-August, December
  - Lower periods: January-February, September
- Revenue model incorporates monthly adjustments:
  - Peak months: +15-20% from baseline
  - Low months: -10-15% from baseline

## Cost Structure Assumptions

### Development Costs
- **Initial MVP Development**: €200,000
  - Core functionality: €120,000
  - UI/UX design: €40,000
  - Testing & deployment: €40,000
- **Ongoing Development**:
  - Year 1: €60,000 (improvements & bug fixes)
  - Year 2: €90,000 (new features & scalability)
  - Year 3: €120,000 (advanced features & optimization)

### Technical Infrastructure
- **Server & Hosting**: Starting at €1,000/month, scaling with user base
- **API Integration**: Initial €15,000 with annual maintenance and expansion
- **Data Storage & Processing**: Starting at €667/month, scaling with data volume

### Marketing & User Acquisition
- **Digital Advertising**: 
  - Year 1: €80,000 (focused on targeted campaigns)
  - Year 2: €150,000 (expanded reach & retargeting)
  - Year 3: €250,000 (broader campaigns & new markets)
- **Influencer Partnerships**: Starting at €2,500/month, scaling to €8,333/month
- **Referral Programs**: €2 per referred user acquisition

### Operational Costs
- **Team Structure**:
  - Year 1: 3 FTEs (CEO, CTO, Marketing)
  - Year 2: 6 FTEs (adding Product, Customer Support, Development)
  - Year 3: 10 FTEs (adding Sales, Operations, additional Development)
- **Average Salary**: €60,000 per FTE (including benefits)
- **Office & Utilities**: Starting at €2,000/month

## Funding Assumptions

### Pre-Seed Round
- **Amount**: €750,000
- **Timing**: Prior to launch
- **Valuation**: €2.5-3M pre-money
- **Use of Funds**:
  - MVP Development: €200,000
  - Marketing & User Acquisition: €170,000
  - Operations (12 months): €350,000
  - Buffer: €30,000

### Series A Round
- **Amount**: €2,000,000
- **Timing**: End of Year 1/Beginning of Year 2
- **Valuation**: €8-10M pre-money (based on user growth and revenue traction)
- **Use of Funds**:
  - Product Enhancement: €400,000
  - Marketing & Expansion: €600,000
  - Operations (18 months): €900,000
  - Buffer: €100,000

## Financial Metric Calculation Methodology

### Customer Lifetime Value (CLV)
```
CLV = ARPU × Average Customer Lifespan

Where:
ARPU = Average Monthly Revenue Per User
Average Customer Lifespan = 1 / (1 - Monthly Retention Rate)
```

Year 1 Calculation:
```
ARPU = €0.85
Average Customer Lifespan = 1 / (1 - 0.60) = 2.5 months
CLV = €0.85 × 2.5 = €2.13 per month × 7 months = €15.00
```

### Customer Acquisition Cost (CAC)
```
CAC = Total User Acquisition Cost / Number of New Users Acquired

Where:
Total User Acquisition Cost = Marketing Expenses + Referral Costs + Attribution of Marketing Salaries
```

Year 1 Calculation:
```
Marketing Expenses: €170,000
New Users Acquired: ~21,300
CAC = €170,000 / 21,300 = €8.00 per user
```

### Break-Even Analysis
The model calculates break-even point by identifying when cumulative revenue equals cumulative costs. This is calculated both on a:
- **Monthly basis**: When monthly revenue ≥ monthly costs
- **Cumulative basis**: When total revenue since inception ≥ total costs since inception

Based on projections, Momento reaches monthly break-even in Month 32 (Year 3, Month 8).

### Sensitivity Analysis Methodology
The model uses data tables to calculate how changes in key variables affect outcomes:

1. **One-variable data tables**: Measuring isolated impact of single variable changes
2. **Two-variable data tables**: Measuring combined impact of changes in two variables simultaneously

Variables tested include:
- User growth rates (±5%, ±10%)
- Conversion rates (±2%, ±4%)
- Commission rates (±1%, ±2%)
- Pricing (±10%, ±20%)
- CAC (±10%, ±20%)
- Retention rates (±5%, ±10%)

## Scenario Definitions

### Base Case
- As outlined in the main model
- Representative of expected performance given current market research and assumptions

### Optimistic Scenario
- User growth: 25% higher than base case
- Conversion to paid: 3% higher than base case
- Retention rates: 5% higher than base case
- CAC: 10% lower than base case

### Conservative Scenario
- User growth: 15% lower than base case
- Conversion to paid: 2% lower than base case
- Retention rates: 5% lower than base case
- CAC: 10% higher than base case

### Pessimistic Scenario
- User growth: 30% lower than base case
- Conversion to paid: 4% lower than base case
- Retention rates: 10% lower than base case
- CAC: 20% higher than base case

## Limitations & Considerations

### Model Limitations
1. **Market Uncertainty**: The cultural events market can be affected by external factors not captured in the model (e.g., economic downturns, public health concerns)
2. **Competition Response**: The model does not fully account for competitive responses to Momento's entry
3. **Technological Changes**: Rapid shifts in technology could affect development costs and user expectations

### Risk Factors
1. **User Adoption Risk**: Lower-than-projected user growth or higher churn
2. **Monetization Risk**: Lower conversion to paid tiers or pressure on pricing
3. **Organizer Adoption Risk**: Slower-than-expected onboarding of event organizers
4. **Cost Escalation Risk**: Higher-than-projected development or marketing costs

### Model Updates
The financial model should be updated:
1. Monthly during the first year
2. Quarterly thereafter
3. After any significant market changes or strategic shifts

## Data Sources

1. **Market Size & Demographics**: INSEE (French National Institute of Statistics), Ministry of Culture surveys
2. **Event Industry Data**: French event industry associations, venue operator interviews
3. **Pricing Benchmarks**: Competitive analysis of comparable apps and services
4. **Cost Benchmarks**: Industry standards for development costs, SaaS hosting, and marketing
5. **User Behavior**: Early beta testing, comparable app usage statistics

## Conclusion

This financial model represents a balanced projection based on market research, competitive analysis, and industry benchmarks. It provides a roadmap for Momento's growth while acknowledging the inherent uncertainties in launching a new platform. The model is designed to be flexible, allowing for adjustments as real-world data becomes available during the execution phase. 