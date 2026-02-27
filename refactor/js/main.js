/**
 * PORTFOLIO MAIN SCRIPT
 * Handles animations, API calls, and interactions
 */

// ============================================
// TEXT ANIMATION CONFIGURATION
// ============================================

const textAnimationConfig = {
    texts: [
        'Tecnologia Simples. Valor Real para Seus Clientes.',
        'Tecnologia simples. Clientes mais satisfeitos.',
        'Tecnologia simples. Experiências incríveis para seus consumidores.',
        'Tecnologia simples. Conectando seu negócio ao sucesso do cliente.',
        'Tecnologia simples. Gerando valor que seu cliente sente.',
        'Tecnologia simples. Seu cliente no centro da inovação.'
    ],
    currentIndex: 0,
    intervalTime: 4000
};

// ============================================
// TEXT ANIMATION
// ============================================

class TextAnimator {
    constructor(config) {
        this.config = config;
        this.element = document.getElementById('animated-text');
        this.intervalId = null;
    }

    init() {
        if (!this.element) return;

        // Set initial text
        this.updateText(0);

        // Start rotation
        this.intervalId = setInterval(() => {
            this.config.currentIndex = (this.config.currentIndex + 1) % this.config.texts.length;
            this.animateTextChange();
        }, this.config.intervalTime);
    }

    animateTextChange() {
        const text = this.config.texts[this.config.currentIndex];

        // Fade out
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(10px)';

        // Change text after fade
        setTimeout(() => {
            this.updateText(this.config.currentIndex);
        }, 300);
    }

    updateText(index) {
        this.element.textContent = this.config.texts[index];
        this.element.style.opacity = '1';
        this.element.style.transform = 'translateY(0)';
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

function smoothScroll(sectionId, event) {
    if (event) {
        event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = document.querySelector('.navbar-custom')?.clientHeight || 0;
    const offsetPosition = element.offsetTop - navbarHeight - 20;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Close navbar if mobile
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) {
            toggler.click();
        }
    }
}

// ============================================
// ARTICLES API SERVICE
// ============================================

class ArticlesService {
    static async fetchArticles(username = 'abraaom', limit = 6) {
        try {
            const response = await fetch(`https://dev.to/api/articles?username=${username}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const articles = await response.json();
            return articles.slice(0, limit);
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }
}

// ============================================
// ARTICLES RENDERER
// ============================================

class ArticlesRenderer {
    static render(articlesContainer, articles) {
        if (!articlesContainer) return;

        articlesContainer.innerHTML = '';

        articles.forEach((article, index) => {
            const cardElement = this.createArticleCard(article);
            articlesContainer.appendChild(cardElement);
        });
    }

    static createArticleCard(article) {
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-md-6', 'col-lg-4');

        const link = document.createElement('a');
        link.href = article.url;
        link.classList.add('text-decoration-none');
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        const coverImage = article.cover_image || 'https://via.placeholder.com/400x250?text=Article';

        link.innerHTML = `
            <div class="card article-card">
                <img src="${this.escapeHtml(coverImage)}" 
                     class="card-img-top" 
                     alt="${this.escapeHtml(article.title)}"
                     loading="lazy">
                <div class="card-body">
                    <h5 class="card-title"><strong>${this.escapeHtml(article.title)}</strong></h5>
                    <p class="card-text">${this.escapeHtml(article.description || 'Leia mais no Dev.to')}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="badge bg-light text-dark">${article.reading_time_minutes || 0} min read</span>
                        <span class="text-muted">
                            <i class="bi bi-hand-thumbs-up"></i> ${article.public_reactions_count || 0}
                        </span>
                    </div>
                </div>
            </div>
        `;

        col.appendChild(link);
        return col;
    }

    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// ============================================
// ARTICLES MANAGER
// ============================================

class ArticlesManager {
    constructor() {
        this.container = document.getElementById('articles-container');
        this.isLoading = false;
    }

    async init() {
        if (!this.container) return;

        this.setLoading(true);

        try {
            const articles = await ArticlesService.fetchArticles();
            ArticlesRenderer.render(this.container, articles);
        } catch (error) {
            this.showError();
            console.error('Articles loading error:', error);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.isLoading = isLoading;
        if (!this.container) return;

        if (isLoading) {
            this.container.innerHTML = `
                <div class="loading text-center py-5 w-100">
                    <div class="spinner"></div>
                    <p class="mt-3 text-muted">Carregando artigos...</p>
                </div>
            `;
        }
    }

    showError() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger fs-5"><i class="bi bi-exclamation-triangle"></i> Erro ao carregar artigos</p>
                <p class="text-muted">Tente novamente mais tarde</p>
                <button class="btn btn-outline-dark btn-sm mt-3" onclick="articlesManager.init()">
                    <i class="bi bi-arrow-clockwise"></i> Tentar Novamente
                </button>
            </div>
        `;
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

class NavbarEffect {
    static init() {
        const navbar = document.querySelector('.navbar-custom');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// ============================================
// CLICK OUTSIDE MODAL
// ============================================

class ModalManager {
    static init() {
        const navItems = document.querySelectorAll('.nav-link, .navbar-brand');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) {
                        toggler.click();
                    }
                }
            });
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

class ScrollAnimationObserver {
    static init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}

// ============================================
// LAZY LOADING
// ============================================

class LazyLoadManager {
    static init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================

let textAnimator;
let articlesManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize text animation
    textAnimator = new TextAnimator(textAnimationConfig);
    textAnimator.init();

    // Initialize articles
    articlesManager = new ArticlesManager();
    articlesManager.init();

    // Initialize other features
    NavbarEffect.init();
    ModalManager.init();
    ScrollAnimationObserver.init();
    LazyLoadManager.init();
});

// ============================================
// CLEANUP
// ============================================

window.addEventListener('beforeunload', () => {
    if (textAnimator) {
        textAnimator.destroy();
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get element or log warning
 */
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element;
}

/**
 * Add event listener with error handling
 */
function safeAddEventListener(selector, event, callback) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        console.warn(`No elements found for selector "${selector}"`);
        return;
    }
    elements.forEach(element => {
        element.addEventListener(event, callback);
    });
}
