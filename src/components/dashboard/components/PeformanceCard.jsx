import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceChart(){
    const [totals, setTotals] = useState({incoming: 0, outgoing: 0})

  const { transactions } = useSelector((state) => state.transaction);
  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      setTotals({ incoming: 0, outgoing: 0 });
      return; 
    }
  
    const calculatedTotals = transactions.reduce(
      (acc, tx) => {
        const type = tx.type?.toUpperCase();
        
        if (["DEPOSIT", "TRANSFER_IN"].includes(type)) {
          acc.incoming += Number(tx.amount) || 0;
        } else if (["WITHDRAW", "TRANSFER_OUT"].includes(type)) {
          acc.outgoing += Number(tx.amount) || 0;
        }
        
        return acc;
      },
      { incoming: 0, outgoing: 0 }
    );
  
    setTotals(calculatedTotals);
  }, [transactions]);

      const options = {
      scales: {
        y: {
          min: 0,           // Minimum value
          max: 25000,        // Maximum value
          beginAtZero: true // Alternative to min: 0
        },
        x: {
          min: 0,
          max: 50000
        }
      }
    };
    
      const incomespend = {
      labels: ["Incoming", "Outgoing"],
      datasets: [
        {
          label: "Incoming",
          data: [totals.incoming, totals.outgoing],
          backgroundColor: ["#93c5fd", "#053c5e"],
          fill: false,
        },
      ]
    };

    return (
        <>
        <Bar data={incomespend} options={options} style={{ height: "200px" }}/>
        </>
    )
}