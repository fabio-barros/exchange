import React, { useState, useEffect, Fragment } from "react";
import "../../styles/css/Euro.css";
import buscarCambio from "../BuscarCambio";
import Conversor from "../Conversor";
import Grafico from "../Grafico";
import Banner_Flag from "../../assets/icons/eu-flat.png";
import Origem_Flag_Icon from "../../assets/icons/eu.png";
import Destino_Flag_Icon from "../../assets/icons/br.png";
import { Container, Row, Col } from "react-bootstrap";

export default (params) => {
    const [Cambio, setCambio] = useState("");
    const [Valor, setaValor] = useState((1.0).toFixed(2));
    const [origemInput, setaorigemInput] = useState("origem");
    let valorOrigem, valorDestino;

    if (origemInput === "origem") {
        valorOrigem = Valor;
        valorDestino = valorOrigem * Cambio;
    } else if (origemInput === "destino") {
        valorDestino = Valor;
        valorOrigem = valorDestino / Cambio;
    }
    useEffect(() => {
        buscar();
    }, []);
    const buscar = async () => {
        const API_Data = await buscarCambio("EUR");
        console.log(API_Data);
        setCambio(API_Data.EUR.ask);
    };

    const atualizarValorOrigem = (e) => {
        let value = e.target.value.split(",").join("");
        setaValor(value);
        setaorigemInput("origem");
    };
    const atualizarValorDestino = (e) => {
        let value = e.target.value.split(",").join("");
        setaValor(value);
        setaorigemInput("destino");
    };

    return (
        <Container className="main-container"  fluid>
          
            <Container className="intro-container" fluid>
                <Row className="banner-row">
                    <Col className="banner">
                        <img src={Banner_Flag} alt="" />
                        <h1>Euro Hoje</h1>
                    </Col>
                </Row>
                <Row className="converter-row">
                    <Col className="converter-col">
                        <Conversor
                            flag={Origem_Flag_Icon}
                            cifrao="€"
                            sigla="EUR"
                            valor={valorOrigem}
                            mudarValor={atualizarValorOrigem}
                        />
                        <div className="Arrow">&#11138;</div>
                        <Conversor
                            flag={Destino_Flag_Icon}
                            cifrao="R$"
                            sigla="BRL"
                            valor={valorDestino}
                            mudarValor={atualizarValorDestino}
                        />
                    </Col>
                </Row>
            </Container>

            {/* <nav className="euro-scroll-header">
                <ul className="euro-menu">
                    <li>
                        <a href="#">Euro Comercial</a>
                    </li>
                    <li>
                        <a href="#">Euro Turismo</a>
                    </li>
                    <li>
                        <a href="#">Sobre o Euro</a>
                    </li>
                </ul>
            </nav> */}
            {/* <Grafico moeda="EUR" title="Variação Dolar x Euro" /> */}
            {/* <div className="eurocomercial-info">
                <p>
                    Euro Euro comercial é utilizado em transações econômicas
                    entre empresas e governos, para fechamento de contratos de
                    importação, exportação. Euro turismo é usado por pessoas
                    físicas em suas viagens e afins. Euro (símbolo: €; código:
                    EUR) é a moeda oficial da Zona do Euro, a qual é constituída
                    por 19 dos 27 estados-membro da União Europeia: Alemanha,
                    Áustria, Bélgica, Chipre, Eslováquia, Eslovénia, Espanha,
                    Estónia, Finlândia, França, Grécia, Irlanda, Itália,
                    Letónia, Lituânia, Luxemburgo, Malta, Países Baixos e
                    Portugal.
                </p>
            </div> */}
        </Container>
    );
};
