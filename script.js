// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // Check for saved theme or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

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

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    new ThemeManager();
    new ScrollSpy();
    new ClipboardManager();
    new SkillsFilter();
    new DateManager();
    new SmoothScroll();
    
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