document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const dictionaryTable = document.getElementById('dictionaryTable');
    const rows = dictionaryTable.getElementsByTagName('tr');
    const noResults = document.getElementById('noResults');
    
    searchInput.addEventListener('keyup', function() {
        const searchText = searchInput.value.toLowerCase();
        let resultsFound = false;
        
        for (let i = 0; i < rows.length; i++) {
            const nameTd = rows[i].getElementsByTagName('td')[0];
            const meaningTd = rows[i].getElementsByTagName('td')[1];
            
            if (nameTd && meaningTd) {
                const nameText = nameTd.textContent || nameTd.innerText;
                const meaningText = meaningTd.textContent || meaningTd.innerText;
                
                if (nameText.toLowerCase().indexOf(searchText) > -1 || 
                    meaningText.toLowerCase().indexOf(searchText) > -1) {
                    rows[i].style.display = "";
                    resultsFound = true;
                    
                    if (searchText.length > 0) {
                        if (!nameTd.hasAttribute('data-original')) {
                            nameTd.setAttribute('data-original', nameText);
                            meaningTd.setAttribute('data-original', meaningText);
                        }
                        
                        const nameOriginal = nameTd.getAttribute('data-original');
                        const meaningOriginal = meaningTd.getAttribute('data-original');
                        
                        nameTd.innerHTML = highlightText(nameOriginal, searchText);
                        meaningTd.innerHTML = highlightText(meaningOriginal, searchText);
                    } else {
                     
                        if (nameTd.hasAttribute('data-original')) {
                            nameTd.innerHTML = nameTd.getAttribute('data-original');
                            meaningTd.innerHTML = meaningTd.getAttribute('data-original');
                        }
                    }
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
        
        if (resultsFound) {
            noResults.style.display = "none";
            dictionaryTable.style.display = "";
        } else {
            noResults.style.display = "";
            dictionaryTable.style.display = "none";
        }
    });
    
    function highlightText(text, searchTerm) {
        if (searchTerm.length === 0) return text;
        
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
});