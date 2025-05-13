import Footer from "../layout/Footer";
import Header from "../layout/Header";

import '../css/sign-in.css'

function WorkerSignUp() {
    return (
        <>
        <Header/>
        <section className="d-flex justify-content-center align-items-center py-5">
            <main className="form-signup w-100 m-auto">
                <form id="login">
                    <h1 className="h3 mb-3 fw-normal">Crear cuenta de trabajador</h1>
                    <div className="row g-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="name"
                                    className="correo_electronico form-control"
                                    id="floatingInput"
                                    placeholder="Nombre(s) completos"
                                    required=""
                                />
                                <label htmlFor="floatingInput">Nombre(s)</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="name"
                                    className="name form-control"
                                    id="floatingInput"
                                    placeholder="Apellidos Completo"
                                    required=""
                                />
                                <label htmlFor="floatingInput">Apellidos</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="floatingDate"
                                    placeholder="dd/mm/aaaa"
                                    required=""
                                />
                                <label htmlFor="floatingDate">Fecha de nacimiento</label>
                            </div>
                            <br />
                            <p>Foto de perfil</p>
                            <img src="img/icon.jpg" alt="Icon" />
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" />
                                <label className="input-group-text" htmlFor="inputGroupFile02">
                                    Subir
                                </label>
                            </div>
                        </div>
                        <div className="col-md">
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
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Number"
                                    required=""
                                />
                                <label htmlFor="floatingInput">Número de teléfono</label>
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
                            <br />
                            <p>Selecciona tus habilidades</p>
                            <div className="input-group">
                                <select
                                    className="form-select"
                                    id="inputGroupSelect04"
                                    aria-label="Example select with button addon"
                                >
                                    <option selected="">Habilidades</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                    <option value={3}>Three</option>
                                </select>
                                <button className="btn btn-outline-secondary w-50" type="button">
                                    Seleccionar
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <p>Biografía</p>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="name form-control"
                            id="floatingInput"
                            placeholder="Biografía del trabajador"
                            required=""
                        />
                        <label htmlFor="floatingInput">Biografía del trabajador</label>
                    </div>
                    <br />
                    <p>Fotos para tu galería</p>
                    <div className="row g-3">
                        <div className="col-md">
                            <label htmlFor="file-upload" className="btn botonsubirfoto mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-paperclip"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                                </svg>
                                Adjuntar foto
                            </label>
                            <input type="file" id="file-upload" style={{ display: "none" }} />
                        </div>
                        <div className="col-md">
                            <div className="galeria">
                                <div className="contenedor-imagen">
                                    <img src="img/image.png" />
                                </div>
                                <div className="contenedor-imagen">
                                    <img src="img/image.png" />
                                </div>
                                <div className="contenedor-imagen">
                                    <img src="img/image.png" />
                                </div>
                                <div className="contenedor-imagen">
                                    <img src="img/image.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <br />
                <div className="centro">
                    <button className="btn botonregistro" type="submit">
                        Registrar
                    </button>
                </div>
                <div id="error" />
            </main>
        </section>
    <Footer />
    </>
    )
}

export default WorkerSignUp;