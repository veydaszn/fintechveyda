document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Starting FinTechVeyda script.");

    // --- SPA Routing Logic ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');

    // Function to handle page activation
    const activatePage = (pageId) => {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            console.log(`Page '${pageId}' activated.`);
        } else {
            console.warn(`Target page element with ID '${pageId}' not found.`);
        }

        // Update active nav link (both desktop and mobile)
        navLinks.forEach(link => {
            if (link.dataset.page + '-page' === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile nav if open
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
    };

    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.target.dataset.page + '-page';
            activatePage(targetPageId);
        });
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileNav) {
                mobileNav.classList.toggle('active');
                console.log("Mobile navigation toggled.");
            }
        });
    } else {
        console.warn("Mobile menu toggle button not found.");
    }

    // --- Chart.js Initialization and Metric Updates ---
    const ctx = document.getElementById('financial-chart');
    
    // Placeholder data for the chart - using more realistic sample values
    const revenueData = [65000, 59000, 80000, 81000, 70000];
    const expensesData = [28000, 48000, 40000, 35000, 45000];
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']; // Labels for a 5-week period

    // Calculate total revenue, expenses, and net cash flow from the placeholder data
    const totalRevenue = revenueData.reduce((sum, val) => sum + val, 0);
    const totalExpenses = expensesData.reduce((sum, val) => sum + val, 0);
    const netCashFlow = totalRevenue - totalExpenses;

    // Update metric cards
    const totalRevenueElement = document.getElementById('total-revenue');
    const totalExpensesElement = document.getElementById('total-expenses');
    const netCashFlowElement = document.getElementById('net-cash-flow');

    if (totalRevenueElement) totalRevenueElement.textContent = `KSh ${totalRevenue.toLocaleString()}`;
    if (totalExpensesElement) totalExpensesElement.textContent = `KSh ${totalExpenses.toLocaleString()}`;
    if (netCashFlowElement) netCashFlowElement.textContent = `KSh ${netCashFlow.toLocaleString()}`;


    // Only attempt to initialize Chart.js if the canvas element exists
    if (ctx) {
        console.log("Chart canvas element found. Initializing Chart.js with enhanced data visualization.");
        const data = {
            labels: labels,
            datasets: [{
                type: 'bar', // Revenue as bars
                label: 'Revenue (Ksh)',
                data: revenueData,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.7)', // Slightly more opaque
                borderWidth: 1,
                borderRadius: 5 // Rounded bars
            }, {
                type: 'line', // Expenses as a line
                label: 'Expenses (Ksh)',
                data: expensesData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.3)', // Lighter fill for line
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#e74c3c', // Points for the line
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#e74c3c'
            }]
        };

        new Chart(ctx, {
            type: 'bar', // Default type, but datasets override this
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Revenue vs. Expenses Over Time',
                        font: {
                            size: 16
                        },
                        color: '#2c3e50'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                    legend: {
                        labels: {
                            color: '#555'
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Period',
                            color: '#555'
                        },
                        ticks: {
                            color: '#777'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (Ksh)',
                            color: '#555'
                        },
                        ticks: {
                            color: '#777',
                            callback: function(value) {
                                return `KSh ${value.toLocaleString()}`;
                            }
                        }
                    }
                }
            }
        });
    } else {
        console.error("Chart canvas element with ID 'financial-chart' not found! Chart.js not initialized.");
    }


    // Handle M-Pesa transaction button click
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', () => {
            alert("Redirecting to M-Pesa Transaction Input Form...");
            // This is still a placeholder. We'll build the actual form next.
        });
    } else {
        console.warn("Add Transaction button not found.");
    }

    // --- Image Slider Logic ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');

    // Only proceed with slider logic if essential elements exist
    if (sliderWrapper && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        console.log("Slider components found. Initializing slider.");
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Create dots for each slide
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.slide = i;
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot'); // Re-query dots after creation

        const showSlide = (index) => {
            // Ensure index wraps around
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            const offset = -currentSlide * 100;
            sliderWrapper.style.transform = `translateX(${offset}%)`;

            // Update active dot
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            }
        };

        // Event listeners for slider buttons
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                showSlide(parseInt(e.target.dataset.slide));
            });
        });

        // Auto-play feature
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds

        // Initial slide display
        showSlide(0);
    } else {
        console.warn("Slider components not found or not enough slides to initialize slider. Skipping slider initialization.");
    }
});
