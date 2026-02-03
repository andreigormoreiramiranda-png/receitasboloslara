/* ============================================
   BOLOS SEM GLÚTEN - PÁGINA DE VENDAS
   JavaScript - Interatividade & Conversão
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const revealElements = document.querySelectorAll(
        '.problem-card, .benefit-card, .content-card, .bonus-card, .testimonial-card, .who-item'
    );
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on load

    // ============================================
    // CTA BUTTON CLICK TRACKING
    // ============================================
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track click event (for analytics)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ============================================
    // COUNTDOWN TIMER (Optional - for urgency)
    // ============================================
    function startCountdown(duration, display) {
        let timer = duration, hours, minutes, seconds;
        
        setInterval(function() {
            hours = parseInt(timer / 3600, 10);
            minutes = parseInt((timer % 3600) / 60, 10);
            seconds = parseInt(timer % 60, 10);
            
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            if (display) {
                display.textContent = hours + ":" + minutes + ":" + seconds;
            }
            
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
    
    const countdownDisplay = document.getElementById('countdown');
    if (countdownDisplay) {
        startCountdown(3600 * 5, countdownDisplay); // 5 hours
    }

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // ============================================
    // MOBILE MENU TOGGLE (if needed)
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // ============================================
    // EXIT INTENT POPUP (Desktop only)
    // ============================================
    let exitIntentShown = false;
    
    document.addEventListener('mouseout', function(e) {
        if (e.clientY < 0 && !exitIntentShown && window.innerWidth > 768) {
            // You can show a popup or special offer here
            console.log('Exit intent detected');
            exitIntentShown = true;
        }
    });

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e85d04, #d62828);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 4px 15px rgba(232, 93, 4, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9998;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // FLOATING CTA BUTTON (COMPRAR)
    // ============================================
    const floatingCta = document.createElement('a');
    floatingCta.href = '#oferta';
    floatingCta.className = 'floating-cta-btn';
    floatingCta.innerHTML = '🍰 BAIXAR MINHA CÓPIA';
    floatingCta.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 18px 30px;
        background: linear-gradient(135deg, #e85d04, #d62828);
        color: white;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 700;
        font-family: 'Inter', sans-serif;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.4s ease;
        z-index: 9999;
        cursor: pointer;
    `;
    
    document.body.appendChild(floatingCta);
    
    floatingCta.addEventListener('click', (e) => {
        e.preventDefault();
        const oferta = document.getElementById('oferta');
        if (oferta) {
            oferta.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    window.addEventListener('scroll', () => {
        // Scroll to top button
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
        
        // Floating CTA button - aparece após 600px de scroll
        if (window.scrollY > 600) {
            floatingCta.style.opacity = '1';
            floatingCta.style.transform = 'translateY(0)';
        } else {
            floatingCta.style.opacity = '0';
            floatingCta.style.transform = 'translateY(100%)';
        }
    });

    // ============================================
    // COPY COUPON CODE (if needed)
    // ============================================
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER (Basic)
    // ============================================
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (testimonialsContainer && window.innerWidth < 768) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsContainer.offsetLeft;
            scrollLeft = testimonialsContainer.scrollLeft;
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialsContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // ============================================
    // PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition', 'none');
        
        const animatedElements = document.querySelectorAll('.pulse, .float');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
        });
    }

    // ============================================
    // FORM VALIDATION (if forms exist)
    // ============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c🍰 Bolos Sem Glúten', 'font-size: 24px; font-weight: bold; color: #e85d04;');
    console.log('%cPágina de Vendas - +500 Receitas', 'font-size: 14px; color: #666;');
    
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
