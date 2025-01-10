const button = document.getElementById('btn'); 

function handleFileUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const rows = pasrseCSV(e.target.result) 
        populateTable(rows);
        toggleUI();
    };
    reader.readAsText(file);
}

function pasrseCSV(content) {
    return content.split('\n').map(row => row.split(','))
}

function populateTable(rows) {
    const table = document.getElementById('table');
    table.innerHTML = '';

    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        })
        table.appendChild(tr); 
    });


}

function toggleUI(){
    csv.style.display = '';
    button.style.display = 'block';  
};


function downloadCSV() {
    const rows = document.querySelectorAll('#table tr')
    let csvContent = '';

    rows.forEach(row => {
        const cells = document.querySelectorAll('td')
        let rowContent = Array.from(cells)
            .map(cell => cell.textContent)
            .join(',');

            csvContent += rowContent + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'export_data.csv';
    a.click();

    URL.revokeObjectURL(url);

}


csv.addEventListener('change', handleFileUpload);
button.addEventListener('click', downloadCSV);