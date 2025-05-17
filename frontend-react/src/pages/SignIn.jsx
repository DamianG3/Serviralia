import Footer from "../layout/Footer"
import Header from "../layout/HeaderGuest"

import '../css/sign-in.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import Axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function SignIn({ setUser }) {
    const [userLogin, setUserLogin] = useState({
        "email": "",
        "password": ""
    })
    const [errorMessage, seterrorMessage] = useState('')
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        seterrorMessage(" ")

        Axios.post("http://localhost:3000/login", userLogin)
            .then((response) => {
                console.log("response", response.data);
                setUser({
                    "loggedIn": true,
                    "user": response.data
                })
                submissionSuccessful("Inicio de sesión correcto!")


            }).catch((error) => {
                console.log("error login", error);
                seterrorMessage(error.response.data.error)
            })
    }

    const submissionSuccessful = (message) => {
        withReactContent(Swal).fire({
            title: message,
            icon: "success"
        }).then(() => {
            console.log("redirecting...");
            navigate('/');

        })
    }

    console.log(userLogin);

    return (
        <>
            <section className="d-flex justify-content-center align-items-center py-5">
                <main className="form-signin w-100 m-auto">
                    <form id="login">

                        <h1 className="h3 mb-3 fw-normal">Inicia sesión</h1>
                        <div className="form-floating">
                            <input
                                type="email"
                                className="correo_electronico form-control"
                                id="floatingInput"
                                name="email"
                                value={userLogin.email}
                                onChange={handleInputChange}
                                placeholder="name@example.com"
                                required=""
                            />
                            <label htmlFor="floatingInput">Correo electrónico</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                name="password"
                                value={userLogin.password}
                                className="form-control"
                                onChange={handleInputChange}
                                id="floatingPassword"
                                placeholder="Password"
                                required=""
                            />
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        {/* <div className="form-check text-start my-3">
                            <input
                                className="form-check-input accent-red"
                                type="checkbox"
                                defaultValue="remember-me"
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Recuérdame
                            </label>
                        </div> */}
                        <button onClick={submitLogin} className="btn w-100 py-2 my-2">
                            Acceder
                        </button>

                    </form>
                    <div className="float-end" id="error">{errorMessage}</div>

                    <div className="my-4"
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
                        <p style={{ margin: '0px', width: '130px', textAlign: 'center' }}>Crear Cuenta</p>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
                    </div>

                    <div class="container overflow-hidden text-center">
                        <div class="row gx-3">
                            <div class="col">
                                <a href="/ClientSignUp">
                                    <button className="btn botoncuentas ">Cliente</button>
                                </a>    </div>
                            <div class="col">
                                <a href="/WorkerSignUp">
                                    <button className="btn botoncuentas ">Trabajador</button>
                                </a>    </div>
                        </div>
                    </div>
                    {/* <a href="/ClientSignUp">
                        <button className="btn botoncuentas mt-2">Cliente</button>
                    </a>
                    <a href="/WorkerSignUp">
                        <button className="btn botoncuentas mt-2">Trabajador</button>
                    </a> */}
                    <p className="mt-5 mb-3 text-body-secondary">© Serviralia 2025</p>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default SignIn