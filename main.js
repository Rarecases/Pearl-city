/**
 * FOKES PROPERTY - PEARL CITY PROMO
 * Mobile-First JavaScript
 */

// Countdown Timer
function initCountdown() {
    const deadline = new Date('December 31, 2025 23:59:59').getTime();
    
    function update() {
        const now = new Date().getTime();
        const diff = deadline - now;
        
        if (diff < 0) {
            document.querySelectorAll('.countdown-item span').forEach(el => el.textContent = '00');
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// Form Handler
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will contact you shortly.');
        form.reset();
    });
}

// Image Lightbox
function initLightbox() {
    const promoCard = document.querySelector('.promo-image-card');
    if (!promoCard) return;
    
    promoCard.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
}

// Hero Video - AGGRESSIVE MOBILE FIX
function initHeroVideo() {
    var video = document.getElementById('heroVideo');
    if (!video) return;
    
    // CRITICAL: Force muted (REQUIRED for mobile autoplay)
    video.muted = true;
    video.volume = 0;
    video.defaultMuted = true;
    
    // Force ALL playsinline attributes
    video.setAttribute('muted', 'muted');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');
    video.setAttribute('x5-video-player-type', 'h5');
    video.setAttribute('x5-video-player-fullscreen', 'false');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('loop', 'true');
    video.setAttribute('preload', 'auto');
    
    // iOS specific properties
    video.webkitPlaysInline = true;
    video.playsInline = true;
    
    // Force load
    video.load();
    
    // Aggressive play function
    function forcePlay() {
        video.muted = true;
        var playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log('Video playing');
            }).catch(function(e) {
                console.log('Play failed, retrying...', e);
                setTimeout(forcePlay, 100);
            });
        }
    }
    
    // Try to play immediately
    forcePlay();
    
    // Play when metadata is loaded
    video.addEventListener('loadedmetadata', function() {
        console.log('Metadata loaded');
        forcePlay();
    });
    
    // Play when data is loaded
    video.addEventListener('loadeddata', function() {
        console.log('Data loaded');
        forcePlay();
    });
    
    // Play when can play
    video.addEventListener('canplay', function() {
        console.log('Can play');
        forcePlay();
    });
    
    // Play when can play through
    video.addEventListener('canplaythrough', function() {
        console.log('Can play through');
        forcePlay();
    });
    
    // Play on ANY user interaction (MOST IMPORTANT FOR MOBILE)
    var userInteracted = false;
    function onUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            console.log('User interaction detected');
            video.muted = true;
            video.load();
            forcePlay();
        } else {
            forcePlay();
        }
    }
    
    // Listen to ALL possible user interactions
    document.addEventListener('touchstart', onUserInteraction, { passive: true, once: false });
    document.addEventListener('touchend', onUserInteraction, { passive: true, once: false });
    document.addEventListener('touchmove', onUserInteraction, { passive: true, once: false });
    document.addEventListener('click', onUserInteraction, { passive: true, once: false });
    document.addEventListener('scroll', onUserInteraction, { passive: true, once: false });
    document.addEventListener('mousedown', onUserInteraction, { passive: true, once: false });
    
    // Keep checking every 300ms
    setInterval(function() {
        if (video.paused && !video.ended) {
            forcePlay();
        }
    }, 300);
    
    // If video pauses, restart it
    video.addEventListener('pause', function() {
        if (!video.ended) {
            setTimeout(forcePlay, 50);
        }
    });
    
    // Loop video when ended
    video.addEventListener('ended', function() {
        video.currentTime = 0;
        forcePlay();
    });
    
    // Handle visibility change (when user returns to tab)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            forcePlay();
        }
    });
    
    // Intersection Observer - play when video is visible
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    forcePlay();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(video);
    }
}

// Initialize on multiple events
document.addEventListener('DOMContentLoaded', initHeroVideo);
window.addEventListener('load', initHeroVideo);

// Also try after a short delay
setTimeout(initHeroVideo, 100);
setTimeout(initHeroVideo, 500);
setTimeout(initHeroVideo, 1000);

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initSmoothScroll();
    initForm();
    initLightbox();
    initScrollReveal();
    initParallax();
});

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
function initScrollReveal() {
    // Add reveal classes to elements
    const revealElements = [
        { selector: '.section-header', class: 'reveal-up' },
        { selector: '.pearl-highlights', class: 'reveal' },
        { selector: '.pricing-cards', class: 'reveal-scale' },
        { selector: '.features-grid', class: 'reveal' },
        { selector: '.stats-row', class: 'reveal-up' },
        { selector: '.trust-badges', class: 'reveal' },
        { selector: '.google-form-btn-container', class: 'reveal-up' },
        { selector: '.contact-alternatives', class: 'reveal' },
        { selector: '.deadline-banner', class: 'reveal-scale' }
    ];
    
    // Add classes to elements
    revealElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(el => {
            if (!el.classList.contains('reveal') && 
                !el.classList.contains('reveal-up') && 
                !el.classList.contains('reveal-left') && 
                !el.classList.contains('reveal-right') &&
                !el.classList.contains('reveal-scale')) {
                el.classList.add(item.class);
            }
        });
    });
    
    // Add stagger animation to grid items
    const staggerContainers = [
        '.pearl-highlights .highlight-card',
        '.pricing-cards .price-card',
        '.features-grid .feature-item',
        '.trust-badges .trust-item',
        '.phone-list .phone-item'
    ];
    
    staggerContainers.forEach(selector => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.classList.add('stagger-item');
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
    
    // Create Intersection Observer - REPEATING ANIMATIONS
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is visible - animate IN
                entry.target.classList.add('active');
                
                // Trigger stagger items inside this element
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100);
                });
            } else {
                // Element is NOT visible - reset animation so it plays again
                entry.target.classList.remove('active');
                
                // Reset stagger items too
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    const allRevealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    allRevealElements.forEach(el => observer.observe(el));
    
    // Also observe stagger items directly with separate observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    const allStaggerItems = document.querySelectorAll('.stagger-item');
    allStaggerItems.forEach(el => staggerObserver.observe(el));
}

// =============================================
// PARALLAX EFFECT
// =============================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero ? hero.offsetHeight : 0;
        
        if (scrolled < heroHeight) {
            // Parallax effect on hero content
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
            }
        }
    }, { passive: true });
}

// =============================================
// COUNTER ANIMATION - REPEATING
// =============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseInt(originalText.replace(/\D/g, ''));
        const suffix = originalText.replace(/[0-9]/g, '');
        
        if (isNaN(target)) return;
        
        let isAnimating = false;
        
        const runCounterAnimation = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            let current = 0;
            const increment = target / 50;
            const stepTime = 30;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = target + suffix;
                    isAnimating = false;
                }
            };
            
            counter.textContent = '0' + suffix;
            updateCounter();
        };
        
        // Start when element is visible - REPEATING
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounterAnimation();
                } else {
                    // Reset when out of view so it animates again
                    counter.textContent = '0' + suffix;
                    isAnimating = false;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// =============================================
// HAPTIC FEEDBACK (Mobile)
// =============================================
function addHapticFeedback() {
    const buttons = document.querySelectorAll('.cta-button, .price-cta, .google-form-btn, .phone-item, .bottom-cta');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }, { passive: true });
    });
}

document.addEventListener('DOMContentLoaded', addHapticFeedback);

// =============================================
// SMOOTH HEADER HIDE ON SCROLL
// =============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    if (currentScroll > lastScroll) {
                        // Scrolling down
                        header.style.transform = 'translateY(-100%)';
                        header.style.opacity = '0';
                    } else {
                        // Scrolling up
                        header.style.transform = 'translateY(0)';
                        header.style.opacity = '1';
                    }
                } else {
                    header.style.transform = 'translateY(0)';
                    header.style.opacity = '1';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initHeaderScroll);
