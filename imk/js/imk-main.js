// IMK Main JavaScript
// Интерактивная логика сайта

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const burger = document.querySelector('.nav__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__list a');
    const body = document.body;

    if (!burger || !mobileMenu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// ============================================
// Search Toggle
// ============================================
function initSearchToggle() {
    const searchBtn = document.querySelector('.nav__search');
    
    if (!searchBtn) return;

    searchBtn.addEventListener('click', () => {
        // Placeholder for search functionality
        console.log('Search clicked');
    });
}

// ============================================
// Newsletter Popup
// ============================================
function initNewsletterPopup() {
    const popup = document.getElementById('newsletter');
    
    if (!popup) return;

    // Show popup after scrolling 50%
    let hasShown = false;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50 && !hasShown) {
            hasShown = true;
            setTimeout(() => {
                popup.classList.add('active');
            }, 1000);
        }
    });

    // Close popup on click outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
}

// ============================================
// Active Navigation Link
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
    const form = document.querySelector('.newsletter-popup__form');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]');
        
        if (email && email.value) {
            console.log('Newsletter subscription:', email.value);
            email.value = '';
            
            const popup = document.getElementById('newsletter');
            if (popup) {
                popup.classList.remove('active');
            }
        }
    });
}

// ============================================
// Cursor Effect (Desktop)
// ============================================
function initCursorEffect() {
    if (window.innerWidth < 992) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span class="cursor-dot"></span>';
    document.body.appendChild(cursor);

    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 1px solid rgba(201, 169, 98, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: difference;
        }
        .cursor-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: #c9a962;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        .custom-cursor.hover {
            width: 60px;
            height: 60px;
            border-color: rgba(201, 169, 98, 0.8);
        }
        a, button {
            cursor: none;
        }
        body {
            cursor: none;
        }
    `;
    document.head.appendChild(style);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .practices__item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// Magnetic Buttons
// ============================================
function initMagneticButtons() {
    if (window.innerWidth < 992) return;

    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ============================================
// Year Update
// ============================================
function initYearUpdate() {
    const yearElements = document.querySelectorAll('.footer__copyright');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(/\d{4}-\d{4}/, `2025-${currentYear}`);
    });
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Preloader (Optional)
// ============================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;

    window.addEventListener('load', () => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    });
}

// ============================================
// TELEGRAM FORM INTEGRATION
// ============================================
const TELEGRAM_TOKEN = "8694529393:AAFIubAiSY0RkE_eiPWxqYv8WBJbANy0Z7Y";
const TELEGRAM_CHAT_ID = "-5267222783";

function initTelegramForm() {
    // Находим все формы на странице
    const forms = document.querySelectorAll('form');
    
    if (!forms.length) return;

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input, textarea');
            let formData = {};

            inputs.forEach(input => {
                const key = input.name || input.placeholder || input.type || 'field';
                if (input.value) {
                    formData[key] = input.value;
                }
            });

            let messageText = "🔥 Nouvelle demande IMK\n\n";

            for (let key in formData) {
                messageText += "• " + key + ": " + formData[key] + "\n";
            }

            messageText += "\n🌐 Page: " + window.location.href;
            messageText += "\n🕒 Time: " + new Date().toLocaleString();

            try {
                const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: messageText
                    })
                });

                if (response.ok) {
                    alert("Message envoyé avec succès !");
                    form.reset();
                    
                    // Закрыть popup если это newsletter
                    const popup = document.getElementById('newsletter');
                    if (popup) {
                        popup.classList.remove('active');
                    }
                } else {
                    throw new Error('Telegram API error');
                }

            } catch (err) {
                console.error('Telegram send error:', err);
                alert("Erreur lors de l'envoi. Veuillez réessayer.");
            }
        });
    });
}

// ============================================
// Initialize All
// ============================================
function initApp() {
    initMobileMenu();
    initSearchToggle();
    initNewsletterPopup();
    initActiveNavLink();
    initTelegramForm(); // Telegram integration instead of initFormValidation
    initYearUpdate();
    initLazyLoading();
    initPreloader();
    
    // Desktop-only features
    if (window.innerWidth >= 992) {
        // initCursorEffect(); // Uncomment to enable custom cursor
        initMagneticButtons();
    }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

console.log('IMK Main JS initialized');
