import React, { useState, useEffect } from "react";
import "../styles/css/Grafico.css";
import axios from "axios";
import Chart from "chart.js";
// import { Line } from "react-chartjs-2";
import BuscarVariacao from "./BuscarVariacao";

export default (props) => {
    const { color1, color2, color3, color4 } = props;

    const [Values, setValues] = useState([]);
    const [Dates, setDates] = useState([]);
    // const [myChart, setChart] = useState({});
    const [chartOptions, setChartOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "index",
            intersect: false,
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
                        color: "#000",
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
                        color: "#000",
                        drawTicks: false,
                        display: false,
                        drawBorder: false,
                    },
                },
            ],
        },
    });
    const [chartData, setChartData] = useState({});
    const [myChart, setChart] = useState({});
    const [graphSwitch, setGraphSwitch] = useState(true);
    const [gradient, setGradient] = useState({});

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const width = window.innerWidth || document.body.clientWidth;
        const gradientStroke = ctx.createLinearGradient(0, 0, width, 0);
        gradientStroke.addColorStop(0, color1);
        gradientStroke.addColorStop(0.3, color2);
        gradientStroke.addColorStop(0.6, color3);
        gradientStroke.addColorStop(1, color4);
        return {
            labels: [],
            datasets: [
                {
                    data: [],
                    label: `${props.label}`,
                    borderColor: "#000",
                    pointBorderColor: gradientStroke,
                    pointBackgroundColor: gradientStroke,
                    pointHoverBackgroundColor: gradientStroke,
                    pointHoverBorderColor: gradientStroke,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: "#000",
                    pointBorderWidth: 8,
                    pointHoverRadius: 8,
                    pointHoverBorderWidth: 1,
                    pointRadius: 2,
                    fill: true,
                    borderWidth: 4,
                },
            ],
        };
    };

    const handleclick = () => {
        graphSwitch ? setGraphSwitch(false) : setGraphSwitch(true);
        console.log("click");
        console.log(graphSwitch);
        if (!graphSwitch) {
            myChart.data.datasets[0].data = Values;
            myChart.data.labels = Dates;
            myChart.data.datasets[0].borderColor = gradient;
            myChart.update();
        } else {
            myChart.data.datasets[0].data = [0, 1, 2, 3, 6, 4];
            myChart.data.labels = Dates;
            myChart.update();
        }
    };

    const buscarVariacao = async () => {
        const data = await BuscarVariacao(15, props.moeda);
        setDates(data.dates);
        setValues(data.values);
    };
    useEffect(() => {
        buscarVariacao();
    }, []);

    return (
        <div className="chart-container">
            <header className="chart-header">
                <h2>{props.title}</h2>
            </header>
            <nav className="chart-nav">
                <ul className="chart-buttons">
                    <li className="chart-button">
                        <button onClick={handleclick}>1 Semana</button>
                    </li>
                    <li className="chart-button">
                        <a href="#/">15 Dias</a>
                    </li>
                    <li className="chart-button">
                        <a href="#/">1 Mês</a>
                    </li>
                    <li className="chart-button">
                        <a href="#/">1 Ano</a>
                    </li>
                </ul>
            </nav>
            <div className="Grafico" id="line-chart">
                {/* <canvas id="myChart"></canvas> */}
                {/* <Line data={data} options={chartOptions}/> */}
            </div>
        </div>
    );
};
