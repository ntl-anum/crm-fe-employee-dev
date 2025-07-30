import DashletHeading from "./dashletHeading";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    animation: true,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: "Chart.js Bar Chart"
        }
    }
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: ["121", "550", "300", "800", "1000", "320", "550", '300','730','1100', '430', '200'],
            backgroundColor: "#F5AD97",
            barThickness: 15
        }
    ]
};

const BarChart = () => {
    return (
        <div className="mt-3 bg-white" style={{ boxShadow: " rgba(0, 0, 0, 8%) 0px 3px 8px" }}>
            <DashletHeading heading='Analytics' bgColor='#284E93'/>
            <div className="px-4 mt-5" style={{paddingBottom:"1.9rem"}}>
                <Bar options={options} data={data}/>
            </div>

        </div>
    )
}


export default BarChart;