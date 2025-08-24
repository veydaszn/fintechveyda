document.addEventListener('DOMContentLoaded', () => {
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
        mobileNav.classList.remove('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.target.dataset.page + '-page';
            activatePage(targetPageId);
        });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // --- Chart.js Initialization ---
    const ctx = document.getElementById('financial-chart');
    
    // Placeholder data for the chart
    const data = {
        labels: ['Aug 1', 'Aug 7', 'Aug 14', 'Aug 21', 'Aug 28'],
        datasets: [{
            label: 'Revenue (Ksh)',
            data: [65000, 59000, 80000, 81000, 56000],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            fill: true,
            tension: 0.4
        }, {
            label: 'Expenses (Ksh)',
            data: [28000, 48000, 40000, 19000, 86000],
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            fill: true,
            tension: 0.4
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Handle M-Pesa transaction button click
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    addTransactionBtn.addEventListener('click', () => {
        alert("Redirecting to M-Pesa Transaction Input Form...");
        // This is still a placeholder. We'll build the actual form next.
    });

    // --- Image Slider Logic ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots for each slide
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.dataset.slide = i;
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

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
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
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
});
