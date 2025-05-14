import '../css/headerLogIn.css'

function HeaderClient() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src="img/logo.png" width={50} />
                    <a className="navbar-brand" href="/">
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
                            {/* Dropdown de perfil */}
                            <li className="nav-item dropdown mx-2">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="profileDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="img/pers11.jpg"
                                        className="icon-image"
                                    />
                                    <span>Maria.</span>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="profileDropdown"
                                >
                                    <li>
                                        <a className="dropdown-item" href="/ClientEditProfile">
                                            Editar perfil
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item text-danger" href="/">
                                            Cerrar sesión
                                        </a>
                                    </li>
                                </ul>
                            </li>
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
                                        <a href="/SkillSearch">
                                            <button
                                                className="dropdown-item"
                                                style={{
                                                    backgroundImage: 'url("img/electricista-DD.jpg")'
                                                }}
                                            >
                                                Electricidad
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/SkillSearch">
                                            <button
                                                className="dropdown-item"
                                                style={{ backgroundImage: 'url("img/plomeria-DD.jpeg")' }}
                                            >
                                                Plomería
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/SkillSearch">
                                            <button
                                                className="dropdown-item"
                                                style={{ backgroundImage: 'url("img/mecanica-DD.jpg")' }}
                                            >
                                                Mecánica
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/SkillSearch">
                                            <button
                                                className="dropdown-item"
                                                style={{
                                                    backgroundImage: 'url("img/Construccion-DD.jpg")'
                                                }}
                                            >
                                                Construcción
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/SkillSearch">
                                            <button
                                                className="dropdown-item"
                                                style={{ backgroundImage: 'url("img/jardin-DD.jpg")' }}
                                            >
                                                Jardinería
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <button
                                                className="dropdown-item"
                                                style={{ backgroundImage: 'url("img/otros.png")' }}
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
    )
}

export default HeaderClient