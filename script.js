document.addEventListener('DOMContentLoaded', function() {
    // Dictionary data
    const dictionaryData = [
        { name: "adrian", meaning: "chaotic" },
        { name: "AJ", meaning: "awesome" },
        { name: "Aiden", meaning: "grumpy" },
        { name: "Aiden", meaning: "Something mid like not kevin but not owen just in the middle" },
        { name: "albert", meaning: "corny" },
        { name: "Alex", meaning: "Lady Magnet" },
        { name: "anton", meaning: "will not sybau" },
        { name: "atp", meaning: "at this point" },
        { name: "atp", meaning: "at this point" },
        { name: "Bartholomew", meaning: "stinky" },
        { name: "Blerg", meaning: "Is so" },
        { name: "brogan", meaning: "your bro" },
        { name: "calc", meaning: "calculator" },
        { name: "charlie", meaning: "cute" },
        { name: "cl", meaning: "cant lie" },
        { name: "coems", meaning: "super peak" },
        { name: "Daquavious", meaning: "illegal" },
        { name: "david", meaning: "ragebait / peak" },
        { name: "Dr", meaning: "Druski" },
        { name: "eric", meaning: "mean" },
        { name: "farg", meaning: "looking for attention" },
        { name: "fort", meaning: "nite" },
        { name: "garry", meaning: "ancient" },
        { name: "gerald", meaning: "old" },
        { name: "Giovanni", meaning: "anything that looks mid but is actually tuff" },
        { name: "glerkin", meaning: "annoying" },
        { name: "greg", meaning: "acting silly" },
        { name: "gurt", meaning: "yo" },
        { name: "gurt", meaning: "smart but dangerous" },
        { name: "harry", meaning: "scary" },
        { name: "hawk", meaning: "2 uhh" },
        { name: "I", meaning: "i" },
        { name: "icl", meaning: "i cant lie" },
        { name: "ikia(...)", meaning: "imma keep it a (...)" },
        { name: "Ikhtggbihtpiwh", meaning: "I know how the game goes because I have to play it with humans" },
        { name: "jacob", meaning: "huge" },
        { name: "james", meaning: "mid" },
        { name: "jayden", meaning: "spectacular" },
        { name: "jeremy", meaning: "smells bad" },
        { name: "joel", meaning: "good" },
        { name: "john", meaning: "okay ig" },
        { name: "jonathan", meaning: "something bouncy" },
        { name: "joseph", meaning: "chopped" },
        { name: "josh", meaning: "slow" },
        { name: "K´", meaning: "not(...)" },
        { name: "karen", meaning: "cringy" },
        { name: "kevin", meaning: "bad" },
        { name: "landon", meaning: "horrendous" },
        { name: "lebron", meaning: "goated" },
        { name: "leo", meaning: "crazy / insane" },
        { name: "liam", meaning: "sad" },
        { name: "michael", meaning: "boring" },
        { name: "noah", meaning: "evil" },
        { name: "ok", meaning: "okay" },
        { name: "ong", meaning: "on gurt" },
        { name: "owen", meaning: "tuff" },
        { name: "Part", meaning: "makes you pmo" },
        { name: "peter", meaning: "rude" },
        { name: "phillip", meaning: "interesting" },
        { name: "pmo", meaning: "pisses me off" },
        { name: "R", meaning: "unemployed" },
        { name: "Rico", meaning: "really hot" },
        { name: "samuel", meaning: "real" },
        { name: "scott", meaning: "difficult" },
        { name: "sham", meaning: "kinda cute" },
        { name: "Spider", meaning: "Man" },
        { name: "sterling", meaning: "unknowingly dead" },
        { name: "sybau", meaning: "be quiet" },
        { name: "sygau", meaning: "shut your gurt ahh up" },
        { name: "ts", meaning: "this shit" },
        { name: "zach", meaning: "funny" },
        { name: "!", meaning: "exclamation mark" },
        { name: ",", meaning: "comma" }

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
