function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    // Toggle theme
    html.classList.toggle('dark');
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Update button icon
    const button = document.querySelector('.theme-toggle');
    button.innerHTML = `<i class="mdi ${isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Add theme toggle button
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.innerHTML = `<i class="mdi ${document.documentElement.classList.contains('dark') ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
    button.onclick = toggleTheme;
    document.body.appendChild(button);
});
