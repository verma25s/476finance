// import React and attributes for side effects and state management
import React, { useEffect, useState } from 'react';
// import Line chart component from react-chartjs-2
import { Line } from 'react-chartjs-2';
// import axios for making HTTP requests
import axios from 'axios';
// import useParams hook for accessing URL parameters
import { useParams } from 'react-router-dom';
// import Chart.js components
import { Chart, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// register Chart.js components to be used
Chart.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// define TypeScript interface for historical stock data
interface HistoricalData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjClose: number;
    volume: number;
    unadjustedVolume: number;
    change: number;
    changePercent: number;
    vwap: number;
    label: string;
    changeOverTime: number;
}

// define TypeScript interface for stock data
interface StockData {
    symbol: string;
    historical: HistoricalData[];
}

// function to determine color based on volume
const getVolumeColor = (volume: number, threshold: number = 50000000) => {
    return volume > threshold ? 'rgba(0, 128, 0, 0.8)' : 'rgba(255, 0, 0, 0.8)';
};

// define the TickerGraph component as a functional React component
export const TickerGraph: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { symbol } = useParams<{ symbol: string }>();

    useEffect(() => {
        axios.get<StockData>(`/graph/${symbol}`)
            .then(response => {
                const stockData = response.data.historical;

                if (stockData.length === 0) {
                    setError('No data available for this symbol.');
                    setChartData(null);
                } else {
                    const dates = stockData.map(item => item.date);
                    const closePrices = stockData.map(item => item.close);
                    const volumes = stockData.map(item => item.volume);

                    setChartData({
                        labels: dates,
                        datasets: [
                            {
                                label: 'Closing Price',
                                data: closePrices,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                yAxisID: 'y',
                            },
                            {
                                label: 'Volume',
                                data: volumes,
                                type: 'bar',
                                backgroundColor: volumes.map(volume => getVolumeColor(volume)),
                                borderColor: volumes.map(volume => getVolumeColor(volume)),
                                borderWidth: 2, 
                                yAxisID: 'y1',
                            },
                        ],
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError('Error fetching graph.');
                setChartData(null);
            });
    }, [symbol]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Line 
                data={chartData}
                options={{
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Price',
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString(); 
                                }
                            },
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Volume',
                            },
                            grid: {
                                drawOnChartArea: false,
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toLocaleString();
                                }
                            },
                        },
                    },
                }}
            />
        </div>
    );
};
// export the TickerGraph component as default
export default TickerGraph;