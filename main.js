// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing charts...");
    
    // Fallback image configuration
    const USE_STATIC_IMAGES = true; // Default setting
    
    // Base64 placeholder image (simple chart icon) to use until real images are created
    const PLACEHOLDER_CHART = 'data:image/png;base64,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';
    
    const FALLBACK_IMAGES = {
        'overviewChart': 'images/charts/overview-chart.png',
        'ticketsChart': 'images/charts/tickets-chart.png',
        'userGrowthChart': 'images/charts/user-growth-chart.png',
        'costBreakdownChart': 'images/charts/cost-breakdown-chart.png',
        'preSeedChart': 'images/charts/pre-seed-chart.png',
        'seriesAChart': 'images/charts/series-a-chart.png',
        'breakEvenChart': 'images/charts/break-even-chart.png',
        'arpuChart': 'images/charts/arpu-chart.png',
        'clvCacChart': 'images/charts/clv-cac-chart.png',
        'retentionChart': 'images/charts/retention-chart.png',
        'mrrChart': 'images/charts/mrr-chart.png',
        'scenarioChart': 'images/charts/scenario-chart.png',
        'tornadoChart': 'images/charts/tornado-chart.png'
    };
    
    // Function to replace a chart with a static image
    const replaceChartWithImage = (chartId, fallbackUrl) => {
        console.log(`Replacing chart ${chartId} with static image from ${fallbackUrl}`);
        
        // First try to get the canvas element
        const canvasElement = document.getElementById(chartId);
        if (!canvasElement) {
            console.error(`Canvas element with ID ${chartId} not found!`);
            return false;
        }
        
        // Get the container - either div.chart-container or the closest parent with chart-container class
        let container = canvasElement.closest('.chart-container');
        
        // If not found, try these alternative containers that might be used for specific charts
        if (!container) {
            if (chartId === 'costBreakdownChart') {
                container = canvasElement.closest('.cost-chart-container');
            } else if (chartId === 'preSeedChart' || chartId === 'seriesAChart') {
                container = canvasElement.closest('.funding-allocation');
            } else if (chartId === 'breakEvenChart') {
                container = canvasElement.closest('.break-even-chart');
            }
        }
        
        // If we still can't find a container, use the canvas's parent
        if (!container) {
            container = canvasElement.parentNode;
        }
        
        if (!container) {
            console.error(`Could not find a suitable container for ${chartId}`);
            return false;
        }
        
        // Create a fallback message that will display if the image also fails to load
        const fallbackHtml = `
            <div class="static-chart">
                <img src="${fallbackUrl}" alt="${chartId} chart" 
                     style="max-width: 100%; max-height: 300px; object-fit: contain;"
                     onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\\'chart-error\\\'>Chart image failed to load. Please check connection and refresh.</div>';">
                <div class="static-chart-overlay">Static Chart</div>
            </div>
        `;
        
        // Insert the static image HTML
        canvasElement.outerHTML = fallbackHtml;
        
        return true;
    };
    
    // Replace all charts with static images if user prefers or as fallback
    const setupStaticCharts = () => {
        if (USE_STATIC_IMAGES) {
            console.log("Using static images for all charts");
            
            // Handle problem charts individually first
            const problemCharts = ['costBreakdownChart', 'preSeedChart', 'seriesAChart', 'breakEvenChart'];
            problemCharts.forEach(chartId => {
                if (document.getElementById(chartId)) {
                    console.log(`Handling problem chart: ${chartId}`);
                    replaceChartWithImage(chartId, FALLBACK_IMAGES[chartId]);
                } else {
                    console.error(`Problem chart ${chartId} not found in DOM`);
                }
            });
            
            // Then handle the rest
            Object.entries(FALLBACK_IMAGES).forEach(([chartId, imageUrl]) => {
                if (!problemCharts.includes(chartId) && document.getElementById(chartId)) {
                    replaceChartWithImage(chartId, imageUrl);
                }
            });
            
            return true;
        }
        return false;
    };
    
    // Set up the toggle switch
    const chartModeToggle = document.getElementById('chartModeToggle');
    if (chartModeToggle) {
        chartModeToggle.checked = USE_STATIC_IMAGES;
        
        // Update toggle label
        const updateToggleLabel = () => {
            const label = chartModeToggle.nextElementSibling.nextElementSibling;
            if (label) {
                label.textContent = chartModeToggle.checked ? 'Static Mode' : 'Dynamic Mode';
            }
        };
        
        // Handle toggle change
        chartModeToggle.addEventListener('change', function() {
            updateToggleLabel();
            // Save preference to localStorage
            localStorage.setItem('useStaticCharts', chartModeToggle.checked);
            // Reload the page with new settings
            window.location.reload();
        });
        
        updateToggleLabel();
    }
    
    // Try using static images first if configured
    if (setupStaticCharts()) {
        console.log("Static chart mode enabled. Not initializing Chart.js");
        return; // Skip Chart.js initialization
    }
    
    // Make sure we register the annotation plugin properly
    if (typeof Chart !== 'undefined') {
        console.log("Chart.js loaded successfully");
        
        if (Chart.annotation) {
            console.log("Annotation plugin detected, registering...");
            Chart.register(Chart.annotation);
        } else {
            console.error("Chart.js annotation plugin not loaded correctly!");
            setupStaticCharts(); // Fall back to static images
            return;
        }
    } else {
        console.error("Chart.js not loaded!");
        setupStaticCharts(); // Fall back to static images
        return; // Exit early if Chart.js isn't available
    }
    
    // Function to detect browser compatibility issues
    const checkBrowserCompatibility = () => {
        // Check if Canvas is supported
        const canvas = document.createElement('canvas');
        if (!canvas.getContext) {
            console.error("Canvas not supported in this browser");
            return false;
        }
        return true;
    };
    
    if (!checkBrowserCompatibility()) {
        document.querySelectorAll('.chart-container').forEach(container => {
            container.innerHTML = '<div class="chart-error">Your browser does not support canvas rendering. Please try a modern browser like Chrome, Firefox, Edge, or Safari.</div>';
        });
        return; // Exit early if browser compatibility issues are detected
    }

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
        const container = document.getElementById(chartId)?.closest('.chart-container');
        const loadingEl = container?.querySelector('.chart-loading');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    };

    // Create a ResizeObserver to handle chart resizing
    const resizeCharts = () => {
        if (Chart.instances && Chart.instances.length > 0) {
            Chart.instances.forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
        }
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
        try {
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
        } catch (error) {
            console.error('Error creating overview chart:', error);
            const container = document.getElementById('overviewChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create Tickets Chart
    if (document.getElementById('ticketsChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating tickets chart:', error);
            const container = document.getElementById('ticketsChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create User Growth Chart
    if (document.getElementById('userGrowthChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating user growth chart:', error);
            const container = document.getElementById('userGrowthChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create Cost Breakdown Chart
    if (document.getElementById('costBreakdownChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating cost breakdown chart:', error);
            const container = document.getElementById('costBreakdownChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create Pre-Seed Funding Chart
    if (document.getElementById('preSeedChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating pre-seed chart:', error);
            const container = document.getElementById('preSeedChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create Series A Funding Chart
    if (document.getElementById('seriesAChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating series A chart:', error);
            const container = document.getElementById('seriesAChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
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
        
        try {
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
                        }
                    }
                }
            });
            
            // Add break-even line annotation if annotation plugin is available
            if (Chart.annotation && breakEvenChart) {
                breakEvenChart.options.plugins.annotation = {
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
                                position: 'top',
                                color: colors.warning
                            }
                        }
                    }
                };
                
                breakEvenChart.update();
            }
            
            hideLoading('breakEvenChart');
        } catch (error) {
            console.error('Error creating break-even chart:', error);
            const container = document.getElementById('breakEvenChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create ARPU Chart
    if (document.getElementById('arpuChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating ARPU chart:', error);
            const container = document.getElementById('arpuChart').closest('.chart-container');
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        }
    }

    // Create CLV vs CAC Chart
    if (document.getElementById('clvCacChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating CLV vs CAC chart:', error);
            const container = document.getElementById('clvCacChart')?.closest('.chart-container');
            if (container) {
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
        }
    }

    // Create Retention Chart
    if (document.getElementById('retentionChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating retention chart:', error);
            const container = document.getElementById('retentionChart')?.closest('.chart-container');
            if (container) {
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
        }
    }

    // Create MRR Chart
    if (document.getElementById('mrrChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating MRR chart:', error);
            const container = document.getElementById('mrrChart')?.closest('.chart-container');
            if (container) {
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
        }
    }

    // Create Scenario Chart
    if (document.getElementById('scenarioChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating scenario chart:', error);
            const container = document.getElementById('scenarioChart')?.closest('.chart-container');
            if (container) {
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
        }
    }

    // Create Tornado Chart
    if (document.getElementById('tornadoChart')) {
        try {
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
        } catch (error) {
            console.error('Error creating tornado chart:', error);
            const container = document.getElementById('tornadoChart')?.closest('.chart-container');
            if (container) {
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
        }
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

    // Add diagnostics for debugging
    window.runChartDiagnostics = function() {
        console.log("=== Chart.js Diagnostics ===");
        console.log("Chart.js version:", Chart.version);
        console.log("Chart.js loaded:", typeof Chart !== "undefined");
        console.log("Canvas supported:", !!document.createElement("canvas").getContext);
        console.log("Annotation plugin loaded:", !!Chart.annotation);
        console.log("Number of chart instances:", Chart.instances ? Chart.instances.length : "unknown");
        console.log("Charts in DOM:", document.querySelectorAll('canvas').length);
        
        // Log browser info
        console.log("Browser:", navigator.userAgent);
        
        // Check if any charts failed to load
        document.querySelectorAll('.chart-container').forEach(container => {
            const canvas = container.querySelector('canvas');
            const error = container.querySelector('.chart-error');
            
            if (!canvas && !error) {
                console.error("Chart container with no canvas or error message:", container);
            } else if (error) {
                console.error("Chart container with error:", error.textContent);
            }
        });
        
        return "Check browser console for diagnostic information";
    };
    
    // Run diagnostics automatically after a short delay
    setTimeout(window.runChartDiagnostics, 3000);
}); 