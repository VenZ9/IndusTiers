/* ============================================================
   IndusGames — Site Scripts
   ============================================================ */

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('indusgames-theme', next);
    updateThemeIcons(next);
}

function updateThemeIcons(theme) {
    const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    const icon = document.getElementById('themeIcon');
    const iconMobile = document.getElementById('themeIconMobile');
    if (icon) icon.className = iconClass;
    if (iconMobile) iconMobile.className = iconClass;
}

document.addEventListener('DOMContentLoaded', function () {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcons(theme);
});

/* ============================================================
   NAVBAR & MENU
   ============================================================ */
function toggleMenu(event) {
    if (event) event.preventDefault();
    document.getElementById('menuDropdown').classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('menuDropdown');
    const menuBtn = document.querySelector('.navbar-cta');
    const toggleBtn = document.querySelector('.menu-toggle');

    if (
        !dropdown.contains(event.target) &&
        !menuBtn.contains(event.target) &&
        (toggleBtn && !toggleBtn.contains(event.target))
    ) {
        dropdown.classList.remove('active');
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    navbar.style.boxShadow =
        window.scrollY > 50
            ? '0 4px 20px rgba(0, 0, 0, 0.1)'
            : '0 2px 10px rgba(0, 0, 0, 0.05)';
});

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */
function showHome(event) {
    if (event) event.preventDefault();
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('rulesPage').classList.remove('active');
    document.getElementById('menuDropdown').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showRules(event) {
    if (event) event.preventDefault();
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('rulesPage').classList.add('active');
    document.getElementById('menuDropdown').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   COPY IP
   ============================================================ */
function copyIP(text, event) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('copied-feedback');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied-feedback');
            }, 2000);
        })
        .catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
