import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useState } from 'react';

import '../css/perfiltrab.css';
import ReviewModal from "../components/ReviewModal";
import HeaderLogIn from "../layout/HeaderWorker";
import PrettySkills from "../components/PrettySkills";
import PrettyStars from "../components/PrettyStars";

function WorkerProfile() {

    let bio = "Como técnico en plomería ecológica, ayudo a familias a reducir su consumo de agua. Me certifiqué en Plomería Verde México y uso técnicas como:\n- Instalación de regaderas y WC ahorradores\n- Sistemas de captación de agua pluvial\n- Reparaciones sin químicos contaminantes\nMis precios incluyen asesoría gratuita: \n400 por hora de trabajo, kits de ahorro desde 1,200 MXN, y descuentos en proyectos completos. ¡Juntos cuidamos el planeta y tu bolsillo!"
    // CAMBIO DE LAS IMAGENES
    const serviceImages = [
        'img/plom1.jpg',
        'img/plom2.jpg',
        'img/elec1.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function changeImage(direction) {
        setCurrentImageIndex(prevIndex => {
            let newIndex = prevIndex + direction;

            if (newIndex >= serviceImages.length) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = serviceImages.length - 1;
            }

            return newIndex;
        })
    }

    // ID DEL TRABAJADOR
    const { id: idWorker } = useParams();
    // LISTA DE TRABAJADORES
    const [workerInfo, setWorkerInfo] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/profileinfo/' + idWorker)
            .then(res => {
                setWorkerInfo(res.data)
            })
            .catch(error => {
                console.error("Ha ocurrido un error");

            })
    }, [])

    console.log(workerInfo);

    return (
        <>
            <>
                {/* MAIN*/}
                {/* FOTOS Y PERFIL */}
                <main>
                    <div className="profile-container">
                        {/*imagen*/}
                        <div className="image-section">
                            <div className="image-wrapper">
                                <img
                                    src={serviceImages[currentImageIndex]}
                                    className="service-image"
                                    id="serviceImage"
                                    alt="Trabajo de Alejandro Mendoza"
                                />
                                <div className="nav-buttons">
                                    <button className="nav-btn" onClick={() => changeImage(-1)}>
                                        ←
                                    </button>
                                    <button className="nav-btn" onClick={() => changeImage(1)}>
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*el contenido*/}
                        <div className="col-md-6 mb-4 p-4">
                            <div className="trabajador-fondo p-3">
                                <div className="row align-items-center mb-4">
                                    <div className="col-auto">
                                        <a href="perfiltrab.html">
                                            <img
                                                src="img/pers1.jpg"
                                                className="rounded-circle foto-trab"
                                                alt="Foto del trabajador"
                                            />
                                        </a>
                                    </div>
                                    <div className="col">
                                        <h5 className="mb-1">Alejandro Mendoza</h5>
                                        <div className="d-flex align-items-center">
                                            <PrettyStars rating={3.8}/>
                                            <span className="ms-2 text-muted">3.8</span>
                                        </div>
                                        <span className="ms-2 text-muted">(85 reseñas)</span>
                                    </div>
                                    <PrettySkills skills={["Plomería", "Electricidad"]}/>
                                </div>
                                <p style={{whiteSpace: 'pre-line'}} > 
                                    {bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                {/*CONTACTO*/}
                <div className="contacto">
                    <div className="seccion-contacto col-md-4">
                        <form>
                            <div className="form-group">
                                <h2 className="Contactar">Contactar</h2>
                                <label htmlFor="subject">Asunto:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="form-control"
                                    placeholder="Ej: 'Instalación de ventilador en sala'"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="details">Detalles:</label>
                                <textarea
                                    id="details"
                                    className="form-control"
                                    rows={4}
                                    placeholder="Cuéntanos: ¿Qué pasa? ¿Cuándo lo necesitas? ¿Algo que deba saber el profesional?"
                                    defaultValue={""}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-warning send-button">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                    {/*RESEÑAS*/}
                    <div className="container2 reseñas-section py-4 mt-4">
                        <div className="container">
                            <h2 className="mb-4">Reseñas.</h2>
                            <div className="row">
                                {/* Calificaciones por separado */}
                                <div className="col-md-4 mb-4">
                                    <div className="trabajador-fondo p-3 h-100">
                                        <div className="rating-summary text-center">
                                            <h3 className="mb-3">Calificación General</h3>
                                            <div className="rating-stars mb-2">
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">☆</span>
                                            </div>
                                            <h4 className="mb-4">4.5</h4>
                                            <div className="category-rating mb-3">
                                                <span>Plomería</span>
                                                <div className="d-inline-block ms-2">
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="ms-1">4.8</span>
                                                </div>
                                            </div>
                                            <div className="category-rating">
                                                <span>Electricidad</span>
                                                <div className="d-inline-block ms-2">
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">★</span>
                                                    <span className="text-warning">☆</span>
                                                    <span className="ms-1">4.2</span>
                                                </div>
                                            </div>
                                            <br />
                                            {/*MODAL PARA RESEÑAS*/}
                                            < ReviewModal />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* Reseña 1 */}
                                    <div className="review-card mb-4">
                                        <div className="review-header mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <img
                                                        src="img/pers4.jpg"
                                                        className="rounded-circle"
                                                        width={50}
                                                        alt="Foto cliente"
                                                    />
                                                </div>
                                                <div className="col">
                                                    <h5 className="mb-0">David</h5>
                                                    <small className="text-muted">Febrero 2025</small>
                                                </div>
                                            </div>
                                            <div className="rating-stars mt-2">
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                            </div>
                                            <div className="col-12 mt-2 d-flex align-items-center gap-2">
                                                <p className="mb-0">Categoria:</p>
                                                <button className="btn botonplom">Plomería</button>
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            <p className="card-text">
                                                Contraté a Alejandro para reparar una fuga grave en mi baño y
                                                quedé impresionado con su profesionalismo. Llegó puntual, con
                                                todas las herramientas necesarias, y solucionó el problema en
                                                menos de una hora. Además me explicó claramente que problema
                                                había causado la fuga y me dió consejos para evitarla en el
                                                futuro.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Reseña 2 */}
                                    <div className="review-card">
                                        <div className="review-header mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <img
                                                        src="img/pers5.jpg"
                                                        className="rounded-circle"
                                                        width={50}
                                                        alt="Foto cliente"
                                                    />
                                                </div>
                                                <div className="col">
                                                    <h5 className="mb-0">Andrés</h5>
                                                    <small className="text-muted">Enero 2025</small>
                                                </div>
                                            </div>
                                            <div className="rating-stars mt-2">
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">★</span>
                                                <span className="text-warning">☆</span>
                                            </div>
                                            <div className="col-12 mt-2 d-flex align-items-center gap-2">
                                                <p className="mb-0">Categoria:</p>
                                                <button className="btn botonplom">Electricidad</button>
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            <p className="card-text">
                                                ¡Servicio impecable! El electricista llegó puntual, solucionó
                                                mi problema de cortocircuito rápido y con profesionalismo.
                                                Explicó todo claramente, dejó todo limpio y el precio fue
                                                justo. 100% recomendado, lo contrataré nuevamente sin dudar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <Footer />
        </>
    )
}

export default WorkerProfile