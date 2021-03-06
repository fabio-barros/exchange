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
                            cifrao="???"
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
            {/* <Grafico moeda="EUR" title="Varia????o Dolar x Euro" /> */}
            {/* <div className="eurocomercial-info">
                <p>
                    Euro Euro comercial ?? utilizado em transa????es econ??micas
                    entre empresas e governos, para fechamento de contratos de
                    importa????o, exporta????o. Euro turismo ?? usado por pessoas
                    f??sicas em suas viagens e afins. Euro (s??mbolo: ???; c??digo:
                    EUR) ?? a moeda oficial da Zona do Euro, a qual ?? constitu??da
                    por 19 dos 27 estados-membro da Uni??o Europeia: Alemanha,
                    ??ustria, B??lgica, Chipre, Eslov??quia, Eslov??nia, Espanha,
                    Est??nia, Finl??ndia, Fran??a, Gr??cia, Irlanda, It??lia,
                    Let??nia, Litu??nia, Luxemburgo, Malta, Pa??ses Baixos e
                    Portugal.
                </p>
            </div> */}
        </Container>
    );
};
