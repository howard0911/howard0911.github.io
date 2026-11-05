// Builds the "On this page" list from an article's h2 headings and highlights the section in view.
(() => {
    const MIN_HEADINGS = 3;
    const layout = document.querySelector('.post-layout');
    const tocList = document.getElementById('toc-list');
    if (layout === null || tocList === null) {
        throw new Error('toc.js expects .post-layout and #toc-list on the page');
    }

    /** @type {HTMLHeadingElement[]} */
    const headings = Array.from(layout.querySelectorAll('.prose h2'));
    if (headings.length < MIN_HEADINGS) return;

    /**
     * @param {number} index
     * @returns {string}
     */
    const sectionId = (index) => `section-${index + 1}`;

    /**
     * @param {string} text
     * @returns {string}
     */
    const collapseWhitespace = (text) => text.replace(/\s+/g, ' ').trim();

    /** @type {Map<string, HTMLAnchorElement>} */
    const linksById = new Map();
    headings.forEach((heading, index) => {
        if (heading.id === '') heading.id = sectionId(index);
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = collapseWhitespace(heading.textContent ?? '');
        const item = document.createElement('li');
        item.append(link);
        tocList.append(item);
        linksById.set(heading.id, link);
    });
    layout.classList.add('has-toc');

    /**
     * @param {string} activeId
     * @returns {void}
     */
    const setActive = (activeId) => {
        linksById.forEach((link, id) => {
            if (id === activeId) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => setActive(entry.target.id));
    }, { rootMargin: '-80px 0px -70% 0px' });
    headings.forEach((heading) => observer.observe(heading));
})();
