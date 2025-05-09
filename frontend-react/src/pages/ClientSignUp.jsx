import Footer from "../layout/Footer"
import Header from "../layout/Header"

function ClientSignUp() {
    return (
        <>
            <Header />
            <section className="d-flex justify-content-center align-items-center py-5">
                <main className="form-signin w-100 m-auto">
                    <form id="login">
                        <h1 className="h3 mb-3 fw-normal">Crear cuenta de cliente</h1>
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
                            </div>
                        </div>
                        <br />
                        <h5>Foto de perfil</h5>
                    </form>
                    <img src="img/icon.jpg" alt="Icon" />
                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02" />
                        <label className="input-group-text" htmlFor="inputGroupFile02">
                            Upload
                        </label>
                    </div>
                    <div className="centro">
                        <button className="btn" type="submit">
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

export default ClientSignUp