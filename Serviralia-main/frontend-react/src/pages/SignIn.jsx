import Footer from "../layout/Footer"
import Header from "../layout/Header"

import '../css/sign-in.css'

function SignIn() {

    return (
        <>
        <Header/>
            <section className="d-flex justify-content-center align-items-center py-5">
                <main className="form-signin w-100 m-auto">
                    <form id="login">
                        <h1 className="h3 mb-3 fw-normal">Inicia sesión</h1>
                        <div className="form-floating">
                            <input
                                type="email"
                                className="correo_electronico form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                required=""
                            />
                            <label htmlFor="floatingInput">Correo electrónico</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="name"
                                className="name form-control"
                                id="floatingInput"
                                placeholder="Nombre Completo"
                                required=""
                            />
                            <label htmlFor="floatingInput">Nombre</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                required=""
                            />
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        <div className="form-check text-start my-3">
                            <input
                                className="form-check-input accent-red"
                                type="checkbox"
                                defaultValue="remember-me"
                                id="flexCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Recuérdame
                            </label>
                        </div>
                        <button className="btn w-100 py-2" type="submit">
                            Acceder
                        </button>
                        <div id="error" />
                    </form>
                    <p className="mt-5 mb-3 text-body-secondary">
                        {" "}
                        ---------------------- Crear Cuenta ----------------------{" "}
                    </p>
                    <a href="/ClientSignUp">
                        <button className="btn botoncuentas mt-2">Cliente</button>
                    </a>
                    <a href="/WorkerSignUp">
                        <button className="btn botoncuentas mt-2">Trabajador</button>
                    </a>
                    <p className="mt-5 mb-3 text-body-secondary">© Serviralia 2025</p>
                </main>
            </section>
        <Footer/>
        </>
    )
}

export default SignIn