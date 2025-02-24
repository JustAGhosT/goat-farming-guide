document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Apply saved theme
    document.documentElement.classList.add(theme);

    // Set initial button icon
    const button = document.querySelector('.theme-toggle');
    button.innerHTML = `<i class="mdi ${theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
    button.onclick = toggleTheme;
});

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'light' : 'dark';

    // Toggle theme class
    html.classList.remove('light', 'dark');
    html.classList.add(currentTheme);

    // Save preference
    localStorage.setItem('theme', currentTheme);

    // Update button icon
    const button = document.querySelector('.theme-toggle');
    button.innerHTML = `<i class="mdi ${currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
}
