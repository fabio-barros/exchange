import React, { useState, useEffect, Fragment } from "react";
import "../../styles/css/Dolar.css";
import buscarCambio from "../BuscarCambio";
import Conversor from "../Conversor";
import Graph from "../Grafico";
import Banner_Flag from "../../assets/icons/us-flat.png";
import Origem_Flag_Icon from "../../assets/icons/us.png";
import Destino_Flag_Icon from "../../assets/icons/br.png";
// import ScrollToTop from "../ScrollToTop";
import { useRef } from "react";
import BuscarVariacao from "../BuscarVariacao";
import Chart2 from "../Chart2";
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
        buscarVariacao();
    }, []);

    const buscar = async () => {
        const API_Data = await buscarCambio("USD");
        console.log(API_Data);
        setCambio(API_Data.USD.ask);
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

    /********** */
    const [graphSwitch, setGraphSwitch] = useState(false);
    const [Values, setValues] = useState([]);
    const [Dates, setDates] = useState([]);

    const handleclick = async () => {
        graphSwitch ? setGraphSwitch(false) : setGraphSwitch(true);
        console.log("click");
        console.log(graphSwitch);
        if (!graphSwitch) {
            const data = await BuscarVariacao(30, "USD");
            setValues(data.values);
            setDates(data.dates);
            console.log("okoko");
        } else {
            const data = await BuscarVariacao(15, "USD");
            setValues(data.values);
            setDates(data.dates);
            console.log("kkk");
        }
    };
    const buscarVariacao = async () => {
        const data = await BuscarVariacao(15, "USD");
        setValues(data.values);
        setDates(data.dates);
    };
    /********************** */

    const dolarComercial = useRef(null);
    const goToDC = () =>
        window.scrollTo({
            top: dolarComercial.current.offsetTop,
            behavior: "smooth",
        });

    return (
        <Container className="main-container" fluid>
            {/* <ScrollToTop /> */}
            <Container className="intro-container" fluid>
                <Row className="banner-row">
                    <Col className="banner">
                        <img src={Banner_Flag} alt="" />
                        <h1>D??lar Hoje</h1>
                    </Col>
                </Row>
                <Row className="converter-row">
                    <Col className="converter-col">
                        <Conversor
                            flag={Origem_Flag_Icon}
                            cifrao="US$"
                            sigla="USD"
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

            <Container className="info-nav-container" fluid>
                <Row className="info-nav-row">
                    <Col className="info-nav-col">
                        <nav className="info-nav">
                            <ul className="menu">
                                <li>
                                    <a href="#grafico">Gr??fico</a>
                                </li>
                                <li>
                                    <a href="#dolarcomercial" onClick={goToDC}>
                                        D??lar Comercial
                                    </a>
                                </li>
                                <li>
                                    <a href="#">D??lar Turismo</a>
                                </li>
                                <li>
                                    <a href="#">Sobre o D??lar</a>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </Container>

            <Container className="info-main-container" fluid>
            <Container className="graph-container" fluid>
                            <Row className="graph-row">
                                <Col className="graph-col">
                                    <h2>Varia????o</h2>
                                    <Graph
                                        className="grafico"
                                        moeda="USD"
                                        // title="Cota????es na ultima semana"
                                        label="Varia????o Dolar x Real"
                                        color1="#7C4DFF"
                                        color2="#448AFF"
                                        color3="#00BCD4"
                                        color4="#1DE9B1"
                                    />
                                </Col>
                            </Row>
                        </Container>
                <Container className="info-container">
                    <Row className="info-row">
                        <Col
                            className="dolarcomercial-info"
                            ref={dolarComercial}
                            lg={12}
                        >
                            <h2>D??lar Comercial</h2>

                            <p>
                                Utilizado para definir as taxas de mercado, e
                                como par??metro em grandes movimenta????es de
                                importa????o/exporta????o, o dol??r comercial se
                                refere ??s transa????es comerciais entre grandes
                                empresas e institui????es financeiras.
                            </p>
                            <p>
                                O dol??r comercial possui cota????o vari??vel
                                (confira no gr??fico) que ?? negociada entre
                                bancos e empresas sob interfer??ncia do Banco
                                Central do Brasil; que visa evitar a subida ou a
                                descida excessiva da taxa de c??mbio, evitando a
                                desvaloriza????o do real e minimizando os efeitos
                                sobre as exporta????es, mantendo um valor vi??vel
                                para balan??a comercial brasileira.
                            </p>
                            <h3>D??lar Ptax</h3>
                            <p>
                                Fixada pelo Banco Central, o d??lar Ptax ?? a taxa
                                de c??mbio calculada que equivale a m??dia de
                                todas as opera????es realizadas pelo mercado
                                durante o dia.
                            </p>
                        </Col>
                        

                        <Col className="dolarturismo-info" lg={12}>
                            <h2>Dolar Turismo</h2>
                            <p>
                                Utilizado por pessoas f??sicas em viagens ao
                                exterior e para a compra de bens e servi??os em
                                sites internacionais.
                            </p>
                            <p>
                                Neg??ciado em casas de c??mbio, tendo a sua
                                cota????o baseada no valor do d??lar comercial,
                                acrescentado de impostos governamentais e custos
                                operacionais como seguran??a e transporte da
                                moeda at?? as casas de c??mbio.
                            </p>
                            <p>Sendo assim mais caro que o d??lar comercial.</p>

                            {/* <h3>D??lar Paralelo</h3> */}
                        </Col>
                        <Col className="sobreodolar-info" lg={12}>
                            <h2>Sobre o D??lar</h2>
                            <p>
                                O d??lar dos Estados Unidos (US Dollar, USD, US$)
                                ?? a moeda emitida pelos Estados Unidos atrav??s
                                da Reserva Federal dos Estados Unidos.
                            </p>
                            <p>
                                Ele possui moedas de 1, 5, 10, 25, 50 cents e 1
                                d??lar. As notas que circulam hoje s??o de 1, 5,
                                10, 20, 50 e 100 d??lares.
                            </p>
                            <p>
                                Ele tamb??m ?? a moeda oficial do Timor-Leste,
                                Equador, El Salvador, Panam?? e Porto Rico.
                                Tamb??m ?? usado n??o-oficialmente nas Ilhas
                                Virgens Brit??nicas, Ilhas Marshall, Estados
                                Federados da Micron??sia, Palau, Turks e Cacos e
                                Zimbabwe.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    );
};

/********Banners Old********* */
{
    /* <div className="valor-comercial">
    <span className="titulo">D??lar Comercial</span>
    <span className="cambio"> {`R$ ${cambio}`}</span>
    <p>
    Usado em transa????es com exporta????o/importa????o entre bancos,
    institui????es financeiras e empresas.
    </p>
    </div>

            <div className="valor-turismo">
                <span className="titulo">{`D??lar Turismo`}</span>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio, nostrum?
                </p>
            </div> */
}
