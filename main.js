// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for header height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to hide loading indicators
    const hideLoading = (chartId) => {
        const container = document.getElementById(chartId).closest('.chart-container');
        const loadingEl = container.querySelector('.chart-loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    };

    // Create a ResizeObserver to handle chart resizing
    const resizeCharts = () => {
        Chart.instances.forEach(chart => {
            chart.resize();
        });
    };
    
    // Listen for window resize events with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCharts, 100);
    });

    // Chart.js Global Configuration
    Chart.defaults.color = '#666';
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    Chart.defaults.plugins.legend.display = true;
    Chart.defaults.plugins.legend.position = 'top';
    Chart.defaults.plugins.legend.labels.boxWidth = 10;
    Chart.defaults.plugins.legend.labels.padding = 10;
    Chart.defaults.animation.duration = 1000; // Reduce animation time for faster loading
    
    // Define colors for consistent use across charts
    const colors = {
        primary: '#EBDCC4',
        primaryLight: 'rgba(235, 220, 196, 0.2)',
        secondary: '#1e90ff',
        secondaryLight: 'rgba(30, 144, 255, 0.2)',
        success: '#4caf50',
        successLight: 'rgba(76, 175, 80, 0.2)',
        warning: '#ff9800',
        warningLight: 'rgba(255, 152, 0, 0.2)',
        danger: '#f44336',
        dangerLight: 'rgba(244, 67, 54, 0.2)',
        neutral: '#607d8b',
        neutralLight: 'rgba(96, 125, 139, 0.2)',
        chartColors: [
            '#EBDCC4', '#1e90ff', '#4caf50', '#ff9800', '#f44336', 
            '#607d8b', '#9c27b0', '#3f51b5', '#009688', '#cddc39'
        ]
    };

    // Set dark mode for charts in dark sections
    const isDarkSection = (elementId) => {
        const element = document.getElementById(elementId);
        return element && element.closest('.section-dark');
    };

    // Helper function to format currency
    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return '€' + (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return '€' + (value / 1000).toFixed(1) + 'K';
        } else {
            return '€' + value;
        }
    };

    // Create Overview Chart
    if (document.getElementById('overviewChart')) {
        const overviewCtx = document.getElementById('overviewChart').getContext('2d');
        const overviewChart = new Chart(overviewCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Subscription Revenue',
                    data: [10873, 72375, 240250],
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1
                }, {
                    label: 'Commission Revenue',
                    data: [12253, 100000, 340000],
                    backgroundColor: colors.secondary,
                    borderColor: colors.secondary,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
        hideLoading('overviewChart');
    }

    // Create Tickets Chart
    if (document.getElementById('ticketsChart')) {
        const ticketsCtx = document.getElementById('ticketsChart').getContext('2d');
        const isDark = isDarkSection('revenue');
        const ticketsChart = new Chart(ticketsCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Tickets Sold',
                    data: [5000, 25000, 75000],
                    fill: true,
                    backgroundColor: colors.secondaryLight,
                    borderColor: colors.secondary,
                    tension: 0.3,
                    pointBackgroundColor: colors.secondary,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        hideLoading('ticketsChart');
    }

    // Create User Growth Chart
    if (document.getElementById('userGrowthChart')) {
        const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
        const userGrowthChart = new Chart(userGrowthCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Active Users',
                    data: [2000, 12500, 40000],
                    backgroundColor: colors.successLight,
                    borderColor: colors.success,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: colors.success,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }, {
                    label: 'Paid Subscribers',
                    data: [200, 1875, 8000],
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primary,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: colors.primary,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                if (value >= 1000) {
                                    return (value / 1000) + 'K';
                                }
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        hideLoading('userGrowthChart');
    }

    // Create Cost Breakdown Chart
    if (document.getElementById('costBreakdownChart')) {
        const costBreakdownCtx = document.getElementById('costBreakdownChart').getContext('2d');
        const isDark = isDarkSection('costs');
        const costBreakdownChart = new Chart(costBreakdownCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Development & Technical',
                    'Marketing & User Acquisition',
                    'Operational Overheads'
                ],
                datasets: [{
                    data: [295000, 170000, 269000],
                    backgroundColor: colors.chartColors,
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: isDark ? '#ccc' : '#666',
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return context.label + ': ' + formatCurrency(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
        hideLoading('costBreakdownChart');
    }

    // Create Pre-Seed Funding Chart
    if (document.getElementById('preSeedChart')) {
        const preSeedCtx = document.getElementById('preSeedChart').getContext('2d');
        const preSeedChart = new Chart(preSeedCtx, {
            type: 'pie',
            data: {
                labels: [
                    'MVP Development',
                    'Marketing & User Acquisition',
                    'Operations (12 months)',
                    'Buffer'
                ],
                datasets: [{
                    data: [200000, 170000, 350000, 30000],
                    backgroundColor: colors.chartColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return context.label + ': ' + formatCurrency(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
        hideLoading('preSeedChart');
    }

    // Create Series A Funding Chart
    if (document.getElementById('seriesAChart')) {
        const seriesACtx = document.getElementById('seriesAChart').getContext('2d');
        const seriesAChart = new Chart(seriesACtx, {
            type: 'pie',
            data: {
                labels: [
                    'Product Enhancement',
                    'Marketing & Expansion',
                    'Operations (18 months)',
                    'Buffer'
                ],
                datasets: [{
                    data: [400000, 600000, 900000, 100000],
                    backgroundColor: colors.chartColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return context.label + ': ' + formatCurrency(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
        hideLoading('seriesAChart');
    }

    // Create Break-Even Chart
    if (document.getElementById('breakEvenChart')) {
        const breakEvenCtx = document.getElementById('breakEvenChart').getContext('2d');
        
        // Create monthly data points for 36 months
        const months = Array.from({length: 36}, (_, i) => `Month ${i+1}`);
        
        // Simplified monthly revenue and costs data
        const monthlyRevenue = [
            // Year 1 (months 1-12)
            743, 921, 1109, 1305, 1514, 1734, 1970, 2222, 2495, 2789, 3110, 3214,
            // Year 2 (months 13-24)
            4000, 5200, 6500, 7800, 9300, 10800, 12400, 14000, 15700, 17500, 19300, 21000,
            // Year 3 (months 25-36)
            24000, 28000, 33000, 37000, 42000, 48000, 55000, 63000, 69000, 78000, 87000, 98000
        ];
        
        const monthlyCosts = [
            // Year 1 (months 1-12)
            61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167, 61167,
            // Year 2 (months 13-24)
            86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667, 86667,
            // Year 3 (months 25-36)
            144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417, 144417
        ];
        
        const breakEvenChart = new Chart(breakEvenCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Revenue',
                    data: monthlyRevenue,
                    borderColor: colors.success,
                    backgroundColor: colors.successLight,
                    fill: false,
                    tension: 0.1,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }, {
                    label: 'Monthly Costs',
                    data: monthlyCosts,
                    borderColor: colors.danger,
                    backgroundColor: colors.dangerLight,
                    fill: false,
                    tension: 0.1,
                    pointRadius: 2,
                    pointHoverRadius: 5,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 12
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            }
                        }
                    },
                    annotation: {
                        annotations: {
                            breakEvenLine: {
                                type: 'line',
                                xMin: 31,
                                xMax: 31,
                                borderColor: colors.warning,
                                borderWidth: 2,
                                label: {
                                    content: 'Break-Even',
                                    enabled: true,
                                    position: 'top'
                                }
                            }
                        }
                    }
                }
            }
        });
        hideLoading('breakEvenChart');
    }

    // Create ARPU Chart
    if (document.getElementById('arpuChart')) {
        const arpuCtx = document.getElementById('arpuChart').getContext('2d');
        const isDark = isDarkSection('kpis');
        const arpuChart = new Chart(arpuCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'ARPU (€)',
                    data: [0.85, 1.15, 1.45],
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primary,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '€' + value.toFixed(2);
                            },
                            color: isDark ? '#ccc' : '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        hideLoading('arpuChart');
    }

    // Create CLV vs CAC Chart
    if (document.getElementById('clvCacChart')) {
        const clvCacCtx = document.getElementById('clvCacChart').getContext('2d');
        const isDark = isDarkSection('kpis');
        const clvCacChart = new Chart(clvCacCtx, {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Customer Lifetime Value (CLV)',
                    data: [15, 24, 32],
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1
                }, {
                    label: 'Customer Acquisition Cost (CAC)',
                    data: [8, 7, 6.5],
                    backgroundColor: colors.secondary,
                    borderColor: colors.secondary,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '€' + value;
                            },
                            color: isDark ? '#ccc' : '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': €' + context.raw;
                            }
                        }
                    }
                }
            }
        });
        hideLoading('clvCacChart');
    }

    // Create Retention Chart
    if (document.getElementById('retentionChart')) {
        const retentionCtx = document.getElementById('retentionChart').getContext('2d');
        const isDark = isDarkSection('kpis');
        const retentionChart = new Chart(retentionCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Monthly Retention Rate',
                    data: [60, 70, 75],
                    fill: true,
                    backgroundColor: colors.successLight,
                    borderColor: colors.success,
                    tension: 0.3,
                    pointBackgroundColor: colors.success,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: isDark ? '#ccc' : '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
        hideLoading('retentionChart');
    }

    // Create MRR Chart
    if (document.getElementById('mrrChart')) {
        const mrrCtx = document.getElementById('mrrChart').getContext('2d');
        const isDark = isDarkSection('kpis');
        const mrrChart = new Chart(mrrCtx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'Monthly Recurring Revenue',
                    data: [1750, 12000, 48000],
                    fill: true,
                    backgroundColor: colors.primaryLight,
                    borderColor: colors.primary,
                    tension: 0.3,
                    pointBackgroundColor: colors.primary,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            },
                            color: isDark ? '#ccc' : '#666'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#ccc' : '#666'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
        hideLoading('mrrChart');
    }

    // Create Scenario Chart
    if (document.getElementById('scenarioChart')) {
        const scenarioCtx = document.getElementById('scenarioChart').getContext('2d');
        const scenarioChart = new Chart(scenarioCtx, {
            type: 'bar',
            data: {
                labels: ['Base Case', 'Optimistic', 'Conservative', 'Pessimistic'],
                datasets: [{
                    label: 'Year 3 Revenue',
                    data: [580250, 812350, 435188, 319138],
                    backgroundColor: [
                        colors.primary,
                        colors.success, 
                        colors.warning,
                        colors.danger
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
        hideLoading('scenarioChart');
    }

    // Create Tornado Chart
    if (document.getElementById('tornadoChart')) {
        const tornadoCtx = document.getElementById('tornadoChart').getContext('2d');
        const tornadoChart = new Chart(tornadoCtx, {
            type: 'bar',
            data: {
                labels: [
                    'User Growth Rate (+5%)',
                    'User Growth Rate (-5%)',
                    'Conversion Rate (+2%)',
                    'Conversion Rate (-2%)',
                    'Ticket Commission (+1%)',
                    'Ticket Commission (-1%)',
                    'CAC (+20%)',
                    'CAC (-20%)'
                ],
                datasets: [{
                    axis: 'y',
                    label: 'Impact on Year 3 Revenue',
                    data: [87000, -87000, 58000, -58000, 26250, -26250, 0, 0],
                    backgroundColor: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        return value >= 0 ? colors.success : colors.danger;
                    },
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                if (value === 0) return '€0';
                                return value > 0 ? '+' + formatCurrency(value) : formatCurrency(value);
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return 'Impact: ' + (value >= 0 ? '+' : '') + formatCurrency(value);
                            }
                        }
                    }
                }
            }
        });
        hideLoading('tornadoChart');
    }

    // Check active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}); 