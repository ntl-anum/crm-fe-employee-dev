import DashletHeading from '../Dashboard/dashletHeading';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Spending', 'Spending', 'Spending', 'Spending', 'Spending', 'Spending'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#B0E6FF',
                '#D0E9FF',
                '#BF9FFF',
                '#CDDBFF',
                'rgba(75, 192, 192, 0.2)',
                '#FFDFF4',
            ],
            borderColor: [
                '#B0E6FF',
                '#D0E9FF',
                '#BF9FFF',
                '#CDDBFF',
                'rgba(75, 192, 192, 0.2)',
                '#FFDFF4',
            ],
            borderWidth: 1,
        },
    ],

};
const options = {
    plugins: {
        legend: {
            position: "right",
            // align: "top",
            display: true,
            labels: { usePointStyle: true },
            padding: '10px'
        },
    }
}
export function Piechart() {
    return (
        <div className="mt-3 bg-white" style={{ boxShadow: " rgba(0, 0, 0, 8%) 0px 3px 8px" }}>
            <DashletHeading heading='Statistics' bgColor='#284E93' />
            <div className="px-5 pb-2" style={{width:'75%', height:'75%'}}>
                < Pie data={data} options={options} />
            </div>
        </div>
    )
}
