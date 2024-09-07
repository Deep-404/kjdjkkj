document.getElementById('jsonInput').addEventListener('input', parseJSON);

function parseJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    const output = document.getElementById('output');
    try {
        const parsedData = JSON.parse(jsonInput);
        output.innerHTML = createCollapsibleJSON(parsedData);
        attachCollapsibleEvents();  // Attach events after rendering
    } catch (error) {
        output.textContent = "Invalid JSON: " + error.message;
    }
}

function createCollapsibleJSON(data) {
    if (typeof data === 'object' && data !== null) {
        const isArray = Array.isArray(data);
        let html = isArray ? '[' : '{';
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                html += `<div class="json-entry">`;
                
                if (!isArray) {
                    html += `<span class="json-key">"${key}": </span>`;
                }
                
                if (typeof value === 'object' && value !== null) {
                    html += `<span class="collapsible" data-expanded="false" style="cursor: pointer;">${isArray ? '' : key}: ${Array.isArray(value) ? '[...]' : '{...}'}</span>`;
                    html += `<div class="json-value hidden">${createCollapsibleJSON(value)}</div>`;
                } else {
                    html += `<span class="json-value">${JSON.stringify(value)}</span>`;
                }
                
                html += `</div>`;
            }
        }
        
        html += isArray ? ']' : '}';
        return html;
    } else {
        return `<span class="json-value">${JSON.stringify(data)}</span>`;
    }
}

function attachCollapsibleEvents() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            const valueDiv = this.nextElementSibling;
            const isExpanded = this.getAttribute('data-expanded') === 'true';
            
            if (isExpanded) {
                valueDiv.classList.add('hidden');
                this.setAttribute('data-expanded', 'false');
            } else {
                valueDiv.classList.remove('hidden');
                this.setAttribute('data-expanded', 'true');
            }
        });
    });
}

