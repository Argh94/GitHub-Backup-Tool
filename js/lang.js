const translations = {
    en: {
        title: "GitHub Public Repository Backup Tool",
        intro: "Enter a GitHub username to list and backup public repositories.",
        placeholder: "Enter GitHub username",
        checkButton: "Check Public Repositories",
        downloadButton: "Download All Repositories",
        clearButton: "Clear",
        searchPlaceholder: "Search repositories...",
        noRepos: "No public repositories found.",
        reposFor: "Repositories for",
        created: "Created",
        updated: "Updated",
        footer: "Designed by Argh94",
        noUsername: "Please enter a GitHub username.",
        userNotFound: "User not found. Please check the username and try again.",
        rateLimit: "GitHub API rate limit is low ({remaining} remaining). Try again after {time}.",
        noDescription: "No description available",
        notSpecified: "Not specified",
        noResults: 'No repositories found matching "<span style="color: var(--terminal-blue)">{term}</span>"',
        noReposAvailable: "No repositories available.",
        downloadFailed: "Failed to download any repositories",
        partialDownload: "Some repositories failed to download. Continue with {count} successful downloads?",
        downloadCancelled: "Download cancelled",
        downloading: "Downloading..."
    },
    fa: {
        title: "ابزار بکاپ مخازن عمومی GitHub",
        intro: "نام کاربری GitHub را وارد کنید تا مخازن عمومی نمایش داده و بکاپ شوند.",
        placeholder: "نام کاربری GitHub را وارد کنید",
        checkButton: "بررسی مخازن عمومی",
        downloadButton: "دانلود همه مخازن",
        clearButton: "پاک کردن",
        searchPlaceholder: "جستجو در مخازن...",
        noRepos: "هیچ مخزن عمومی یافت نشد.",
        reposFor: "مخازن برای",
        created: "ایجاد شده",
        updated: "به‌روزرسانی",
        footer: "طراحی شده توسط Argh94",
        noUsername: "لطفاً نام کاربری GitHub را وارد کنید.",
        userNotFound: "کاربر یافت نشد. لطفاً نام کاربری را بررسی کنید و دوباره امتحان کنید.",
        rateLimit: "محدودیت نرخ API GitHub پایین است ({remaining} باقی‌مانده). پس از {time} دوباره امتحان کنید.",
        noDescription: "توضیحی در دسترس نیست",
        notSpecified: "مشخص نشده",
        noResults: 'هیچ مخزنی با عبارت "<span style="color: var(--terminal-blue)">{term}</span>" یافت نشد.',
        noReposAvailable: "هیچ مخزنی در دسترس نیست.",
        downloadFailed: "دانلود هیچ مخزنی موفق نشد.",
        partialDownload: "دانلود برخی مخازن ناموفق بود. آیا با {count} دانلود موفق ادامه می‌دهید؟",
        downloadCancelled: "دانلود لغو شد",
        downloading: "در حال دانلود..."
    }
};

function setLanguage(lang) {
    document.querySelector('.terminal-title').textContent = translations[lang].title;
    document.querySelector('.terminal-intro').textContent = translations[lang].intro;
    document.querySelector('#username').placeholder = translations[lang].placeholder;
    document.querySelector('.glow-button.primary span').textContent = translations[lang].checkButton;
    document.querySelector('.glow-button.download-all span').textContent = translations[lang].downloadButton;
    document.querySelector('.glow-button.warning span').textContent = translations[lang].clearButton;
    document.querySelector('#searchInput').placeholder = translations[lang].searchPlaceholder;
    document.querySelector('.terminal-footer span').innerHTML = translations[lang].footer.replace('Argh94', '<a href="https://github.com/Argh94" target="_blank" rel="noopener">Argh94</a>');
    document.documentElement.lang = lang;
}
