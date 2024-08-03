
import React, { useEffect, useState } from 'react';
 
import { Line } from 'react-chartjs-2';  // User chart.js library
 
import axios from 'axios';
 
import { useParams } from 'react-router-dom';
import { Chart, LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);// Register chart


interface HistoricalData { // All the data returned by Financial Modeling Prep when access EOD chart data
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

 
interface StockData {   //Stock Data interface

    symbol: string;
    historical: HistoricalData[];
}

const getVolumeColor = (volume: number, threshold: number = 50000000) => {//green when volume is high and red when low
    return volume > threshold ? 'rgba(0, 255, 0, 0)' : 'rgba(255, 0, 0, 0)';
};

export const TickerGraph = () => {
    const [chartData, setChartData] = useState<any>(null);// Chart data state
    const [error, setError] = useState<string | null>(null);
    const { symbol } = useParams<{ symbol: string }>();// Get symbol from when page is called

    useEffect(() => {
        axios.get<StockData>(`/graph/${symbol}`)// Used axios to get graph data using params....
            .then(response => {
                const stockData = response.data.historical.reverse();// In reverse because FMP send data from latest to oldest

                if (stockData.length === 0) {
                    setError('No data available for this symbol.')
                    setChartData(null);
                } else {
                    const dates = stockData.map(item => item.date);
                    const closePrices = stockData.map(item => item.close);
                    const volumes = stockData.map(item => item.volume);

                    setChartData({// Default chart showed by chart.js
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
export default TickerGraph;