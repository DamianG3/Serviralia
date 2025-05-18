import '../css/headerLogIn.css'

function HeaderWorker({ user }) {

    return (
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
                            {/* Solicitudes */}
                            <li className="nav-item mx-2">
                                <a className="nav-link position-relative" href="/Leads">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={20}
                                        height={20}
                                        fill="currentColor"
                                        className="bi bi-bell"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                    </svg>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        1<span className="visually-hidden">solicitudes pendientes</span>
                                    </span>
                                </a>
                            </li>
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
                                    {
                                        user.user.pfp ? (
                                            <img
                                                src={"http://localhost:3000/images/" + user.user.pfp}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                }}
                                                className="icon-image"
                                                width={50}
                                                alt={user.user.pfp}
                                            />

                                        ) : (
                                            <img
                                                src="http://localhost:3000/images/icon.jpg"

                                                className="icon-image"
                                                width={50}
                                                alt={user.user.pfp}
                                            />
                                        )

                                    }
                                    <span>{user.user.firstName}</span>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="profileDropdown"
                                >
                                    <li>
                                        <a className="dropdown-item" href={"/WorkerProfile/" + user.user.idWorker}>
                                            Mi perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/WorkerEditProfile">
                                            Editar perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/Leads">
                                            Solicitudes (1)
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

    )
}

export default HeaderWorker;