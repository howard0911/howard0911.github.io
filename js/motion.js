// Motion layer (DESIGN.md, Motion): the home headline's entrance, list rules that draw in,
// the home photograph that develops, sections that rise in, the backdrop that leans toward
// the pointer, and the reading-progress line on article pages.
// Each part runs only on pages that have its element. Under prefers-reduced-motion nothing
// runs and every element stays in its final, visible state.
(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Rows after this many share the last delay, so long lists never feel slow.
    const MAX_STAGGERED_ROWS = 8;
    // Longest row animation in css/site.css: 300ms + 8 x 70ms delay + 600ms duration.
    const LIST_SETTLE_MS = 1500;

    /**
     * @param {string} text
     * @returns {string[]} words and the whitespace between them, in order
     */
    const splitKeepingSpaces = (text) => text.split(/(\s+)/).filter((part) => part !== '');

    /** @param {string} part @returns {boolean} */
    const isSpace = (part) => /^\s+$/.test(part);

    /**
     * Wraps each word in a span.w that carries its position as --i.
     * @param {string} text
     * @param {number} firstIndex position of the first word in the whole heading
     * @returns {DocumentFragment}
     */
    const wordFragment = (text, firstIndex) => {
        const fragment = document.createDocumentFragment();
        let index = firstIndex;
        splitKeepingSpaces(text).forEach((part) => {
            if (isSpace(part)) {
                fragment.append(document.createTextNode(part));
                return;
            }
            const word = document.createElement('span');
            word.className = 'w';
            word.style.setProperty('--i', String(index));
            word.textContent = part;
            fragment.append(word);
            index += 1;
        });
        return fragment;
    };

    /**
     * Splits a heading's text and its inline elements (the accent em) into word spans.
     * @param {HTMLElement} heading
     * @returns {number} the number of words
     */
    const splitIntoWords = (heading) => {
        let wordCount = 0;
        Array.from(heading.childNodes).forEach((node) => {
            if (node instanceof Element && node.children.length > 0) {
                throw new Error('motion.js: [data-enter] h1 may hold text and one level of inline elements only');
            }
            const text = node.textContent ?? '';
            const fragment = wordFragment(text, wordCount);
            wordCount += splitKeepingSpaces(text).filter((part) => !isSpace(part)).length;
            if (node instanceof Element) {
                node.replaceChildren(fragment);
            } else {
                node.replaceWith(fragment);
            }
        });
        return wordCount;
    };

    // Home headline: enters once on load.
    const intro = document.querySelector('[data-enter]');
    if (intro instanceof HTMLElement) {
        const heading = intro.querySelector('h1');
        if (heading === null) throw new Error('motion.js: [data-enter] needs an h1');
        intro.style.setProperty('--n', String(splitIntoWords(heading)));
        intro.classList.add('is-entering');
    }

    // Lists and the home photograph: revealed once, the first time they scroll into view.
    const revealObserver = new IntersectionObserver((entries) => {
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
            const target = entry.target;
            target.classList.add('is-in');
            revealObserver.unobserve(target);
            if (target.classList.contains('draw-list')) {
                window.setTimeout(() => target.classList.add('is-settled'), LIST_SETTLE_MS);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.index-list').forEach((list) => {
        list.querySelectorAll(':scope > .entry').forEach((row, index) => {
            if (row instanceof HTMLElement) row.style.setProperty('--i', String(Math.min(index, MAX_STAGGERED_ROWS)));
        });
        list.classList.add('draw-list');
        revealObserver.observe(list);
    });

    const homePhoto = document.querySelector('.home-photo');
    if (homePhoto !== null) {
        homePhoto.classList.add('is-developing');
        revealObserver.observe(homePhoto);
    }

    // Page furniture rises in once, the first time it scrolls into view. Album covers and
    // contact cards in the same grid share a stagger.
    const REVEAL_SELECTOR = '.page-head .container > *, .section-head, .tl-item, .edu, .contact-card, .album, .prose h2';
    document.querySelectorAll(REVEAL_SELECTOR).forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        const siblings = Array.from(item.parentElement?.children ?? []).filter((sibling) => sibling.matches(REVEAL_SELECTOR));
        item.style.setProperty('--i', String(Math.min(siblings.indexOf(item), MAX_STAGGERED_ROWS)));
        item.classList.add('reveal');
        revealObserver.observe(item);
    });

    // The backdrop leans toward the pointer: --mx and --my run from -1 to 1 across the window,
    // written at most once per frame. Touch screens have no hover, so they skip it.
    if (window.matchMedia('(hover: hover)').matches) {
        let pointerFramePending = false;
        let lastX = 0;
        let lastY = 0;
        window.addEventListener('pointermove', (event) => {
            lastX = (event.clientX / window.innerWidth) * 2 - 1;
            lastY = (event.clientY / window.innerHeight) * 2 - 1;
            if (pointerFramePending) return;
            pointerFramePending = true;
            window.requestAnimationFrame(() => {
                pointerFramePending = false;
                document.documentElement.style.setProperty('--mx', lastX.toFixed(3));
                document.documentElement.style.setProperty('--my', lastY.toFixed(3));
            });
        }, { passive: true });
    }

    // Article pages: a progress line under the nav, updated at most once per frame.
    if (document.querySelector('.post-layout') !== null) {
        const bar = document.createElement('div');
        bar.className = 'read-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.append(bar);

        /** @returns {number} share of the page scrolled, 0 to 1 */
        const scrolledShare = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            return scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
        };

        let framePending = false;
        const scheduleUpdate = () => {
            if (framePending) return;
            framePending = true;
            window.requestAnimationFrame(() => {
                framePending = false;
                bar.style.transform = `scaleX(${scrolledShare()})`;
            });
        };
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate, { passive: true });
        scheduleUpdate();
    }
})();
