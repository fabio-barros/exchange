import React from "react";
import axios from "axios";
import moment from 'moment';

export default async (days, currency) => {
    const day = moment().subtract(1,"days").format("DD")
    const month = moment().format("MM")
    const year = moment().format("YYYY");
    const dataInicio = `${moment().subtract(days,"days").format("YYYY-MM-DD")}`;
    const dataFinal = `${year}-${month}-${day}`;

    const API_Data = await axios({
        method: "GET",
        url: `https://api.exchangerate.host/timeseries?start_date=${dataInicio}&end_date=${dataFinal}&base=${currency}&symbols=BRL`,
    })
        .then((response) => {
            return Object.entries(response.data.rates);
        })
        .catch((error) => {
            console.log(error);
        });

    const Values = [];
    const Dates = [];
    const sortedData = API_Data.sort();
    const months = [
        "JANEIRO",
        "FEVEREIRO",
        "MARÇO",
        "ABRIL",
        "MAIO",
        "JUNHO",
        "JULHO",
        "AGOSTO",
        "SETEMBRO",
        "OUTUBRO",
        "NOVEMBRO",
        "DEZEMBRO",
    ];

    sortedData.forEach(([key, value]) => {
        Values.push(value.BRL.toFixed(2));
        let month = key.split("-")[1];
        Dates.push(`${months[month - 1].toUpperCase()} ${key.split("-")[2]}`);
    });

    return {
        dates: Dates,
        values: Values,
    };
};
