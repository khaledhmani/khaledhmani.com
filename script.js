// Dark mode is permanent - no theme management needed

// Navigation scroll spy
class ScrollSpy {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section, .hero');
        this.init();
    }

    init() {
        const options = {
            root: null,
            rootMargin: '-80px 0px -80px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveLink(entry.target.id);
                }
            });
        }, options);

        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Copy to clipboard functionality
class ClipboardManager {
    constructor() {
        this.copyButtons = document.querySelectorAll('.copy-btn');
        this.init();
    }

    init() {
        this.copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const textToCopy = button.getAttribute('data-copy');
                this.copyToClipboard(textToCopy, button);
            });
        });
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            this.showCopyFeedback(button, true);
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopyTextToClipboard(text, button);
        }
    }

    fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopyFeedback(button, true);
        } catch (err) {
            this.showCopyFeedback(button, false);
        }

        document.body.removeChild(textArea);
    }

    showCopyFeedback(button, success) {
        const originalText = button.textContent;
        button.textContent = success ? '✅' : '❌';
        button.style.background = success ? '#10b981' : '#ef4444';
        button.style.color = 'white';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
}

// Skills filter functionality
class SkillsFilter {
    constructor() {
        this.filterChips = document.querySelectorAll('.filter-chip');
        this.skillTags = document.querySelectorAll('.skill-tag');
        this.init();
    }

    init() {
        this.filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const filter = chip.getAttribute('data-filter');
                this.setActiveFilter(chip);
                this.filterSkills(filter);
            });
        });
    }

    setActiveFilter(activeChip) {
        this.filterChips.forEach(chip => chip.classList.remove('active'));
        activeChip.classList.add('active');
    }

    filterSkills(filter) {
        this.skillTags.forEach(tag => {
            const category = tag.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                tag.style.display = 'inline-block';
                tag.classList.add('highlighted');
            } else {
                tag.style.display = 'inline-block';
                tag.classList.remove('highlighted');
            }
        });

        // Reset all highlights if "all" is selected
        if (filter === 'all') {
            this.skillTags.forEach(tag => tag.classList.remove('highlighted'));
        }
    }
}

// Date management
class DateManager {
    constructor() {
        this.lastUpdatedElement = document.getElementById('lastUpdated');
        this.updateLastUpdatedDate();
    }

    updateLastUpdatedDate() {
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        if (this.lastUpdatedElement) {
            this.lastUpdatedElement.textContent = today.toLocaleDateString('en-US', options);
        }
    }
}

// Smooth scroll for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle navigation link clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance optimization: Defer non-critical JavaScript
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load any future images
        if ('IntersectionObserver' in window) {
            this.setupLazyLoading();
        }

        // Preload critical resources
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    preloadCriticalResources() {
        // Preload any critical fonts or resources
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link);
    }
}

// Scroll animation manager
class ScrollAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item');
        this.counters = document.querySelectorAll('.highlight-number[data-count]');
        this.counterAnimated = new Set();
        this.init();
    }

    init() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            this.observer.observe(element);
        });

        // Special observer for counters
        this.counters.forEach(counter => {
            this.observer.observe(counter.closest('.highlight'));
        });
    }

    animateElement(element) {
        if (element.classList.contains('stagger-item')) {
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            setTimeout(() => {
                element.classList.add('visible');
                this.animateCounter(element);
            }, delay);
        } else {
            element.classList.add('visible');
        }

        this.observer.unobserve(element);
    }

    animateCounter(element) {
        const counter = element.querySelector('.highlight-number[data-count]');
        if (counter && !this.counterAnimated.has(counter)) {
            this.counterAnimated.add(counter);
            const target = parseInt(counter.getAttribute('data-count'));
            const isPercentage = counter.textContent.includes('%');
            const hasPlus = counter.textContent.includes('+');
            
            this.countUp(counter, 0, target, 2000, isPercentage, hasPlus);
        }
    }

    countUp(element, start, end, duration, isPercentage = false, hasPlus = false) {
        const startTime = performance.now();
        element.classList.add('counting');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            let displayValue = current.toString();
            if (hasPlus) displayValue += '+';
            if (isPercentage) displayValue += '%';
            
            element.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.classList.remove('counting');
                // Final value
                let finalValue = end.toString();
                if (hasPlus) finalValue += '+';
                if (isPercentage) finalValue += '%';
                element.textContent = finalValue;
            }
        };

        requestAnimationFrame(animate);
    }
}

// Enhanced project card interactions
class ProjectCardManager {
    constructor() {
        this.cards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.onCardHover(card));
            card.addEventListener('mouseleave', () => this.onCardLeave(card));
            card.addEventListener('click', () => this.onCardClick(card));
        });
    }

    onCardHover(card) {
        // Add subtle parallax effect to tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            tag.style.transform = `translateY(-${(index + 1) * 2}px)`;
            tag.style.transitionDelay = `${index * 50}ms`;
        });
    }

    onCardLeave(card) {
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.transform = 'translateY(0)';
            tag.style.transitionDelay = '0ms';
        });
    }

    onCardClick(card) {
        // Add click ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 122, 0, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple animation keyframes to head
if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality (no ThemeManager needed)
    new ScrollSpy();
    new ClipboardManager();
    new SkillsFilter();
    new DateManager();
    new SmoothScroll();
    
    // Initialize new interactive features
    new ScrollAnimationManager();
    new ProjectCardManager();
    
    // Initialize performance optimizations
    requestIdleCallback(() => {
        new PerformanceOptimizer();
    }, { timeout: 2000 });
});

// Service Worker registration for future PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then((registration) => {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch((registrationError) => {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Analytics placeholder (uncomment and configure when needed)
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID', {
//     page_title: 'Khaled Hmani - AI Transformation Project Manager',
//     page_location: window.location.href
// });

// Error handling for production
window.addEventListener('error', (e) => {
    // Log errors to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('JavaScript Error:', e.error);
    }
    
    // In production, you might want to send errors to a logging service
    // Example: logErrorToService(e.error, e.filename, e.lineno);
});

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
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
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}