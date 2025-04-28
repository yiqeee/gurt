document.addEventListener('DOMContentLoaded', function() {
    // Dictionary data
    const dictionaryData = [
        { name: "kevin", meaning: "bad" },
        { name: "joel", meaning: "good" },
        { name: "james", meaning: "mid" },
        { name: "glerkin", meaning: "annoying" },
        { name: "samuel", meaning: "real" },
        { name: "ikiab", meaning: "imma keep it a buck" },
        { name: "owen", meaning: "tuff" },
        { name: "liam", meaning: "sad" },
        { name: "michael", meaning: "boring" },
        { name: "leo", meaning: "crazy / insane" },
        { name: "lebron", meaning: "goated" },
        { name: "john", meaning: "okay ig" },
        { name: "scott", meaning: "difficult" },
        { name: "noah", meaning: "evil" },
        { name: "anton", meaning: "will not sybau" },
        { name: "sybau", meaning: "be quiet" },
        { name: "josh", meaning: "slow" },
        { name: "joseph", meaning: "chopped" },
        { name: "albert", meaning: "corny" },
        { name: "gerald", meaning: "old" },
        { name: "david", meaning: "ragebait / peak" },
        { name: "charlie", meaning: "cute" },
        { name: "eric", meaning: "mean" },
        { name: "jayden", meaning: "spectacular" },
        { name: "harry", meaning: "scary" },
        { name: "daquavious", meaning: "illegal" },
        { name: "R", meaning: "unemployed" },
        { name: "adrian", meaning: "chaotic" },
        { name: "peter", meaning: "rude" },
        { name: "zach", meaning: "funny" },
        { name: "Dr", meaning: "Druski" },
        { name: "Giovanni", meaning: "anything that looks mid but is actually tuff" },
        { name: "ts", meaning: "this shit" },
        { name: "icl", meaning: "i cant lie" },
        { name: "gurt", meaning: "yo" },
        { name: "cl", meaning: "cant lie" },
        { name: "mark", meaning: "sybau" }
    ];

    // DOM Elements
    const dictionaryList = document.getElementById('dictionaryList');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const resetSearchBtn = document.getElementById('resetSearch');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    const themeToggle = document.getElementById('themeToggle');

    // Initialize the dictionary
    function initDictionary() {
        // Clear the list
        dictionaryList.innerHTML = '';
        
        // Add each entry with a small delay for animation
        dictionaryData.forEach((entry, index) => {
            setTimeout(() => {
                const entryElement = createEntryElement(entry);
                dictionaryList.appendChild(entryElement);
            }, index * 30);
        });
        
        updateResultCount(dictionaryData.length);
    }

    // Create a dictionary entry element
    function createEntryElement(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'entry-name';
        nameDiv.textContent = entry.name;
        nameDiv.setAttribute('data-original', entry.name);
        
        const meaningDiv = document.createElement('div');
        meaningDiv.className = 'entry-meaning';
        meaningDiv.textContent = entry.meaning;
        meaningDiv.setAttribute('data-original', entry.meaning);
        
        entryDiv.appendChild(nameDiv);
        entryDiv.appendChild(meaningDiv);
        
        return entryDiv;
    }

    // Filter the dictionary based on search input
    function filterDictionary(searchText) {
        const searchLower = searchText.trim().toLowerCase();
        let entriesFound = 0;
        
        // Show/hide the clear button
        if (searchLower.length > 0) {
            clearSearchBtn.classList.add('visible');
        } else {
            clearSearchBtn.classList.remove('visible');
        }
        
        // Get all entries and filter them
        const entries = dictionaryList.querySelectorAll('.entry');
        entries.forEach(entry => {
            const nameElement = entry.querySelector('.entry-name');
            const meaningElement = entry.querySelector('.entry-meaning');
            
            const nameText = nameElement.getAttribute('data-original');
            const meaningText = meaningElement.getAttribute('data-original');
            
            if (nameText.toLowerCase().includes(searchLower) || 
                meaningText.toLowerCase().includes(searchLower)) {
                
                entry.style.display = '';
                entriesFound++;
                
                // Highlight matching text
                if (searchLower.length > 0) {
                    nameElement.innerHTML = highlightText(nameText, searchLower);
                    meaningElement.innerHTML = highlightText(meaningText, searchLower);
                } else {
                    nameElement.textContent = nameText;
                    meaningElement.textContent = meaningText;
                }
            } else {
                entry.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (entriesFound === 0 && searchLower.length > 0) {
            noResults.style.display = 'block';
            dictionaryList.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            dictionaryList.style.display = 'block';
        }
        
        updateResultCount(entriesFound);
    }

    // Highlight search text in results
    function highlightText(text, searchTerm) {
        if (!searchTerm) return text;
        
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // Helper function to escape regex special characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Update the result count
    function updateResultCount(count) {
        resultCount.textContent = count;
    }
    
    // Clear search
    function clearSearch() {
        searchInput.value = '';
        filterDictionary('');
        searchInput.focus();
    }
    
    // Toggle dark/light theme
    function toggleTheme() {
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Check for saved theme
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = themeToggle.querySelector('i');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-sun';
        }
    }
    
    // Event Listeners
    searchInput.addEventListener('input', function() {
        filterDictionary(this.value);
    });
    
    clearSearchBtn.addEventListener('click', clearSearch);
    resetSearchBtn.addEventListener('click', clearSearch);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize
    loadSavedTheme();
    initDictionary();
    
    // Add focus to search input on page load
    setTimeout(() => {
        searchInput.focus();
    }, 500);
});
