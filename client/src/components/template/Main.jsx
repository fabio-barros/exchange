import React from "react";
import "../../styles/css/Main.css";
import Conversor from "../Conversor";
import Grafico from "../Grafico";
import Router from "../../routes/routes";
import { BrowserRouter, HashRouter } from "react-router-dom";

//export default (props) => <div className="main"><Dolar/></div>;
//export default (props) => <div className="main"><Euro/></div>;
export default (props) => {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};
