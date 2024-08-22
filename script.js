document.getElementById('jsonInput').addEventListener('input', parseJSON);

function parseJSON() {
    const jsonInput = document.getElementById('jsonInput').value;
    const output = document.getElementById('output');
    try {
        const parsedData = JSON.parse(jsonInput);
        output.textContent = JSON.stringify(parsedData, null, 2); // Pretty print JSON
    } catch (error) {
        output.textContent = "Invalid JSON: " + error.message;
    }
}
