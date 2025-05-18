import HeaderGuest from "./HeaderGuest";
import HeaderClient from "./HeaderClient";
import HeaderWorker from "./HeaderWorker";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../App"; // Import UserContext from App.jsx


import '../css/style.css'
import '../css/headerLogIn.css'



function Header({ setUser }) {
    const user = useContext(UserContext);

    const [showGuest, setShowGuest] = useState(false);
    const [showClient, setShowClient] = useState(false);
    const [showWorker, setShowWorker] = useState(false);


    useEffect(() => {
        if (user.loggedIn) {
            if (user.user.idWorker) {
                console.log("Header Worker");
                setShowWorker(true);
                setShowClient(false);
                setShowGuest(false);
            } else {
                console.log("Header Client");
                setShowWorker(false);
                setShowClient(true);
                setShowGuest(false);
            }
        } else {
            console.log("Header Guest");
            setShowWorker(false);
            setShowClient(false);
            setShowGuest(true);
        }
    }, [user]); // Only re-run the effect if user changes


    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="http://localhost:3000/images/logo.png" width={50} />
                            Serviralia Cancún
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">


                                {showGuest && <HeaderGuest />}
                                {showClient && <HeaderClient setUser={setUser} />}
                                {showWorker && <HeaderWorker setUser={setUser} />}


                                {/* Dropdown de categorias */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="searchDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-list"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                                            />
                                        </svg>
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end horizontal-dropdown"
                                        aria-labelledby="searchDropdown"
                                    >
                                        <li>
                                            <a href="/SkillSearch/2">
                                                <button
                                                    className="dropdown-item"
                                                    style={{
                                                        backgroundImage: 'url("http://localhost:3000/images/electricista-DD.jpg")'
                                                    }}
                                                >
                                                    Electricidad
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/SkillSearch/1">
                                                <button
                                                    className="dropdown-item"
                                                    style={{ backgroundImage: 'url("http://localhost:3000/images/plomeria-DD.jpeg")' }}
                                                >
                                                    Plomería
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/SkillSearch/4">
                                                <button
                                                    className="dropdown-item"
                                                    style={{ backgroundImage: 'url("http://localhost:3000/images/mecanica-DD.jpg")' }}
                                                >
                                                    Mecánica
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/SkillSearch/5">
                                                <button
                                                    className="dropdown-item"
                                                    style={{
                                                        backgroundImage: 'url("http://localhost:3000/images/Construccion-DD.jpg")'
                                                    }}
                                                >
                                                    Construcción
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/SkillSearch/3">
                                                <button
                                                    className="dropdown-item"
                                                    style={{ backgroundImage: 'url("http://localhost:3000/images/limpieza.png")' }}
                                                >
                                                    Limpieza
                                                </button>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/SkillSearch/6">
                                                <button
                                                    className="dropdown-item"
                                                    style={{ backgroundImage: 'url("http://localhost:3000/images/otros.png")' }}
                                                >
                                                    Otros
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;