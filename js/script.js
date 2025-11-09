const API_BASE_URL = 'https://api.github.com';
const API_RATE_LIMIT_THRESHOLD = 10;

async function fetchAllRepositories(username, page = 1, allRepos = []) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${username}/repos?type=public&per_page=100&page=${page}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        
        const repos = await response.json();
        const combinedRepos = [...allRepos, ...repos];
        
        if (repos.length === 100) {
            return fetchAllRepositories(username, page + 1, combinedRepos);
        } else {
            return combinedRepos;
        }
    } catch (error) {
        throw error;
    }
}

async function checkApiRateLimit() {
    try {
        const response = await fetch(`${API_BASE_URL}/rate_limit`);
        if (!response.ok) {
            return { remaining: Infinity };
        }
        
        const rateData = await response.json();
        const remaining = rateData.resources.core.remaining;
        const resetTime = new Date(rateData.resources.core.reset * 1000);
        
        return { remaining, resetTime };
    } catch (error) {
        console.error('Error checking rate limit:', error);
        return { remaining: Infinity };
    }
}

async function checkRepositories() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        showError(translations[document.documentElement.lang || 'en'].noUsername);
        return;
    }
    
    const repoHeaderEl = document.getElementById('repoHeader');
    const repoListEl = document.getElementById('repoList');
    const loadingEl = document.getElementById('loading');
    const clearButton = document.getElementById('clear-button');
    const searchContainer = document.getElementById('searchContainer');
    const downloadAllButton = document.getElementById('download-all-button');
    const errorContainer = document.getElementById('error-container');
    
    repoHeaderEl.innerHTML = '';
    repoListEl.innerHTML = '';
    errorContainer.style.display = 'none';
    loadingEl.style.display = 'flex';
    searchContainer.style.display = 'none';
    downloadAllButton.style.display = 'none';
    
    try {
        const { remaining, resetTime } = await checkApiRateLimit();
        
        if (remaining <= API_RATE_LIMIT_THRESHOLD) {
            throw new Error(translations[document.documentElement.lang || 'en'].rateLimit.replace('{remaining}', remaining).replace('{time}', resetTime.toLocaleTimeString()));
        }
        
        const userResponse = await fetch(`${API_BASE_URL}/users/${username}`);
        
        if (!userResponse.ok) {
            if (userResponse.status === 404) {
                throw new Error(translations[document.documentElement.lang || 'en'].userNotFound);
            } else {
                const userData = await userResponse.json().catch(() => null);
                throw new Error(userData?.message || `Error ${userResponse.status}: ${response.statusText}`);
            }
        }
        
        const userData = await userResponse.json();
        
        updateUserAvatar(userData.avatar_url);
        
        const repos = await fetchAllRepositories(username);
        
        loadingEl.style.display = 'none';
        
        if (repos.length === 0) {
            repoHeaderEl.innerHTML = `
                <h3>${translations[document.documentElement.lang || 'en'].reposFor} ${username}</h3>
                <span class="repo-count">0</span>
            `;
            repoListEl.innerHTML = `<p class="terminal-intro">${translations[document.documentElement.lang || 'en'].noRepos}</p>`;
            clearButton.style.display = 'flex';
            return;
        }
        
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        repoHeaderEl.innerHTML = `
            <h3>${translations[document.documentElement.lang || 'en'].reposFor} ${username}</h3>
            <span class="repo-count">${repos.length}</span>
        `;
        
        setupSearchField(repos.length);
        
        displayRepositories(repos, username); // پاس دادن username
        
        downloadAllButton.style.display = 'flex';
        clearButton.style.display = 'flex';
        
    } catch (error) {
        loadingEl.style.display = 'none';
        showError(error.message);
    }
}

function updateUserAvatar(avatarUrl) {
    const defaultAvatar = document.getElementById('default-avatar');
    const profileAvatar = document.getElementById('profile-avatar');
    
    if (avatarUrl) {
        defaultAvatar.style.display = 'none';
        profileAvatar.src = avatarUrl;
        profileAvatar.style.display = 'block';
    } else {
        defaultAvatar.style.display = 'block';
        profileAvatar.style.display = 'none';
        profileAvatar.src = '';
    }
}

// تابع جدید: نرمال‌سازی و تشخیص owner/repo
function parseRepoFromInput(input) {
    if (!input) return null;
    
    let cleaned = input.trim();
    
    cleaned = cleaned.replace(/^https?:\/\//i, '');
    cleaned = cleaned.replace(/^www\./i, '');
    cleaned = cleaned.replace(/^github\.com[/]?/i, '');
    cleaned = cleaned.replace(/\/+$/, '');
    
    if (cleaned.includes('/')) {
        const parts = cleaned.split('/').filter(p => p);
        if (parts.length >= 2) {
            return {
                owner: parts[0].toLowerCase(),
                repo: parts[1].toLowerCase(),
                full: `${parts[0]}/${parts[1]}`
            };
        }
    }
    
    return {
        owner: null,
        repo: cleaned.toLowerCase(),
        full: cleaned
    };
}

function setupSearchField(repoCount) {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    
    searchContainer.style.display = 'block';
    searchInput.value = '';
    searchInput.placeholder = translations[document.documentElement.lang || 'en'].searchPlaceholder;
    
    let timeoutId;
    searchInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            const searchTerm = this.value;
            filterRepositories(searchTerm);
        }, 300);
    });
}

function filterRepositories(searchTerm) {
    const repoItems = document.querySelectorAll('.repo-item');
    let visibleCount = 0;
    let foundExactMatch = false;
    let exactMatchElement = null;

    const parsed = parseRepoFromInput(searchTerm);
    
    repoItems.forEach(item => {
        const repoName = item.querySelector('.repo-name-container').textContent.toLowerCase();
        const ownerName = item.dataset.owner?.toLowerCase() || '';
        const repoDesc = item.querySelector('.repo-description')?.textContent.toLowerCase() || '';
        const repoLang = item.querySelector('.repo-language')?.textContent.toLowerCase() || '';
        const fullName = `${ownerName}/${repoName}`;

        item.classList.remove('highlight-repo');

        let matches = false;

        // جستجوی دقیق owner/repo
        if (parsed.owner && parsed.repo) {
            if (ownerName === parsed.owner && repoName === parsed.repo) {
                matches = true;
                foundExactMatch = true;
                exactMatchElement = item;
            }
        } else if (!parsed.owner && repoName === parsed.repo) {
            // فقط نام ریپو
            matches = true;
            foundExactMatch = true;
            exactMatchElement = item;
        } else {
            // جستجوی معمولی
            const term = searchTerm.toLowerCase();
            if (repoName.includes(term) || 
                fullName.includes(term) ||
                repoDesc.includes(term) || 
                repoLang.includes(term) || 
                ownerName.includes(term)) {
                matches = true;
            }
        }

        if (matches) {
            item.style.display = 'flex';
            visibleCount++;
            if (foundExactMatch && item === exactMatchElement) {
                item.classList.add('highlight-repo');
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            item.style.display = 'none';
        }
    });

    // حذف هایلایت بعد 2 ثانیه
    if (exactMatchElement) {
        setTimeout(() => {
            exactMatchElement.classList.remove('highlight-repo');
        }, 2000);
    }

    // پیام نتیجه
    const noResultsMessage = document.getElementById('no-results-message');
    if (visibleCount === 0) {
        const msg = parsed.owner 
            ? translations[document.documentElement.lang || 'en'].repoNotFound.replace('{repo}', parsed.full)
            : translations[document.documentElement.lang || 'en'].noResults.replace('{term}', searchTerm || 'جستجو');
        
        if (!noResultsMessage) {
            const message = document.createElement('p');
            message.id = 'no-results-message';
            message.className = 'terminal-intro';
            message.innerHTML = msg;
            document.getElementById('repoList').appendChild(message);
        } else {
            noResultsMessage.innerHTML = msg;
            noResultsMessage.style.display = 'block';
        }
    } else if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }
}

function displayRepositories(repos, username) {
    const repoListEl = document.getElementById('repoList');
    const lang = document.documentElement.lang || 'en';
    
    let repoHtml = '<div class="repo-list-container">';
    
    repos.forEach(repo => {
        const repoName = repo.name;
        const repoUrl = repo.html_url;
        const repoDescription = repo.description || translations[lang].noDescription;
        const defaultBranch = repo.default_branch || 'main';
        const zipUrl = `${repoUrl}/archive/refs/heads/${defaultBranch}.zip`;
        const updateDate = new Date(repo.updated_at).toLocaleDateString();
        const createDate = new Date(repo.created_at).toLocaleDateString();
        const stars = repo.stargazers_count;
        const forks = repo.forks_count;
        const language = repo.language || translations[lang].notSpecified;
        
        repoHtml += `
            <div class="repo-item" data-owner="${username}">
                <div>
                    <div class="repo-name-container" title="${repoName}">${repoName}</div>
                    <div class="repo-description" title="${repoDescription}">${repoDescription}</div>
                </div>
                <div class="repo-info">
                    <div class="repo-dates-langs">
                        <span class="repo-date">${translations[lang].created}: ${createDate} | ${translations[lang].updated}: ${updateDate}</span>
                        <span class="repo-language"><i class="fas fa-code"></i> ${language}</span>
                    </div>
                    <div class="repo-stats">
                        <span title="${stars} stars"><i class="fas fa-star"></i> ${stars}</span>
                        <span title="${forks} forks"><i class="fas fa-code-branch"></i> ${forks}</span>
                    </div>
                    <div class="repo-actions">
                        <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="glow-button secondary" title="View repository">
                            <i class="fas fa-code"></i>
                        </a>
                        <a href="${zipUrl}" class="glow-button secondary" title="Download ZIP">
                            <i class="fas fa-download"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    repoHtml += '</div>';
    repoListEl.innerHTML = repoHtml;
}

function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    errorContainer.style.display = 'block';
}

function resetEverything() {
    const elements = {
        username: document.getElementById('username'),
        repoHeader: document.getElementById('repoHeader'),
        repoList: document.getElementById('repoList'),
        defaultAvatar: document.getElementById('default-avatar'),
        profileAvatar: document.getElementById('profile-avatar'),
        clearButton: document.getElementById('clear-button'),
        searchContainer: document.getElementById('searchContainer'),
        downloadAllButton: document.getElementById('download-all-button'),
        errorContainer: document.getElementById('error-container')
    };
    
    elements.username.value = '';
    elements.repoHeader.innerHTML = '';
    elements.repoList.innerHTML = '';
    elements.searchContainer.style.display = 'none';
    elements.defaultAvatar.style.display = 'block';
    elements.profileAvatar.style.display = 'none';
    elements.profileAvatar.src = '';
    elements.clearButton.style.display = 'none';
    elements.downloadAllButton.style.display = 'none';
    elements.errorContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('username');
    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun button-icon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun button-icon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon button-icon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    languageToggle.addEventListener('click', function() {
        const newLang = document.documentElement.lang === 'fa' ? 'en' : 'fa';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    });
    
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkRepositories();
        }
    });
    
    inputField.addEventListener('input', function() {
        document.getElementById('error-container').style.display = 'none';
    });
});
