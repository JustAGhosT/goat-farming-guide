interface PrevNextPages {
  prev: string | null;
  next: string | null;
}

document.addEventListener('DOMContentLoaded', (): void => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Apply saved theme
    document.documentElement.classList.add(theme);

    // Set initial button icon
    const button = document.querySelector('.theme-toggle') as HTMLElement;
    if (button) {
        button.innerHTML = `<i class="mdi ${theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
        button.onclick = toggleTheme;
    }

    // Load header and footer
    fetch('/shared/header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
            }
        });

    fetch('/shared/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        });

    // Add event listeners to the "Previous" and "Next" buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const prevPage = getPrevNextPageUrls().prev;
            if (prevPage) {
                window.location.href = prevPage;
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const nextPage = getPrevNextPageUrls().next;
            if (nextPage) {
                window.location.href = nextPage;
            }
        });
    }
});

function toggleTheme(): void {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'light' : 'dark';

    // Toggle theme class
    html.classList.remove('light', 'dark');
    html.classList.add(currentTheme);

    // Save preference
    localStorage.setItem('theme', currentTheme);

    // Update button icon
    const button = document.querySelector('.theme-toggle') as HTMLElement;
    if (button) {
        button.innerHTML = `<i class="mdi ${currentTheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'}"></i>`;
    }
}

function getPrevNextPageUrls(): PrevNextPages {
    const pages: string[] = [
        'investor.html',
        'management.html',
        'milking-stand.html',
        'milking.html',
        'schedule.html'
    ];

    const currentPage = window.location.pathname.split('/').pop() || '';
    const currentIndex = pages.indexOf(currentPage);

    const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

    return { prev: prevPage, next: nextPage };
}