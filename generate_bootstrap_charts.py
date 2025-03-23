import matplotlib.pyplot as plt
import numpy as np
import os
from matplotlib.colors import to_rgba
import matplotlib.patches as mpatches
from matplotlib import cm

# Create output directory if it doesn't exist
os.makedirs('images/charts', exist_ok=True)

# Set Poppins-like font
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Arial', 'Helvetica', 'DejaVu Sans']

# Define colors to match the website's color scheme
colors = {
    'primary': '#EBDCC4',
    'secondary': '#1e90ff',
    'success': '#4caf50',
    'warning': '#ff9800',
    'danger': '#f44336',
    'neutral': '#607d8b',
    'dark_bg': '#181818',
    'light_bg': '#f4f4f4',
    'light_text': '#ffffff',
    'dark_text': '#333333',
    'primary_light': 'rgba(235, 220, 196, 0.2)',
    'secondary_light': 'rgba(30, 144, 255, 0.2)',
}

# Define chart dimensions
FIG_WIDTH = 10
FIG_HEIGHT = 5
DPI = 100

# Helper function to convert rgba string to actual rgba values
def parse_rgba(rgba_str):
    if rgba_str.startswith('rgba'):
        # Extract RGBA values from string like 'rgba(r, g, b, a)'
        values = rgba_str.replace('rgba(', '').replace(')', '').split(',')
        return (int(values[0])/255, int(values[1])/255, int(values[2])/255, float(values[3]))
    else:
        # Convert hex to RGBA
        return to_rgba(rgba_str)

# Format currency for axis labels
def format_currency(value):
    if value >= 1000000:
        return f'€{value/1000000:.1f}M'
    elif value >= 1000:
        return f'€{value/1000:.1f}K'
    else:
        return f'€{value:.0f}'

# 1. Overview Chart (5-Year Revenue)
def create_overview_chart():
    years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    subscription_revenue = [18392, 91800, 252000, 540000, 1026000]
    commission_revenue = [18375, 79625, 232750, 441000, 673750]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    width = 0.35
    x = np.arange(len(years))
    
    # Create stacked bar chart
    ax.bar(x, subscription_revenue, width, label='Subscription Revenue', color=colors['primary'])
    ax.bar(x, commission_revenue, width, bottom=subscription_revenue, label='Commission Revenue', color=colors['secondary'])
    
    # Add total text on top of bars
    for i, (sub, comm) in enumerate(zip(subscription_revenue, commission_revenue)):
        total = sub + comm
        ax.text(i, total + 50000, format_currency(total), ha='center', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Year', fontweight='bold')
    ax.set_ylabel('Revenue', fontweight='bold')
    ax.set_title('5-Year Revenue Growth Projection (Bootstrap Model)', fontsize=14, fontweight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    
    # Format y-axis labels as currency
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    
    ax.legend()
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('images/charts/overview-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created overview-chart.png")

# 2. Tickets Chart
def create_tickets_chart():
    years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    tickets_sold = [7500, 32500, 95000, 180000, 275000]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background to match website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    # Create line chart with area fill
    ax.plot(years, tickets_sold, marker='o', markersize=8, linewidth=3, 
            color=colors['secondary'], label='Tickets Sold')
    
    # Fill area under line
    ax.fill_between(years, tickets_sold, alpha=0.3, color=colors['secondary'])
    
    # Add data labels with white text
    for i, value in enumerate(tickets_sold):
        ax.text(i, value + 10000, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Tickets Sold', fontweight='bold', color='white')
    ax.set_title('Tickets Sold Projection (Bootstrap Model)', fontsize=14, fontweight='bold', color='white')
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines in white
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    # Set tick colors to white
    ax.tick_params(colors='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/tickets-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created tickets-chart.png")

# 3. User Growth Chart
def create_user_growth_chart():
    years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    active_users = [2500, 15000, 48000, 90000, 150000]
    paid_subscribers = [200, 1950, 7200, 18000, 37500]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set light background to match website's light section
    fig.patch.set_facecolor('#f4f4f4')
    ax.set_facecolor('#f4f4f4')
    
    # Create lines
    ax.plot(years, active_users, marker='o', markersize=8, linewidth=3, 
            color=colors['success'], label='Active Users')
    ax.fill_between(years, active_users, alpha=0.3, color=colors['success'])
    
    ax.plot(years, paid_subscribers, marker='o', markersize=8, linewidth=3, 
            color=colors['primary'], label='Paid Subscribers')
    ax.fill_between(years, paid_subscribers, alpha=0.3, color=colors['primary'])
    
    # Add value labels with black text
    for i, value in enumerate(active_users):
        ax.text(i, value + 5000, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color=colors['dark_text'])
        
    for i, value in enumerate(paid_subscribers):
        ax.text(i, value + 3000, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color=colors['dark_text'])
    
    ax.set_xlabel('Year', fontweight='bold', color=colors['dark_text'])
    ax.set_ylabel('Number of Users', fontweight='bold', color=colors['dark_text'])
    ax.set_title('User Growth Projection (Bootstrap Model)', fontsize=14, fontweight='bold', color=colors['dark_text'])
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Set y-axis formatter to show K for thousands
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: f'{x/1000:.0f}K' if x >= 1000 else f'{x:.0f}'))
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3)
    
    ax.legend(loc='upper left')
    
    plt.tight_layout()
    plt.savefig('images/charts/user-growth-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created user-growth-chart.png")

# 4. Cost Breakdown Chart
def create_cost_breakdown_chart():
    labels = ['Development & Technical', 'Marketing & User Acquisition', 'Operational Overheads']
    costs = [61000, 24000, 22800]
    
    # Calculate percentages
    total = sum(costs)
    percentages = [c/total*100 for c in costs]
    
    # Set colors for pie chart
    chart_colors = [colors['primary'], colors['secondary'], colors['warning']]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background for the figure to match the website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    # Create donut chart
    wedges, texts, autotexts = ax.pie(
        costs, 
        labels=None,
        autopct='%1.1f%%',
        colors=chart_colors,
        wedgeprops=dict(width=0.5),  # Make it a donut
        startangle=90,
        textprops={'fontsize': 12, 'weight': 'bold', 'color': 'white'}
    )
    
    # Equal aspect ratio ensures circular pie
    ax.axis('equal')
    
    # Create legend with white text for dark background
    legend_labels = [f"{label}: {format_currency(cost)} ({p:.1f}%)" for label, cost, p in zip(labels, costs, percentages)]
    legend = ax.legend(wedges, legend_labels, loc="center right", bbox_to_anchor=(1.3, 0.5))
    
    # Set legend text color to white for visibility on dark background
    for text in legend.get_texts():
        text.set_color('white')
    
    plt.title('Cost Breakdown - Year 1 (Bootstrap Model)', fontsize=14, fontweight='bold', color='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/cost-breakdown-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created cost-breakdown-chart.png")

# 5. Break-Even Chart
def create_break_even_chart():
    # Monthly data for 60 months (5 years)
    months = list(range(1, 61))
    
    # Simplified monthly revenue and costs data (bootstrap approach)
    monthly_revenue = [
        # Year 1 (months 1-12)
        900, 1200, 1500, 1900, 2400, 2800, 3300, 3800, 4400, 5000, 5700, 6500,
        # Year 2 (months 13-24)
        7500, 8700, 10000, 11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500,
        # Year 3 (months 25-36)
        25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000,
        # Year 4 (months 37-48)
        50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000,
        # Year 5 (months 49-60)
        110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 160000, 165000
    ]
    
    monthly_costs = [
        # Year 1 (months 1-12)
        8983, 8983, 8983, 8983, 8983, 8983, 8983, 8983, 8983, 8983, 8983, 8983,
        # Year 2 (months 13-24)
        12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500, 12500,
        # Year 3 (months 25-36)
        32167, 32167, 32167, 32167, 32167, 32167, 32167, 32167, 32167, 32167, 32167, 32167,
        # Year 4 (months 37-48)
        54833, 54833, 54833, 54833, 54833, 54833, 54833, 54833, 54833, 54833, 54833, 54833,
        # Year 5 (months 49-60)
        81250, 81250, 81250, 81250, 81250, 81250, 81250, 81250, 81250, 81250, 81250, 81250
    ]
    
    # Calculate cumulative values
    cumulative_revenue = np.cumsum(monthly_revenue)
    cumulative_costs = np.cumsum(monthly_costs)
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set light background for the chart
    fig.patch.set_facecolor('#f4f4f4')
    ax.set_facecolor('#f4f4f4')
    
    # Create monthly break-even lines
    ax.plot(months, monthly_revenue, marker='', linewidth=2.5, 
            color=colors['success'], label='Monthly Revenue')
    
    ax.plot(months, monthly_costs, marker='', linewidth=2.5, 
            color=colors['danger'], label='Monthly Costs', linestyle='dashed')
    
    # Add break-even marker (around month 26)
    break_even_month = 26
    break_even_value = monthly_revenue[break_even_month-1]
    
    # Add vertical line at break-even point
    ax.axvline(x=break_even_month, color=colors['warning'], linestyle='-', linewidth=2, alpha=0.7)
    ax.text(break_even_month+0.5, break_even_value+10000, 'Monthly Break-Even\nMonth 26', 
            fontsize=10, fontweight='bold', color=colors['warning'])
    
    # Add cumulative break-even point at month 29
    cum_break_even_month = 29
    ax.axvline(x=cum_break_even_month, color=colors['secondary'], linestyle='--', linewidth=2, alpha=0.7)
    ax.text(cum_break_even_month+0.5, monthly_revenue[cum_break_even_month-1]-20000, 
            'Cumulative Break-Even\nMonth 29', fontsize=10, fontweight='bold', color=colors['secondary'])
    
    # Add markers for Year boundaries
    for year, month in [(1, 1), (2, 13), (3, 25), (4, 37), (5, 49)]:
        ax.axvline(x=month, color='gray', linestyle=':', alpha=0.5)
        ax.text(month, -5000, f'Year {year}', fontsize=10, ha='center')
    
    ax.set_xlabel('Month', fontweight='bold')
    ax.set_ylabel('Amount', fontweight='bold')
    ax.set_title('Break-Even Analysis (Bootstrap Model)', fontsize=14, fontweight='bold')
    
    # Set x-axis ticks to show months 1, 12, 24, 36, 48, 60
    tick_positions = [1, 12, 24, 36, 48, 60]
    ax.set_xticks(tick_positions)
    ax.set_xticklabels([f"M{m}" for m in tick_positions])
    
    # Format y-axis as currency
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3)
    
    ax.legend(loc='upper left')
    
    plt.tight_layout()
    plt.savefig('images/charts/break-even-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created break-even-chart.png")

# 6. Cumulative Cash Flow Chart
def create_cash_flow_chart():
    years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    annual_cash_flow = [-71033, 21425, 98750, 323000, 724750]
    cumulative_cash_flow = [-71033, -49608, 49142, 372142, 1096892]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    x = np.arange(len(years))
    
    # Plot bars for annual cash flow
    ax.bar(x, annual_cash_flow, width=0.4, color=colors['secondary'], label='Annual Cash Flow')
    
    # Plot line for cumulative cash flow
    ax2 = ax.twinx()
    ax2.plot(x, cumulative_cash_flow, linewidth=3, marker='o', markersize=8, color=colors['success'], label='Cumulative Cash Flow')
    
    # Add data labels
    for i, value in enumerate(annual_cash_flow):
        color = 'black' if value >= 0 else 'red'
        ax.text(i, value + (30000 if value >= 0 else -30000), format_currency(value), 
                ha='center', va='center', fontsize=9, fontweight='bold', color=color)
    
    for i, value in enumerate(cumulative_cash_flow):
        color = 'green' if value >= 0 else 'red'
        ax2.text(i, value + (50000 if value >= 0 else -50000), format_currency(value), 
                 ha='center', va='center', fontsize=9, fontweight='bold', color=color)
    
    # Add €1M marker
    ax2.axhline(y=1000000, color='green', linestyle='--', alpha=0.7)
    ax2.text(3.5, 1030000, '€1M Cumulative Target', fontsize=10, color='green')
    
    # Customize axes
    ax.set_xlabel('Year', fontweight='bold')
    ax.set_ylabel('Annual Cash Flow', fontweight='bold')
    ax2.set_ylabel('Cumulative Cash Flow', fontweight='bold')
    
    ax.set_title('5-Year Cash Flow Projection (Bootstrap Model)', fontsize=14, fontweight='bold')
    
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    
    # Format y-axis as currency
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    ax2.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    
    # Create combined legend
    lines1, labels1 = ax.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax.legend(lines1 + lines2, labels1 + labels2, loc='lower right')
    
    # Remove top and right spine from first axis
    ax.spines['top'].set_visible(False)
    
    # Add grid lines on first axis
    ax.grid(axis='y', linestyle='--', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('images/charts/cash-flow-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created cash-flow-chart.png")

# 7. Cost Scaling Chart (5-Year)
def create_cost_scaling_chart():
    years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']
    development = [61000, 57000, 94000, 144000, 193000]
    marketing = [24000, 57000, 108000, 165000, 228000]
    operations = [22800, 36000, 184000, 349000, 554000]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    width = 0.25
    x = np.arange(len(years))
    
    # Create grouped bar chart
    ax.bar(x - width, development, width, label='Development & Technical', color=colors['primary'])
    ax.bar(x, marketing, width, label='Marketing & User Acquisition', color=colors['secondary'])
    ax.bar(x + width, operations, width, label='Operational Overheads', color=colors['warning'])
    
    # Add labels and title with white color
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Cost (€)', fontweight='bold', color='white')
    ax.set_title('Cost Structure Evolution (Bootstrap Model)', fontsize=14, fontweight='bold', color='white')
    
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    ax.tick_params(colors='white')
    
    # Format y-axis labels as currency
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    
    # Style the chart
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    # Set legend with white text
    legend = ax.legend(loc='upper left')
    for text in legend.get_texts():
        text.set_color('white')
    
    plt.tight_layout()
    plt.savefig('images/charts/cost-scaling-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created cost-scaling-chart.png")

# Run all chart creation functions
if __name__ == "__main__":
    print("Generating Momento bootstrap financial charts...")
    create_overview_chart()
    create_tickets_chart()
    create_user_growth_chart()
    create_cost_breakdown_chart()
    create_break_even_chart()
    create_cash_flow_chart()
    create_cost_scaling_chart()
    print("All bootstrap charts generated successfully!") 