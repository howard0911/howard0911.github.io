// Category filter for the article grid on articles.html.
(() => {
    /** @type {HTMLElement[]} */
    const cards = Array.from(document.querySelectorAll('#article-cards .card'));
    /** @type {HTMLButtonElement[]} */
    const chips = Array.from(document.querySelectorAll('.chip[data-filter]'));
    if (cards.length === 0 || chips.length === 0) {
        throw new Error('articles.js expects #article-cards .card elements and .chip[data-filter] buttons');
    }

    /**
     * @param {string} category
     * @param {string} filter
     * @returns {boolean}
     */
    const matchesFilter = (category, filter) => filter === 'all' || category === filter;

    /**
     * Shows cards in the chosen category and widens the first visible one into the featured card.
     * @param {string} filter
     * @returns {void}
     */
    const applyFilter = (filter) => {
        cards.forEach((card) => {
            card.hidden = !matchesFilter(card.dataset.category ?? '', filter);
        });
        const firstVisible = cards.find((card) => !card.hidden);
        cards.forEach((card) => card.classList.toggle('is-featured', card === firstVisible));
    };

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            chips.forEach((other) => other.setAttribute('aria-pressed', String(other === chip)));
            applyFilter(chip.dataset.filter ?? 'all');
        });
    });
})();
