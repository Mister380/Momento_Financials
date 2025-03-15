# Static Chart Images

This directory contains static images of charts used as fallbacks when Chart.js fails to render or when static mode is enabled.

## Image Requirements

1. All images should be in PNG format for best transparency support
2. Recommended dimensions: 800px × 400px or similar 2:1 aspect ratio
3. Image filenames should match those defined in main.js

## Required Images

Place the following static chart images in this directory:

- `overview-chart.png` - Revenue bar chart
- `tickets-chart.png` - Tickets sold line chart
- `user-growth-chart.png` - User growth line chart
- `cost-breakdown-chart.png` - Cost breakdown doughnut chart
- `pre-seed-chart.png` - Pre-seed funding pie chart
- `series-a-chart.png` - Series A funding pie chart
- `break-even-chart.png` - Break-even line chart
- `arpu-chart.png` - ARPU bar chart
- `clv-cac-chart.png` - CLV vs CAC bar chart
- `retention-chart.png` - Retention rate line chart
- `mrr-chart.png` - Monthly recurring revenue line chart
- `scenario-chart.png` - Scenario comparison bar chart
- `tornado-chart.png` - Sensitivity tornado chart

## Creating Chart Images

You can create these static images by:

1. **Screenshot Method**: Temporarily enable Chart.js mode by setting `USE_STATIC_IMAGES = false` in main.js, 
   take screenshots of each chart, crop them to size, and save with the appropriate filenames.

2. **Chart.js Export**: Use Canvas.toDataURL() method to export charts to image 
   (add export functionality to the main.js file if needed).

3. **Create in Design Software**: Create chart visualizations in design software like 
   Adobe Illustrator, Figma, or similar tools based on the financial data.

## Fallback Behavior

If a static image fails to load, a text error message will be displayed to the user. 