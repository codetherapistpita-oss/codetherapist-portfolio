// ========== SPLASH SCREEN ==========
const splash = document.getElementById('splash');
if (splash) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 500);
        }, 1200);
    });
}

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const nav = document.querySelector('nav');

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (nav) {
        nav.style.background = theme === 'light' ? 'rgba(245, 245, 247, 0.95)' : 'rgba(13, 13, 15, 0.95)';
    }
}

if (themeToggle) {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });
}

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('cursor-active');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverEls = document.querySelectorAll('a, button, .project-card, .blog-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
} else if (cursorDot && cursorRing) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    document.body.classList.remove('custom-cursor');
}

// ========== TYPING ANIMATION ==========
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
    const words = typedEl.dataset.words?.split(',') || ['Developer'];
    let i = 0, j = 0, dir = 1;
    const speed = 100;

    function type() {
        const word = words[i];
        if (dir === 1) {
            typedEl.textContent = word.slice(0, j + 1);
            j++;
            if (j > word.length) {
                dir = -1;
                setTimeout(type, 1500);
                return;
            }
        } else {
            typedEl.textContent = word.slice(0, j - 1);
            j--;
            if (j === 0) {
                dir = 1;
                i = (i + 1) % words.length;
                setTimeout(type, 400);
                return;
            }
        }
        setTimeout(type, dir === 1 ? speed : 50);
    }
    setTimeout(type, 800);
}

// ========== MOBILE MENU ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========== NAVBAR BACKGROUND ON SCROLL ==========
if (nav) {
    const theme = () => html.getAttribute('data-theme');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = theme() === 'light' ? 'rgba(245, 245, 247, 0.98)' : 'rgba(13, 13, 15, 0.95)';
        } else {
            nav.style.background = theme() === 'light' ? 'rgba(245, 245, 247, 0.9)' : 'rgba(13, 13, 15, 0.8)';
        }
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        e.preventDefault();
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) el.classList.add('visible');
    });
};

window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// ========== SKILL BARS ANIMATION ==========
const skillFills = document.querySelectorAll('.skill-fill');
const animateSkills = () => {
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        const level = fill.dataset.level || 0;
        if (rect.top < window.innerHeight - 80) {
            fill.style.width = level + '%';
            fill.classList.add('animated');
        }
    });
};

window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');
const lightboxTech = document.querySelector('.lightbox-tech');
const lightboxLink = document.querySelector('.lightbox-link');

document.querySelectorAll('[data-lightbox]').forEach(card => {
    const btn = card.querySelector('.project-view-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            lightboxTitle.textContent = card.dataset.title;
            lightboxDesc.textContent = card.dataset.desc;
            lightboxTech.textContent = 'Tech: ' + (card.dataset.tech || '');
            lightboxLink.href = card.dataset.link || '#';
            lightboxLink.style.display = card.dataset.link && card.dataset.link !== '#' ? 'inline-flex' : 'none';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeLightbox());

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const inputs = contactForm.querySelectorAll('input, textarea');
        let valid = true;
        inputs.forEach(inp => {
            inp.classList.remove('error');
            if (inp.required && !inp.value.trim()) {
                inp.classList.add('error');
                valid = false;
            } else if (inp.type === 'email' && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) {
                inp.classList.add('error');
                valid = false;
            }
        });
        if (!valid) e.preventDefault();
    });
}
