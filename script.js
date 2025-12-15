// --- 1. DATA GETTER FUNCTION (The core requirement) ---
async function getData(file) {
    try {
        const response = await fetch(`data/${file}`); 
        if (!response.ok) {
            // Log a specific error if the file isn't found
            throw new Error(`HTTP error! status: ${response.status} - Could not find data/${file}.`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Could not fetch data for chart:", file, error);
        return null; 
    }
}

// --- 2. CHART 1 (Bar Chart) - Fuel Efficiency ---
function createChart1(csvData) {
    const rows = csvData.trim().split('\n').slice(1); 
    const vehicleTypes = rows.map(row => row.split(',')[0].trim());
    const fuelData = rows.map(row => parseFloat(row.split(',')[1].trim()));
    const aggregatedData = vehicleTypes.reduce((acc, type, index) => {
        acc[type] = (acc[type] || 0) + fuelData[index];
        return acc;
    }, {});
    const finalLabels = Object.keys(aggregatedData);
    const finalData = Object.values(aggregatedData);
    const ctx = document.getElementById('fuelEfficiencyChart').getContext('2d');
    
    new Chart(ctx, { type: 'bar',
        data: { labels: finalLabels,
            datasets: [{ label: 'Total Fuel Consumed (Liters)', data: finalData,
                backgroundColor: ['#17a2b8', '#ffc107', '#dc3545'], borderWidth: 1
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });
}

// --- 3. CHART 2 (Radar Chart) - Customer Ratings ---
function createChart2(csvData) {
    const rows = csvData.trim().split('\n').slice(1);
    const labels = rows.map(row => row.split(',')[0].trim());
    const dataPoints = rows.map(row => parseFloat(row.split(',')[1].trim()));
    const ctx = document.getElementById('customerRatingChart').getContext('2d');
    
    new Chart(ctx, { type: 'radar',
        data: { labels: labels,
            datasets: [{ label: 'Average Customer Rating (Out of 5)', data: dataPoints,
                backgroundColor: 'rgba(23, 162, 184, 0.4)', borderColor: '#17a2b8', 
                pointBackgroundColor: '#ffc107', borderWidth: 2
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { r: { suggestedMin: 2.5, suggestedMax: 5 } } }
    });
}

// --- 4. CHART 3 (Line Chart) - Delivery Time Trends ---
function createChart3(csvData) {
    const rows = csvData.trim().split('\n').slice(1);
    const labels = rows.map(row => row.split(',')[0].trim());
    const dataPoints = rows.map(row => parseFloat(row.split(',')[1].trim()));
    const ctx = document.getElementById('deliveryTrendChart').getContext('2d');
    
    new Chart(ctx, { type: 'line',
        data: { labels: labels,
            datasets: [{ label: 'Avg. Delivery Time (Minutes)', data: dataPoints,
                borderColor: '#17a2b8', backgroundColor: 'rgba(23, 162, 184, 0.1)',
                tension: 0.4, fill: true
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false } } }
    });
}

// --- 5. CHART 4 (Pie Chart) - Fleet Composition ---
function createChart4(csvData) {
    const rows = csvData.trim().split('\n').slice(1);
    const labels = rows.map(row => row.split(',')[0].trim());
    const dataPoints = rows.map(row => parseInt(row.split(',')[1].trim()));
    const ctx = document.getElementById('fleetCompositionChart').getContext('2d');
    
    new Chart(ctx, { type: 'pie',
        data: { labels: labels,
            datasets: [{ label: 'Total Vehicles in Fleet', data: dataPoints,
                backgroundColor: ['#17a2b8', '#ffc107', '#dc3545', '#28a745'],
                hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}


// --- 6. CHART 5 (Scatter Plot) - Driver Speed vs Customer Rating (FINAL UNIQUE CHART TYPE) ---
function createChart5(csvData) {
    const rows = csvData.trim().split('\n').slice(1);
    const dataPoints = rows.map(row => {
        const parts = row.split(',');
        return {
            x: parseFloat(parts[0].trim()), // X-axis: Avg Speed
            y: parseFloat(parts[1].trim())  // Y-axis: Customer Rating
        };
    });
    const ctx = document.getElementById('scatterRatingChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Speed vs. Customer Rating',
                data: dataPoints,
                backgroundColor: '#17a2b8',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Average Speed (KPH)' }, min: 60, max: 120 },
                y: { title: { display: true, text: 'Customer Rating (1-5)' }, min: 1.5, max: 5.5 }
            }
        }
    });
}


// --- 7. MAIN EXECUTION: KICKOFF (Calls all five data getters) ---

// 1. Chart 1 (Bar Chart)
getData('fuel_data.csv').then(data => { if (data) { createChart1(data); } });

// 2. Chart 2 (Radar Chart)
getData('rating_data.csv').then(data => { if (data) { createChart2(data); } });

// 3. Chart 3 (Line Chart)
getData('delivery_trend_data.csv').then(data => { if (data) { createChart3(data); } });

// 4. Chart 4 (Pie Chart)
getData('composition_data.csv').then(data => { if (data) { createChart4(data); } });

// 5. Chart 5 (Scatter Plot)
getData('scatter_data.csv').then(data => { if (data) { createChart5(data); } });