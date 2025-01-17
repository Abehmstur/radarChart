import Chart from 'chart.js/auto'

const nutrientes = ["Saturated Fat","Monounsaturated Fat","Polyunsaturated fat","Sodium","Fiber"];
import Data from './dados copy'
async function criarGrafico() {

        const groupedData = {};
        Data.forEach(item => {
            const category = item["Category Name"];
            if (!groupedData[category]) {
                groupedData[category] = nutrientes.map(() => 0);
            }
            nutrientes.forEach((nutriente, index) => {
                groupedData[category][index] += parseFloat(item[nutriente].replace(',', '.')) || 0;
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
                    labels: nutrientes,
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

criarGrafico();
