import React, { useState, useEffect } from "react";
import "../styles/css/Grafico.css";
import Chart from "chart.js";
import BuscarVariacao from "./BuscarVariacao";

export default (props) => {
    const { color1, color2, color3, color4 } = props;

    const [myChart, setChart] = useState(false);
    const [chartSwitch, setChartSwitch] = useState(false);

    const lineChart = (Dates, Values) => {
        const ctx = document.getElementById("myChart").getContext("2d");
        const width = window.innerWidth || document.body.clientWidth;
        const gradientStroke = ctx.createLinearGradient(0, 0, width, 0);
        gradientStroke.addColorStop(0, color1);
        gradientStroke.addColorStop(0.3, color2);
        gradientStroke.addColorStop(0.6, color3);
        gradientStroke.addColorStop(1, color4);
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: Dates,
                datasets: [
                    {
                        data: Values,
                        lineTension: 0,
                        label: `${props.label}`,
                        borderColor: gradientStroke,
                        pointBorderColor: gradientStroke,
                        pointBackgroundColor: gradientStroke,
                        pointHoverBackgroundColor: gradientStroke,
                        pointHoverBorderColor: gradientStroke,
                        backgroundColor: gradientStroke,
                        hoverBackgroundColor: "#000",
                        // pointBorderWidth: 8,
                        // pointHoverRadius: 8,
                        pointHoverBorderWidth: 1,
                        pointRadius: 0,
                        fill: true,
                        borderWidth: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                animation: {
                    // duration: 1000,
                    // easing: 'linear'
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "index",
                    intersect: false,
                },
                deferred: {
                    xOffset: 150, // defer until 150px of the canvas width are inside the viewport
                    yOffset: "100%", // defer until 50% of the canvas height are inside the viewport
                    delay: 50000, // delay of 500 ms after the canvas is considered inside the viewport
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                fontFamily: "Quicksand",
                                fontColor: "#008570",
                                fontStyle: "bold",
                                //   beginAtZero: true,
                                maxTicksLimit: 10,
                                padding: 20,
                                maxRotation: 50,
                                minRotation: 50,
                            },
                            gridLines: {
                                color: gradientStroke,
                                drawTicks: false,
                                // display: false,
                                drawBorder: false,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                zeroLineColor: "transparent",
                            },
                            ticks: {
                                padding: 20,
                                fontColor: "#007176",
                                fontStyle: "bold",
                                fontFamily: "Quicksand",
                                maxTicksLimit: 30,
                                maxRotation: 50,
                                minRotation: 50,
                            },
                            gridLines: {
                                color: gradientStroke,
                                drawTicks: false,
                                display: false,
                                drawBorder: false,
                            },
                        },
                    ],
                },
            },
        });
        setChart(myChart);
    };

    const handleClickWeek = (params) => {
        setChartSwitch("week");
    };
    const handleClickHM = (params) => {
        setChartSwitch("half");
    };
    const handleClickMonth = (params) => {
        setChartSwitch("month");
    };
    const handleClickYear = (params) => {
        setChartSwitch("year");
    };

    const handleclick = async () => {
        if (chartSwitch === "week") {
            const data = await BuscarVariacao(7, props.moeda).then();
            updateChart(data.values, data.dates);
        } else if (chartSwitch === "half") {
            console.log("hey");
            const data = await BuscarVariacao(15, props.moeda);
            updateChart(data.values, data.dates);
        } else if (chartSwitch === "month") {
            console.log("hey");
            const data = await BuscarVariacao(30, props.moeda);
            updateChart(data.values, data.dates);
        } else if (chartSwitch === "year") {
            console.log("hey");
            const data = await BuscarVariacao(360, props.moeda);
            updateChart(data.values, data.dates);
        }
    };

    const updateChart = (values, dates) => {
        myChart.data.datasets[0].data = values;
        myChart.data.labels = dates;
        myChart.update();
    };

    const lineChartInit = async () => {
        const data = await BuscarVariacao(7, props.moeda);
        lineChart(data.dates, data.values);
    };

    useEffect(() => {
        lineChartInit();
    }, []);

    useEffect(() => {
        if (myChart) {
            // console.log(chartSwitch);
            handleclick();
        }
    }, [chartSwitch]);

    return (
        <div className="chart-container">
            {/* <header className="chart-header">
                <h2>{props.title}</h2>
            </header> */}
            <nav className="chart-nav">
                <ul className="chart-buttons">
                    <li className="chart-button">
                        <button onClick={handleClickWeek}>1 Semana</button>
                    </li>
                    <li className="chart-button">
                        <button onClick={handleClickHM}>15 Dias</button>
                    </li>
                    <li className="chart-button">
                        <button onClick={handleClickMonth}>1 Mês</button>
                    </li>
                    <li className="chart-button">
                        <button onClick={handleClickYear}>1 Ano</button>
                    </li>
                </ul>
            </nav>
            <div className="Grafico" id="line-chart">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    );
};
