import React from "react";
import "../../styles/css/Footer.css";
//export default props =>{

//return(<footer className="footer">Footer</footer>)

//}
export default (props) => {
    return (
        <footer className="footer">
            <ul>
                <li>
                    <a href=""> Termos | Privacidade</a>
                </li>
                <li>
                    <a
                        className="copyright"
                        href="http://fabio-barros.github.io/"
                    >
                        &copy;{` 2020, Fábio Barros.`}
                    </a>
                </li>
            </ul>
        </footer>
    );
};
