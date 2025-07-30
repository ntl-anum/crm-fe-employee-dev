import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DashletHeading from '../Dashboard/dashletHeading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const lineChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [{
    label: ['Pre-order sale'],
    data: [550, 620, 530, 610, 540, 770, 700, 800],
    borderColor: "#47bd2a",
    fill: true,
    borderWidth: 4,
    tension: 0.3,
  }, {
    label: ['Order sale'],
    data: [750, 800, 670, 1000, 790, 1020, 800, 920],
    borderColor: "#5b46c0",
    fill: true,
    borderWidth: 4,
    tension: 0.3,
  },]
}
const options = {
  animation: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function Linechart() {
  return (
    <div className="mt-3 bg-white" style={{ boxShadow: " rgba(0, 0, 0, 8%) 0px 3px 8px" }}>
      <DashletHeading heading='Statistics' bgColor='#284E93' />
      <div className="px-4 mt-5" style={{ paddingBottom: "3.4rem" }}>
        <Line options={options} data={lineChart} />
      </div>
    </div>
  )



}
