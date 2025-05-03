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
        footer: "Designed by Argh94"
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
        footer: "طراحی شده توسط Argh94"
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
