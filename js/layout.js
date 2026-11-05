(() => {
    const includeTargets = Array.from(document.querySelectorAll('[data-include]'));
    if (!includeTargets.length) {
        return;
    }

    // Static fallbacks in case fetch() is blocked (e.g., file:// preview). Keep in sync with partials/*.html.
    const fallbacks = {
        'partials/nav.html': `
<header class="site-nav" id="site-nav">
    <div class="container nav-inner">
        <a class="brand" href="index.html"><span class="brand-mark">HP</span>Howard Peng</a>
        <nav class="nav-right" aria-label="Main">
            <ul class="nav-links" id="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="articles.html">Articles</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <button class="icon-btn" id="theme-toggle" type="button" aria-label="Toggle dark mode">
                <svg class="icon i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
                <svg class="icon i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            </button>
            <a class="btn btn-primary btn-sm nav-resume" href="https://drive.google.com/file/d/1zJvW95cWIOTyxUPpb2PKbpsKC1pjfyXc/view?usp=drive_link">Resume</a>
            <button class="icon-btn menu-btn" id="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </button>
        </nav>
    </div>
</header>`.trim(),
        'partials/footer.html': `
<footer class="site-footer">
    <div class="container footer-inner">
        <p>&copy; 2026 Howard Peng &middot; Hosted on GitHub Pages</p>
        <ul class="socials">
            <li><a class="icon-btn" href="https://www.linkedin.com/in/sheng-hau-peng/" aria-label="LinkedIn"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a></li>
            <li><a class="icon-btn" href="https://github.com/howard0911" aria-label="GitHub"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/></svg></a></li>
            <li><a class="icon-btn" href="https://medium.com/@howardpeng911" aria-label="Medium"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg></a></li>
        </ul>
    </div>
</footer>`.trim()
    };

    const loadPartial = async (el) => {
        const path = el.getAttribute('data-include');
        if (!path) return;
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Failed to load partial: ${path}`);
            el.innerHTML = await response.text();
        } catch (err) {
            console.error(err);
            if (fallbacks[path]) {
                el.innerHTML = fallbacks[path];
            }
        }
    };

    Promise.all(includeTargets.map(loadPartial)).then(() => {
        document.dispatchEvent(new Event('partials:loaded'));
    });
})();
