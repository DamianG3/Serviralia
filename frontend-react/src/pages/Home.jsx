import Footer from "../layout/Footer";
import Header from "../layout/HeaderGuest";
import PrettyStars from "../components/PrettyStars";
import '../css/style.css'

function Home({ user }) {
    return (
        <>
            {/* <Header user={user} /> */}
            <>
                <main className="container">
                    <div className="row align-items-center g-1">
                        <div className="col-md-4 d-flex justify-content-center">
                            <div
                                id="carouselExampleAutoplaying"
                                className="carousel slide carousel-custom"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="img/HomeImg1.png" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="img/Homeimg2.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="img/HomeImg3.png" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleAutoplaying"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleAutoplaying"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <section>
                                <h1 className="p-2 mb-3">
                                    Encuentra servicios de mantenimiento en Cancún.
                                </h1>
                                <p className="text-justify">
                                    En Serviralia hacemos fácil encontrar profesionales de mantenimiento
                                    para tu hogar. Contrata electricistas, plomeros, pintores y más con
                                    solo unos clics, revisando su experiencia y opiniones de clientes
                                    anteriores. Si eres trabajador, muestra tus habilidades, destaca tus
                                    proyectos y consigue más oportunidades de trabajo. ¡La solución
                                    ideal para hogares y expertos en Cancún!
                                </p>
                            </section>
                        </div>
                    </div>
                </main>
                <div className="icon-text-container">
                    <div className="icon-text-group">
                        <span className="icon-text-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                fill="currentColor"
                                className="bi bi-check-circle text-success"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                            <span className="icon-text-label"> Confiable</span>
                        </span>
                        <span className="icon-text-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                fill="currentColor"
                                className="bi bi-check-circle text-success"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                            <span className="icon-text-label"> Seguro</span>
                        </span>
                        <span className="icon-text-item">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                fill="currentColor"
                                className="bi bi-check-circle text-success"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                            <span className="icon-text-label"> Fácil</span>
                        </span>
                    </div>
                </div>
                {/* TRABAJADORES RECOMENDADOS*/}
                <div className="container2 perfil-trabajador py-4 mt-4">
                    <div className="container">
                        <h2 className="mb-4">Recomendados por la comunidad:</h2>
                        <div className="row trabajadores-container">
                            {/*TRAB 1*/}


                            <div className="col-md-4 mb-4">
                                <a href={'/WorkerProfile/19'}>
                                    <div className="trabajador-fondo p-3">
                                        <div className="row align-items-center mb-4">
                                            <div className="col-auto">
                                                <img
                                                    src="img/pers1.jpg"
                                                    className="rounded-circle foto-trab"
                                                    alt="Foto del trabajador"
                                                />
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1" style={{color:'black'}}>Alejandro Mendoza</h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <PrettyStars rating={4.7} />
                                                        <span className="ms-2 text-muted">4.7</span>
                                                    </div>
                                                </div>
                                                <span className="ms-2 text-muted">(85 reseñas)</span>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <button className="btn botonplom">Plomería</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card service-card h-100">
                                                    <img
                                                        src="img/Reparacion1.png"
                                                        className="card-img-top"
                                                        alt="Trabajo de plomería"
                                                    />
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            ¡Ni goteras ni fugas! Soluciones en plomería, utilizando
                                                            materiales duraderos y de alta calidad.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/*TRAB 2*/}
                            <div className="col-md-4 mb-4">
                                <a href={'/WorkerProfile/20'}>
                                    <div className="trabajador-fondo p-3">
                                        <div className="row align-items-center mb-4">
                                            <div className="col-auto">
                                                <img
                                                    src="img/pers2.jpg"
                                                    className="rounded-circle foto-trab"
                                                    alt="Foto del trabajador"
                                                />
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1" style={{color:'black'}}>Juan Pérez</h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <PrettyStars rating={4.6} />
                                                        <span className="ms-2 text-muted">4.6</span>
                                                    </div>
                                                </div>
                                                <span className="ms-2 text-muted">(63 reseñas)</span>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <button className="btn botonplom">Construcción</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card service-card h-100">
                                                    <img
                                                        src="img/reparacion3.jpg"
                                                        className="card-img-top"
                                                        alt="Trabajo de plomería"
                                                    />
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            Te ayudo a construir tus sueños con materiales de alta
                                                            calidad que garantiza resultados.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {/*TRAB 3*/}
                            <div className="col-md-4 mb-4">
                                <a href={'/WorkerProfile/21'}>
                                    <div className="trabajador-fondo p-3">
                                        <div className="row align-items-center mb-4">
                                            <div className="col-auto">
                                                <img
                                                    src="img/pers3.jpg"
                                                    className="rounded-circle foto-trab"
                                                    alt="Foto del trabajador"
                                                />
                                            </div>
                                            <div className="col">
                                                <h5 className="mb-1" style={{color:'black'}}>David Gomez</h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <PrettyStars rating={4.5} />
                                                        <span className="ms-2 text-muted">4.5</span>
                                                    </div>
                                                </div>
                                                <span className="ms-2 text-muted">(29 reseñas)</span>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <button className="btn botonplom">Mecánica</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card service-card h-100">
                                                    <img
                                                        src="img/reparacion2.jpg"
                                                        className="card-img-top"
                                                        alt="Trabajo de mecánica"
                                                    />
                                                    <div className="card-body">
                                                        <p className="card-text">
                                                            Reparo tu vehículo con precisión y calidad, asegurando un
                                                            rendimiento óptimo en cada viaje.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Footer />
        </>
    )
}

export default Home
