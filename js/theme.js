// Applies the visitor's saved theme before first paint so pages don't flash the wrong theme.
// Loaded synchronously in <head>; js/scripts.js writes the same 'theme' key when the toggle is used.
(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        document.documentElement.dataset.theme = savedTheme;
    }
})();
