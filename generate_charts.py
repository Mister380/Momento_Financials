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

# 1. Overview Chart
def create_overview_chart():
    years = ['Year 1', 'Year 2', 'Year 3']
    subscription_revenue = [10873, 72375, 240250]
    commission_revenue = [12253, 100000, 340000]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    width = 0.35
    x = np.arange(len(years))
    
    # Create stacked bar chart
    ax.bar(x, subscription_revenue, width, label='Subscription Revenue', color=colors['primary'])
    ax.bar(x, commission_revenue, width, bottom=subscription_revenue, label='Commission Revenue', color=colors['secondary'])
    
    # Add total text on top of bars
    for i, (sub, comm) in enumerate(zip(subscription_revenue, commission_revenue)):
        total = sub + comm
        ax.text(i, total + 5000, format_currency(total), ha='center', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Year', fontweight='bold')
    ax.set_ylabel('Revenue', fontweight='bold')
    ax.set_title('Revenue Growth by Year', fontsize=14, fontweight='bold')
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
    years = ['Year 1', 'Year 2', 'Year 3']
    tickets_sold = [5000, 25000, 75000]
    
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
        ax.text(i, value + 2000, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Tickets Sold', fontweight='bold', color='white')
    ax.set_title('Tickets Sold Projection', fontsize=14, fontweight='bold', color='white')
    
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
    years = ['Year 1', 'Year 2', 'Year 3']
    active_users = [2000, 12500, 40000]
    paid_subscribers = [200, 1875, 8000]
    
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
        ax.text(i, value + 1000, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color=colors['dark_text'])
        
    for i, value in enumerate(paid_subscribers):
        ax.text(i, value + 800, f"{value:,}", ha='center', fontsize=10, fontweight='bold', color=colors['dark_text'])
    
    ax.set_xlabel('Year', fontweight='bold', color=colors['dark_text'])
    ax.set_ylabel('Number of Users', fontweight='bold', color=colors['dark_text'])
    ax.set_title('User Growth Projection', fontsize=14, fontweight='bold', color=colors['dark_text'])
    
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
    costs = [295000, 170000, 269000]
    
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
    
    plt.title('Cost Breakdown - Year 1', fontsize=14, fontweight='bold', color='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/cost-breakdown-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created cost-breakdown-chart.png")

# 5. Pre-Seed Funding Chart
def create_pre_seed_chart():
    labels = ['MVP Development', 'Marketing & User Acquisition', 'Operations (12 months)', 'Buffer']
    amounts = [200000, 170000, 350000, 30000]
    
    # Calculate percentages
    total = sum(amounts)
    percentages = [a/total*100 for a in amounts]
    
    # Set colors for pie chart
    chart_colors = [colors['primary'], colors['secondary'], colors['success'], colors['warning']]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set background color to match light section
    fig.patch.set_facecolor('#f4f4f4')
    ax.set_facecolor('#f4f4f4')
    
    # Create pie chart
    wedges, texts, autotexts = ax.pie(
        amounts, 
        labels=None,
        autopct='%1.1f%%',
        colors=chart_colors,
        startangle=90,
        textprops={'fontsize': 12, 'weight': 'bold', 'color': '#333'}
    )
    
    # Equal aspect ratio ensures circular pie
    ax.axis('equal')
    
    # Create legend
    legend_labels = [f"{label}: {format_currency(amount)} ({p:.1f}%)" for label, amount, p in zip(labels, amounts, percentages)]
    ax.legend(wedges, legend_labels, loc="center right", bbox_to_anchor=(1.3, 0.5))
    
    plt.title('Pre-Seed Funding Allocation (€750,000)', fontsize=14, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('images/charts/pre-seed-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created pre-seed-chart.png")

# 6. Series A Funding Chart
def create_series_a_chart():
    labels = ['Product Enhancement', 'Marketing & Expansion', 'Operations (18 months)', 'Buffer']
    amounts = [400000, 600000, 900000, 100000]
    
    # Calculate percentages
    total = sum(amounts)
    percentages = [a/total*100 for a in amounts]
    
    # Set colors for pie chart
    chart_colors = [colors['primary'], colors['secondary'], colors['success'], colors['warning']]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set background color to match light section
    fig.patch.set_facecolor('#f4f4f4')
    ax.set_facecolor('#f4f4f4')
    
    # Create pie chart
    wedges, texts, autotexts = ax.pie(
        amounts, 
        labels=None,
        autopct='%1.1f%%',
        colors=chart_colors,
        startangle=90,
        textprops={'fontsize': 12, 'weight': 'bold', 'color': '#333'}
    )
    
    # Equal aspect ratio ensures circular pie
    ax.axis('equal')
    
    # Create legend
    legend_labels = [f"{label}: {format_currency(amount)} ({p:.1f}%)" for label, amount, p in zip(labels, amounts, percentages)]
    ax.legend(wedges, legend_labels, loc="center right", bbox_to_anchor=(1.3, 0.5))
    
    plt.title('Series A Funding Allocation (€2,000,000)', fontsize=14, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('images/charts/series-a-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created series-a-chart.png")

# 7. Break-Even Chart
def create_break_even_chart():
    # Monthly data for 36 months
    months = [f"Month {i+1}" for i in range(36)]
    month_numbers = list(range(1, 37))
    
    # Simplified monthly revenue and costs data
    monthly_revenue = [
        # Year 1 (months 1-12)
        743, 921, 1109, 1305, 1514, 1734, 1970, 2222, 2495, 2789, 3110, 3214,
        # Year 2 (months 13-24)
        4000, 5200, 6500, 7800, 9300, 10800, 12400, 14000, 15700, 17500, 19300, 21000,
        # Year 3 (months 25-36)
        24000, 28000, 33000, 37000, 42000, 48000, 55000, 63000, 69000, 78000, 87000, 98000
    ]
    
    monthly_costs = [
        # Year 1 (months 1-12)
        61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167,
        # Year 2 (months 13-24)
        86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667,
        # Year 3 (months 25-36)
        144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417
    ]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set light background for the chart
    fig.patch.set_facecolor('#f4f4f4')
    ax.set_facecolor('#f4f4f4')
    
    # Create lines
    ax.plot(month_numbers, monthly_revenue, marker='', linewidth=2.5, 
            color=colors['success'], label='Monthly Revenue')
    
    ax.plot(month_numbers, monthly_costs, marker='', linewidth=2.5, 
            color=colors['danger'], label='Monthly Costs', linestyle='dashed')
    
    # Add break-even marker (around month 32)
    break_even_month = 32
    break_even_value = monthly_revenue[break_even_month-1]
    
    # Add vertical line at break-even point
    ax.axvline(x=break_even_month, color=colors['warning'], linestyle='-', linewidth=2, alpha=0.7)
    ax.text(break_even_month+0.5, break_even_value+15000, 'Break-Even\nMonth 32', 
            fontsize=10, fontweight='bold', color=colors['warning'])
    
    # Add markers for Year boundaries
    for year, month in [(1, 1), (2, 13), (3, 25)]:
        ax.axvline(x=month, color='gray', linestyle=':', alpha=0.5)
        ax.text(month, -5000, f'Year {year}', fontsize=10, ha='center')
    
    ax.set_xlabel('Month', fontweight='bold')
    ax.set_ylabel('Amount', fontweight='bold')
    ax.set_title('Break-Even Analysis', fontsize=14, fontweight='bold')
    
    # Set x-axis ticks to show months 1, 6, 12, 18, 24, 30, 36
    tick_positions = [1, 6, 12, 18, 24, 30, 36]
    ax.set_xticks(tick_positions)
    ax.set_xticklabels([f"Month {m}" for m in tick_positions])
    
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

# 8. ARPU Chart
def create_arpu_chart():
    years = ['Year 1', 'Year 2', 'Year 3']
    arpu_values = [0.85, 1.15, 1.45]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background to match website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    # Create bar chart
    bars = ax.bar(years, arpu_values, color=colors['primary'], width=0.5)
    
    # Add data labels on top of bars
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.05,
                f'€{height:.2f}',
                ha='center', va='bottom', fontsize=11, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Average Revenue Per User (€)', fontweight='bold', color='white')
    ax.set_title('ARPU Growth', fontsize=14, fontweight='bold', color='white')
    
    # Format y-axis labels with Euro symbol
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: f'€{x:.2f}'))
    ax.tick_params(colors='white')
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/arpu-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created arpu-chart.png")

# 9. CLV vs CAC Chart
def create_clv_cac_chart():
    years = ['Year 1', 'Year 2', 'Year 3']
    clv_values = [15, 24, 32]
    cac_values = [8, 7, 6.5]
    
    # Calculate ratio for each year
    ratios = [clv/cac for clv, cac in zip(clv_values, cac_values)]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background to match website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    x = np.arange(len(years))
    width = 0.35
    
    # Create grouped bar chart
    bars1 = ax.bar(x - width/2, clv_values, width, label='Customer Lifetime Value (CLV)', color=colors['primary'])
    bars2 = ax.bar(x + width/2, cac_values, width, label='Customer Acquisition Cost (CAC)', color=colors['secondary'])
    
    # Add data labels
    for bar in bars1:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'€{height:.1f}', ha='center', va='bottom', fontsize=10, fontweight='bold', color='white')
    
    for bar in bars2:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'€{height:.1f}', ha='center', va='bottom', fontsize=10, fontweight='bold', color='white')
    
    # Add ratio text
    for i, ratio in enumerate(ratios):
        ax.text(i, max(clv_values[i], cac_values[i]) + 3, 
                f'Ratio: {ratio:.1f}x', 
                ha='center', fontsize=11, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Amount (€)', fontweight='bold', color='white')
    ax.set_title('CLV vs CAC Comparison', fontsize=14, fontweight='bold', color='white')
    
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    
    # Format y-axis with Euro symbol
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: f'€{x:.0f}'))
    ax.tick_params(colors='white')
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    # Set legend text color to white
    legend = ax.legend()
    for text in legend.get_texts():
        text.set_color('white')
    
    plt.tight_layout()
    plt.savefig('images/charts/clv-cac-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created clv-cac-chart.png")

# 10. Retention Chart
def create_retention_chart():
    years = ['Year 1', 'Year 2', 'Year 3']
    retention_rates = [60, 70, 75]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background to match website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    # Create line chart with area fill
    ax.plot(years, retention_rates, marker='o', markersize=8, linewidth=3, 
            color=colors['success'], label='Monthly Retention Rate')
    
    # Fill area under line
    ax.fill_between(years, retention_rates, alpha=0.3, color=colors['success'])
    
    # Add data labels
    for i, value in enumerate(retention_rates):
        ax.text(i, value + 1, f"{value}%", ha='center', fontsize=11, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Retention Rate (%)', fontweight='bold', color='white')
    ax.set_title('User Retention Rate Projection', fontsize=14, fontweight='bold', color='white')
    
    # Set y-axis range from 0 to 100 for percentage
    ax.set_ylim(0, 100)
    
    # Format y-axis with percentage and white ticks for visibility
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: f'{x:.0f}%'))
    ax.tick_params(colors='white')
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/retention-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created retention-chart.png")

# 11. MRR Chart
def create_mrr_chart():
    years = ['Year 1', 'Year 2', 'Year 3']
    mrr_values = [1750, 12000, 48000]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Set dark background to match website's dark section
    fig.patch.set_facecolor('#181818')
    ax.set_facecolor('#181818')
    
    # Create line chart with area fill
    ax.plot(years, mrr_values, marker='o', markersize=8, linewidth=3, 
            color=colors['primary'], label='Monthly Recurring Revenue')
    
    # Fill area under line
    ax.fill_between(years, mrr_values, alpha=0.3, color=colors['primary'])
    
    # Add data labels
    for i, value in enumerate(mrr_values):
        ax.text(i, value + (value * 0.05), format_currency(value), 
                ha='center', fontsize=11, fontweight='bold', color='white')
    
    ax.set_xlabel('Year', fontweight='bold', color='white')
    ax.set_ylabel('Monthly Recurring Revenue', fontweight='bold', color='white')
    ax.set_title('MRR Growth Projection', fontsize=14, fontweight='bold', color='white')
    
    # Format y-axis as currency with white ticks for visibility
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    ax.tick_params(colors='white')
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3, color='white')
    
    plt.tight_layout()
    plt.savefig('images/charts/mrr-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created mrr-chart.png")

# 12. Scenario Chart
def create_scenario_chart():
    scenarios = ['Base Case', 'Optimistic', 'Conservative', 'Pessimistic']
    revenues = [580250, 812350, 435188, 319138]
    
    # Define colors for each scenario
    scenario_colors = [colors['primary'], colors['success'], colors['warning'], colors['danger']]
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Create bar chart
    bars = ax.bar(scenarios, revenues, color=scenario_colors, width=0.6)
    
    # Add data labels on top of bars
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 10000,
                format_currency(height),
                ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    ax.set_xlabel('Scenario', fontweight='bold')
    ax.set_ylabel('Year 3 Revenue', fontweight='bold')
    ax.set_title('Revenue Comparison by Scenario', fontsize=14, fontweight='bold')
    
    # Format y-axis as currency
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, pos: format_currency(x)))
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add grid lines
    ax.grid(axis='y', linestyle='--', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('images/charts/scenario-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created scenario-chart.png")

# 13. Tornado Chart
def create_tornado_chart():
    variables = [
        'User Growth Rate (+5%)',
        'User Growth Rate (-5%)',
        'Conversion Rate (+2%)',
        'Conversion Rate (-2%)',
        'Ticket Commission (+1%)',
        'Ticket Commission (-1%)',
        'CAC (+20%)',
        'CAC (-20%)'
    ]
    
    impacts = [87000, -87000, 58000, -58000, 26250, -26250, 0, 0]
    
    # Create colors based on positive or negative impact
    bar_colors = [colors['success'] if impact >= 0 else colors['danger'] for impact in impacts]
    
    # Sort for proper tornado chart visualization (optional)
    # We'll skip sorting here to match the original data order
    
    fig, ax = plt.subplots(figsize=(FIG_WIDTH, FIG_HEIGHT), dpi=DPI)
    
    # Create horizontal bar chart
    y_pos = np.arange(len(variables))
    ax.barh(y_pos, impacts, color=bar_colors, height=0.6)
    
    # Add labels inside or outside bars depending on value
    for i, v in enumerate(impacts):
        if v >= 0:
            label = f"+{format_currency(v)}"
            ha = 'left'
            x_pos = v + 5000
        else:
            label = f"{format_currency(v)}"
            ha = 'right'
            x_pos = v - 5000
        
        ax.text(x_pos, i, label, va='center', fontsize=10, fontweight='bold')
    
    ax.set_yticks(y_pos)
    ax.set_yticklabels(variables)
    ax.invert_yaxis()  # Invert y-axis for top-to-bottom ordering
    
    ax.set_xlabel('Impact on Year 3 Revenue', fontweight='bold')
    ax.set_title('Sensitivity Analysis - Impact on Year 3 Revenue', fontsize=14, fontweight='bold')
    
    # Add vertical line at zero
    ax.axvline(x=0, color='black', linestyle='-', linewidth=0.8)
    
    # Format x-axis as currency
    def format_with_sign(x, pos):
        if x == 0:
            return '€0'
        return f"+{format_currency(x)}" if x > 0 else format_currency(x)
    
    ax.xaxis.set_major_formatter(plt.FuncFormatter(format_with_sign))
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Add grid lines
    ax.grid(axis='x', linestyle='--', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('images/charts/tornado-chart.png', bbox_inches='tight', transparent=True)
    plt.close()
    print("Created tornado-chart.png")

# Run all chart creation functions
if __name__ == "__main__":
    print("Generating Momento financial charts...")
    create_overview_chart()
    create_tickets_chart()
    create_user_growth_chart()
    create_cost_breakdown_chart()
    create_pre_seed_chart()
    create_series_a_chart()
    create_break_even_chart()
    create_arpu_chart()
    create_clv_cac_chart()
    create_retention_chart()
    create_mrr_chart()
    create_scenario_chart()
    create_tornado_chart()
    print("All charts generated successfully!") 