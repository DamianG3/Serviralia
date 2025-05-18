import axios from "axios";
import { UserContext } from "../App"; // Import UserContext from App.jsx
import { useContext } from "react";
import HeaderGuest from "./HeaderGuest";

function HeaderWorker({ setUser }) {
    const user = useContext(UserContext);

    // Logout function
    const logout = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/logout');
            console.log(response.data);
            setUser({
                "loggedIn": false
            })
        } catch (error) {
            console.log(error);

            // throw error;
        }
    };

    if (!user.loggedIn) {
        return <HeaderGuest />
    }

    return (<>

        {/* Solicitudes */}
        <li className="nav-item mx-2">
            <a className="nav-link position-relative" href="/Leads">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-bell"
                    viewBox="0 0 16 16">
                    <path
                        d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
                {user.user.unread ? (

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {user.user.unread} <span className="visually-hidden">solicitudes pendientes</span>
                    </span>
                ) : <></>}
            </a>
        </li>
        {/* Dropdown de perfil */}
        <li className="nav-item dropdown mx-2">
            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="profileDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                {
                    user.user.pfp ? (
                        <img src={"http://localhost:3000/images/" + user.user.pfp} onError={(e) => {
                            e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                        }}
                            className="icon-image"
                            width={50}
                            alt={user.user.pfp}
                        />

                    ) : (
                        <img src="http://localhost:3000/images/icon.jpg" className="icon-image" width={50} alt={user.user.pfp} />
                    )

                }
                <span>{user.user.firstName}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                    <a className="dropdown-item" href={"/WorkerProfile/" + user.user.idWorker}>
                        Mi perfil
                    </a>
                </li>
                {/* <li>
                    <a className="dropdown-item" href="/WorkerEditProfile">
                        Editar perfil
                    </a>
                </li> */}
                <li>
                    {user.user.unread ? (
                        <a className="dropdown-item" href="/Leads">
                            Solicitudes ({user.user.unread})
                        </a>
                    ) : <a className="dropdown-item" href="/Leads">
                            Solicitudes
                        </a>}

                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li>
                    <a onClick={logout} className="dropdown-item text-danger" href="/">
                        Cerrar sesión
                    </a>
                </li>
            </ul>
        </li>
    </>)
}

export default HeaderWorker;