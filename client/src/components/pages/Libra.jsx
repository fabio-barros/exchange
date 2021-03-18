import React, { useState, useEffect, Fragment } from "react";
import "../../styles/css/Libra.css";
import buscarCambio from "../BuscarCambio";
import Conversor from "../Conversor";
import Grafico from "../Grafico";
import Banner_Flag from "../../assets/icons/uk-flat.png";
import Origem_Flag_Icon from "../../assets/icons/uk.png";
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
        const API_Data = await buscarCambio("GBP");
        console.log(API_Data);
        setCambio(API_Data.GBP.ask);
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
        <Container className="main-container" fluid>
            <Container className="intro-container" fluid>
                <Row className="banner-row">
                    <Col className="banner">
                        <img src={Banner_Flag} alt="" />
                        <h1>Libra Hoje</h1>
                    </Col>
                </Row>
                <Row className="converter-row">
                    <Col className="converter-col">
                        <Conversor
                            flag={Origem_Flag_Icon}
                            cifrao="£"
                            sigla="GBP"
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

            {/* <nav className="libra-scroll-header">
                    <ul className="libra-menu">
                        <li>
                            <a href="#">Libra Comercial</a>
                        </li>
                        <li>
                            <a href="#">Libra Turismo</a>
                        </li>
                        <li>
                            <a href="#">Sobre o Libra</a>
                        </li>
                    </ul>
                </nav>
                <Grafico moeda = "GBP" title="Variação Dolar x Libra"/>
                <div className="libracomercial-info"><p>A Libra esterlina
 Libra Esterlina é a moeda oficial de todo o Reino Unido, ela é considerada uma das mais antigas do mundo em circulação.

A libra esterlina comercial é o valor que o mercado financeiro estabelece para transações de comércio exterior e movimentações financeiras feitas por empresas como importações e exportações.

A libra esterlina de turismo é a cotação utilizada em casas de câmbio para a compra e venda das mesmas por pessoas físicas. Ela é baseada na Libra Esterlina Comercial, entretanto, inclui alguns custos a mais, dentre eles: Importação, Logística, Estoque e entre outros. Por tal motivo, ela é sempre mais cara que a libra comercial.</p></div> */}
        </Container>
    );
};
