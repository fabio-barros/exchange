import React from "react";
import Header from "../components/template/Header";
import Footer from "../components/template/Footer";
import "../styles/css/App.css";
// import porra from "./porra"
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Dollar from "../components/pages/Dolar";
import Euro from "../components/pages/Euro";
import Libra from "../components/pages/Libra";
import Bitcoin from "../components/pages/Bitcoin";

export default (props) => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Dollar}></Route>
                <Route path="/eurohoje" exact component={Euro}></Route>
                <Route path="/librahoje" exact component={Libra}></Route>
                <Route path="/bitcoinhoje" exact component={Bitcoin}></Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Footer />
        </Router>
    );
};
