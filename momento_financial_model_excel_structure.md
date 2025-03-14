# Momento Financial Model - Excel Structure Guide

This document outlines the structure of the Excel model for Momento, detailing the worksheets and key calculations that should be included.

## Excel File Structure

The Excel file should contain the following worksheets:

### 1. Dashboard
- **Purpose**: Executive summary view of key metrics and financial projections
- **Key Elements**:
  - Revenue summary charts (subscription vs. commission)
  - User growth visualization
  - Cash flow projection graph
  - Break-even point indicator
  - KPI summary table
  - Scenario comparison

### 2. Assumptions
- **Purpose**: Central location for all model inputs and assumptions
- **Key Elements**:
  - Subscription tier pricing
  - Commission rates
  - User growth rates
  - Conversion rates
  - Ticket sales assumptions
  - Cost assumptions
  - Funding assumptions

### 3. User Growth
- **Purpose**: Detailed user acquisition and retention calculations
- **Key Elements**:
  - Monthly user acquisition by channel
  - User retention calculations
  - Active user calculations
  - Freemium vs. premium user split
  - User growth by city/region (for expansion planning)

### 4. Revenue
- **Purpose**: Detailed revenue projections by stream
- **Key Elements**:
  - Subscription revenue calculations by tier
  - Commission revenue calculations
  - Monthly revenue projections for 36 months
  - Seasonality adjustments
  - ARPU and MRR calculations

### 5. Costs
- **Purpose**: Detailed cost structure breakdown
- **Key Elements**:
  - Development costs (fixed and variable)
  - Marketing costs with CAC calculations
  - Operational costs
  - Staffing plan and costs
  - Cost scaling based on user growth

### 6. Cash Flow
- **Purpose**: Monthly and annual cash flow projections
- **Key Elements**:
  - Revenue inflows
  - Cost outflows
  - Funding inflows
  - Net and cumulative cash flow
  - Runway calculations
  - Break-even analysis

### 7. Sensitivity Analysis
- **Purpose**: Test impact of changing key assumptions
- **Key Elements**:
  - Data tables for key variables
  - Scenario builder (optimistic, base case, conservative, pessimistic)
  - Break-even sensitivity
  - Revenue sensitivity
  - Tornado charts for variable impact

### 8. Funding
- **Purpose**: Detailed funding requirements and allocation
- **Key Elements**:
  - Pre-seed funding allocation
  - Series A funding allocation
  - Funding timeline
  - Cash runway based on funding scenarios
  - Valuation scenarios

### 9. KPIs
- **Purpose**: Track key performance indicators
- **Key Elements**:
  - Monthly KPI tracking
  - Target vs. actual comparisons
  - CAC, CLV, and CLV:CAC ratio
  - Retention metrics
  - Conversion metrics
  - Unit economics

## Key Calculations

### User Growth Calculations
```
Month 1 Users = Initial User Base (500)
Month N Users = Month N-1 Users * (1 + Monthly Growth Rate) + New User Acquisition - Churn
Churn = Previous Month Users * (1 - Retention Rate)
```

### Revenue Calculations
```
Monthly Subscription Revenue = (Standard Premium Users * €4.99) + (VIP Premium Users * €9.99)
Monthly Commission Revenue = Tickets Sold * Average Ticket Price * Commission Rate
Total Monthly Revenue = Subscription Revenue + Commission Revenue
```

### Break-Even Calculation
```
Monthly Break-Even = When Monthly Revenue >= Monthly Costs
Cumulative Break-Even = When Cumulative Revenue >= Cumulative Costs
```

### CLV Calculation
```
CLV = ARPU * Average Customer Lifespan
Average Customer Lifespan = 1 / (1 - Retention Rate)
```

### Sensitivity Formulas
```
Revenue Sensitivity = BASE Revenue * (1 + Percentage Change in Variable * Impact Factor)
Break-Even Sensitivity = BASE Break-Even Month +/- (Months Delay per Percentage Change * Percentage Change)
```

## Notes for Implementation

1. **Linking**: Ensure all calculations link back to the Assumptions tab for easy scenario testing

2. **Formatting**: Use consistent color coding throughout:
   - Inputs/assumptions: Blue
   - Calculations: Black
   - Outputs/results: Green
   - Negative values: Red

3. **Validation**: Add data validation to prevent unrealistic inputs

4. **Documentation**: Include notes and explanations for complex calculations

5. **Graphs**: Create visualizations that clearly communicate the financial story

6. **Protection**: Lock calculation cells while keeping input cells editable

7. **Macro Buttons**: Add scenario toggle buttons for easy comparison 