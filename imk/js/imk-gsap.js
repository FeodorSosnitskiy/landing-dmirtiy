// IMK GSAP Animations
// Централизованная настройка и анимации для сайта IMK

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Глобальные настройки
gsap.defaults({
    ease: "power3.out",
    duration: 1
});

ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
    markers: false
});

// ============================================
// Lenis Smooth Scroll
// ============================================
let lenis;

function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// ============================================
// Header Animation
// ============================================
function initHeaderAnimation() {
    const header = document.querySelector('.header');
    
    ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
            if (self.direction === 1) {
                header.classList.add('scrolled');
            } else if (window.scrollY < 100) {
                header.classList.remove('scrolled');
            }
        }
    });
}

// ============================================
// Hero Section Animation
// ============================================
function initHeroAnimation() {
    const heroTl = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });

    heroTl
        .from('.hero__tagline', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3
        })
        .from('.hero__title-line', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15
        }, '-=0.6')
        .from('.hero__description', {
            y: 40,
            opacity: 0,
            duration: 1
        }, '-=0.6')
        .from('.hero__scroll-indicator', {
            opacity: 0,
            duration: 0.8
        }, '-=0.4');
}

// ============================================
// Team Section Animation
// ============================================
function initTeamAnimation() {
    const teamTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.team',
            start: 'top 70%',
            end: 'bottom 30%'
        }
    });

    teamTl
        .from('.team__title', {
            y: 60,
            opacity: 0,
            duration: 1
        })
        .from('.team__description', {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.team .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.team__image-wrapper', {
            scale: 1.1,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        }, '-=1');
}

// ============================================
// Practice Areas Animation
// ============================================
function initPracticesAnimation() {
    // Header animation
    const practicesHeaderTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.practices__header',
            start: 'top 75%'
        }
    });

    practicesHeaderTl
        .from('.practices__number', {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        })
        .from('.practices__label', {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, '-=0.8')
        .from('.practices__intro', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4');

    // List items animation
    gsap.from('.practices__item', {
        scrollTrigger: {
            trigger: '.practices__list',
            start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: {
            amount: 1,
            from: "start"
        }
    });
}

// ============================================
// News Section Animation
// ============================================
function initNewsAnimation() {
    const newsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.news',
            start: 'top 70%'
        }
    });

    newsTl
        .from('.news__title', {
            y: 50,
            opacity: 0,
            duration: 1
        })
        .from('.news__header .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.6');

    gsap.from('.news__card', {
        scrollTrigger: {
            trigger: '.news__grid',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });
}

// ============================================
// Career Section Animation
// ============================================
function initCareerAnimation() {
    const careerTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.career',
            start: 'top 70%'
        }
    });

    careerTl
        .from('.career__title', {
            y: 60,
            opacity: 0,
            duration: 1
        })
        .from('.career__description', {
            y: 40,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.career .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.career__image-wrapper', {
            scale: 1.1,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        }, '-=1');
}

// ============================================
// Footer Animation
// ============================================
function initFooterAnimation() {
    gsap.from('.footer__brand', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8
    });

    gsap.from('.footer__info-block', {
        scrollTrigger: {
            trigger: '.footer__info',
            start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
    });
}

// ============================================
// Parallax Effects
// ============================================
function initParallaxEffects() {
    // Image parallax on scroll
    gsap.utils.toArray('.team__image, .career__image').forEach(img => {
        gsap.to(img, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest('.team__image-wrapper, .career__image-wrapper'),
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// ============================================
// Practice Items Hover Effect
// ============================================
function initPracticeHoverEffects() {
    const practiceItems = document.querySelectorAll('.practices__item');
    
    practiceItems.forEach(item => {
        const arrow = item.querySelector('.practices__arrow');
        const name = item.querySelector('.practices__name');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(arrow, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(arrow, {
                opacity: 0,
                x: -10,
                y: 10,
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });
}

// ============================================
// Responsive Animations
// ============================================
function initResponsiveAnimations() {
    ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 992px)": function() {
            initParallaxEffects();
            initPracticeHoverEffects();
        },
        
        // Mobile/Tablet
        "(max-width: 991px)": function() {
            // Simplified animations for mobile
        }
    });
}

// ============================================
// Scroll to anchor links
// ============================================
function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target && lenis) {
                lenis.scrollTo(target, {
                    offset: -100,
                    duration: 1.5,
                    easing: (t) => 1 - Math.pow(1 - t, 4)
                });
            }
        });
    });
}

// ============================================
// Initialize All
// ============================================
function initAllAnimations() {
    initLenis();
    initHeaderAnimation();
    initHeroAnimation();
    initTeamAnimation();
    initPracticesAnimation();
    initNewsAnimation();
    initCareerAnimation();
    initFooterAnimation();
    initResponsiveAnimations();
    initSmoothScrollLinks();
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initAllAnimations);

// Refresh ScrollTrigger on window load (for images)
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

console.log('IMK GSAP Animations initialized');
