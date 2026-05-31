// =============================================
// Engin Kaptan Web Sitesi - main.js
// =============================================

document.addEventListener('DOMContentLoaded', function() {

    // =============== MOBILE HAMBURGER MENU ===============
    function initMobileMenu() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const navContainer = document.querySelector('.nav-container');
        
        // Hamburger Icon
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        // Mobile Menu Container
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        // Clone navigation links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const clonedLinks = navLinks.cloneNode(true);
            mobileMenu.appendChild(clonedLinks);
        }

        navContainer.appendChild(hamburger);
        navbar.appendChild(mobileMenu);

        // Toggle Menu Function
        hamburger.addEventListener('click', function() {
            const isOpen = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isOpen ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        });

        // Responsive check
        function handleResize() {
            if (window.innerWidth > 768) {
                mobileMenu.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }

        window.addEventListener('resize', handleResize);
    }

    initMobileMenu();

    // =============== SMOOTH SCROLL ===============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============== NAVBAR SCROLL EFFECT ===============
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.97)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
    }

    // =============== ACTIVE LINK ===============
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath === '/' && (href === '/' || href === 'index.html'))) {
                link.style.color = '#00AEEF';
                link.style.fontWeight = '700';
            }
        });
    }

    setActiveNavLink();

    console.log('%c✅ Engin Kaptan Web Sitesi başarıyla yüklendi! 🌊', 
                'color: #00AEEF; font-weight: bold; font-size: 14px;');
});