// Site-wide behavior: theme toggle, mobile menu and nav state.
// The nav arrives via js/layout.js, so wiring runs again on the 'partials:loaded' event.
(() => {
    // Same key js/theme.js reads before first paint.
    const THEME_STORAGE_KEY = 'theme';
    /** @type {ReadonlyArray<string>} */
    const NAV_PAGES = Object.freeze(['index.html', 'about.html', 'articles.html', 'albums.html', 'contact.html']);

    /**
     * @param {string} pathname
     * @returns {string}
     */
    const pageFileName = (pathname) => {
        const lastSegment = pathname.split('/').pop();
        return lastSegment === undefined || lastSegment === '' ? 'index.html' : lastSegment;
    };

    /**
     * Article pages are not in the nav, so they highlight "Articles".
     * @param {string} fileName
     * @returns {string}
     */
    const activeNavHref = (fileName) => (NAV_PAGES.includes(fileName) ? fileName : 'articles.html');

    /** @returns {'light' | 'dark'} */
    const currentTheme = () => {
        const explicitTheme = document.documentElement.dataset.theme;
        if (explicitTheme === 'light' || explicitTheme === 'dark') {
            return explicitTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    /**
     * @param {'light' | 'dark'} theme
     * @returns {'light' | 'dark'}
     */
    const oppositeTheme = (theme) => (theme === 'dark' ? 'light' : 'dark');

    /**
     * @param {string} id
     * @returns {HTMLElement}
     */
    const requireElement = (id) => {
        const element = document.getElementById(id);
        if (element === null) {
            throw new Error(`Nav partial is missing #${id}`);
        }
        return element;
    };

    let navInitialized = false;

    const initNav = () => {
        if (navInitialized) return;
        const nav = document.getElementById('site-nav');
        // Partial not injected yet; the 'partials:loaded' listener calls this again.
        if (nav === null) return;
        navInitialized = true;

        const activeHref = activeNavHref(pageFileName(window.location.pathname));
        nav.querySelectorAll('.nav-links a').forEach((link) => {
            if (link.getAttribute('href') === activeHref) {
                link.setAttribute('aria-current', 'page');
            }
        });

        requireElement('theme-toggle').addEventListener('click', () => {
            const nextTheme = oppositeTheme(currentTheme());
            document.documentElement.dataset.theme = nextTheme;
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        });

        const menuToggle = requireElement('menu-toggle');
        /** @param {boolean} isOpen */
        const setMenuOpen = (isOpen) => {
            nav.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        };
        menuToggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('is-open')));
        requireElement('nav-links').querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        const syncScrolledState = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
        window.addEventListener('scroll', syncScrolledState, { passive: true });
        syncScrolledState();
    };

    initNav();
    document.addEventListener('partials:loaded', initNav);
})();
