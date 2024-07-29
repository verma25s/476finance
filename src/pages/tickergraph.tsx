import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
Chart.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

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

interface StockData {
    symbol: string;
    historical: HistoricalData[];
}

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
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                yAxisID: 'y1',
                            },
                        ],
                    });
                    setError(null); // Clear any previous error
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
                                    return value.toLocaleString(); // Format numbers with thousands separators
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
                        },
                    },
                }}
            />
        </div>
    );
};

export default TickerGraph;