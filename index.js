import Chart from 'chart.js/auto'

const minerals = ["Calcium", "Iron", "Magnesium", "Zinc", "Potassium"];
import Data from './dados'
async function loadAndCreateChart() {

        const groupedData = {};
        Data.forEach(item => {
            const category = item["Category Name"];
            if (!groupedData[category]) {
                groupedData[category] = minerals.map(() => 0);
            }
            minerals.forEach((mineral, index) => {
                groupedData[category][index] += parseFloat(item[mineral].replace(',', '.')) || 0;
            });
        });

        const colors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ];

        const datasets = Object.keys(groupedData).map((category, index) => ({
            label: category,
            data: groupedData[category],
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length].replace('0.2', '1'),
            borderWidth: 2
        }));

        new Chart(
            document.getElementById('grafico'),
            {
                type: 'radar',
                data: {
                    labels: minerals,
                    datasets: datasets
                },
                options: {
                    scales: {
                        min: 0,    
                        max: 1,    
                        beginAtZero: true
                    }
                }
            }
        );
}

loadAndCreateChart();
