// Topic filter for the writing index on articles.html.
(() => {
    /** @type {HTMLElement[]} */
    const entries = Array.from(document.querySelectorAll('#article-list .entry'));
    /** @type {HTMLButtonElement[]} */
    const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
    if (entries.length === 0 || chips.length === 0) {
        throw new Error('articles.js expects #article-list .entry elements and .chip[data-filter] buttons');
    }

    /**
     * @param {string} category
     * @param {string} filter
     * @returns {boolean}
     */
    const matchesFilter = (category, filter) => filter === 'all' || category === filter;

    /**
     * Shows entries in the chosen topic.
     * @param {string} filter
     * @returns {void}
     */
    const applyFilter = (filter) => {
        entries.forEach((entry) => {
            entry.hidden = !matchesFilter(entry.dataset.category ?? '', filter);
        });
    };

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)));
            applyFilter(chip.dataset.filter ?? 'all');
        });
    });
})();
