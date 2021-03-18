const axios = require("axios");
const moment = require('moment');
// const base = "USD";
const buscarVariacao = async (base) => {
    const day = moment().subtract(1,"days").format("DD")
    const month = moment().format("MM")
    const year = moment().format("YYYY");
    const dataInicio = `${moment().subtract(360,"days").format("YYYY-MM-DD")}`;
    const dataFinal = `${year}-${month}-${day}`;

    const result = await axios({
        method: "GET",
        url: `https://api.exchangerate.host/timeseries?start_date=${dataInicio}&end_date=${dataFinal}&base=${"USD"}&symbols=BRL`,
    })
        .then((response) => {
            return Object.entries(response.data.rates);
        })
        .catch((error) => {
            console.log(error);
        });

    const sortedData = result.sort();
    console.log(sortedData);
};

buscarVariacao()
