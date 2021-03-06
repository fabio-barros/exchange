import React, { useState, useEffect, Fragment } from "react";
import "../../styles/css/Bitcoin.css";
import buscarCambio from "../BuscarCambio";
import Conversor from "../Conversor";
import Grafico from "../Grafico";
import Banner_Flag from "../../assets/icons/btc.png";
import Origem_Flag_Icon from "../../assets/icons/btc.png";
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
        const API_Data = await buscarCambio("BTC");
        console.log(API_Data);
        setCambio(API_Data.BTC.ask);
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
                        <h1>Dólar Hoje</h1>
                    </Col>
                </Row>
                <Row className="converter-row">
                    <Col className="converter-col">
                        <Conversor
                            flag={Origem_Flag_Icon}
                            cifrao="BTC"
                            sigla="BTC"
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
{/* 
            <nav className="bitcoin-scroll-header">
                <ul className="bitcoin-menu">
                    <li>
                        <a href="#">Bitcoin Comercial</a>
                    </li>
                    <li>
                        <a href="#">Bitcoin Turismo</a>
                    </li>
                    <li>
                        <a href="#">Sobre Bitcoin</a>
                    </li>
                </ul>
            </nav>
            <Grafico moeda="BTC" title="Variação Dolar x Bitcoin" />
            <div className="bitcoincomercial-info">
                <p>
                    Bitcoin É uma criptomoeda descentralizada ou um dinheiro
                    eletrônico para transações peer-to-peer, foi criada em 2008
                    por um programador que tinha o pseudônimo Satashi Nakamoto.
                    Ela é considerada a primeira o primeiro dinheiro eletrônico
                    do mundo descentralizada, ela é responsável pelo
                    ressurgimento do SBL(Sistema Bancário Livre). Como funciona
                    o Bitcoin? Ela é formada por uma base criptografada. A
                    criptografia é o que garante que o sistema funcione e que
                    todas as transações sejam feitas de forma segura e anônima.
                    Por tal motivo, o Bitcoin é também conhecido por
                    criptomoeda. Como o Bitcoin não é regularizado por nenhuma
                    entidade financeira, o processo de transação dela, é
                    realidade pelos mineradores. Por tal motivo, entender o que
                    é o mercado e como ele funciona é de suma importância para
                    tomar qualquer decisão dentro do mundo do Bitcoin.
                </p>
            </div> */}
        </Container>
    );
};

/********Banners Old********* */
{
    /* <div className="valor-comercial">
                <span className="titulo">Dólar Comercial</span>
                <span className="cambio"> {`R$ ${cambio}`}</span>
                <p>
                    Usado em transações com exportação/importação entre bancos,
                    instituições financeiras e empresas.
                </p>
            </div>

            <div className="valor-turismo">
                <span className="titulo">{`Dólar Turismo`}</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, nostrum?
                </p>
            </div> */
}
