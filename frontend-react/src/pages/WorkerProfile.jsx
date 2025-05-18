import Footer from "../layout/Footer";
// import Header from "../layout/Header";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../css/perfiltrab.css';
import ReviewModal from "../components/ReviewModal";
// import HeaderLogIn from "../layout/HeaderWorker";
import PrettySkills from "../components/PrettySkills";
import PrettyStars from "../components/PrettyStars";
import LeadForm from "../components/LeadForm";

function WorkerProfile() {
    // CAMBIO DE LAS IMAGENES
    const [serviceImages, setServiceImages] = useState([])
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
    const [workerInfo, setWorkerInfo] = useState({
        "info": {
            "id": null,
            "fullName": null,
            "pfpFileName": null,
            "biography": null,
            "skills": [],
            "reviewAverage": null,
            "totalReviews": null,
            "gallery": []
        },
        "ratings": [
            {
                "id": null,
                "rating": null,
                "skill": "General"
            }
        ],
        "reviews": [
            {
                "id": null,
                "username": null,
                "pfpFileName": null,
                "date": null,
                "skill": null,
                "rating": null,
                "review": null,
                "gallery": null
            }
        ]
    });

    useEffect(() => {
        axios.get('http://localhost:3000/profileinfo/' + idWorker)
            .then(res => {
                setWorkerInfo(res.data)
                setServiceImages(res.data.info.gallery)
            })
            .catch(error => {
                console.error("Ha ocurrido un error");

            })
    }, [])

    const dateReview = (dateString) => {
        const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let d = new Date(dateString);

        return month[d.getMonth()] + " " + d.getFullYear();

    }

    // console.log(workerInfo);

    // console.log("serviceImages", serviceImages);


    return (
        <>
            <>
                {/* MAIN*/}

                {/* FOTOS Y PERFIL */}
                <main>
                    <div className="profile-container">

                        {/* PERFIL DE BD */}

                        {

                            <div className="col-md-6 mb-4 p-4">
                                <div className="trabajador-fondo p-3">
                                    <div className="row align-items-center mb-4">
                                        <div className="col-auto">
                                            {workerInfo?.info.pfpFileName ? (
                                                <img
                                                    src={`http://localhost:3000/images/${workerInfo.info.pfpFileName}`}
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                    }}
                                                    className="rounded-circle foto-trab me-3"
                                                    alt="Foto del trabajador"
                                                />
                                            ) : (
                                                <img
                                                    src="http://localhost:3000/images/icon.jpg"
                                                    className="rounded-circle foto-trab me-3"
                                                    alt="Foto del trabajador"
                                                />
                                            )}
                                        </div>
                                        <div className="col">
                                            <h5 className="mb-1">{workerInfo.info.fullName}</h5>
                                            <div className="d-flex align-items-center">
                                                <PrettyStars rating={workerInfo.info.reviewAverage} />
                                                <span className="ms-2 text-muted">{workerInfo.info.reviewAverage}</span>
                                            </div>
                                            <span className="ms-2 text-muted">({workerInfo.info.totalReviews} reseñas)</span>
                                        </div>
                                        <PrettySkills skills={workerInfo.info.skills} />
                                    </div>

                                    <p style={{ whiteSpace: 'pre-line' }} >
                                        {workerInfo.info.biography}
                                    </p>
                                </div>
                            </div>
                        }

                        {/*imagen*/}
                        <div className="image-section">
                            <div className="image-wrapper">
                                <img
                                    src={'http://localhost:3000/images/' + serviceImages[currentImageIndex]}
                                    className="service-image"
                                    id="serviceImage"
                                    alt={serviceImages[currentImageIndex]}
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

                    </div>
                </main>
                {/*CONTACTO*/}
                <div className="contacto">
                    {/* Inicia contacto objeto */}
                        <LeadForm idWorker={workerInfo.info.id}/>

                    {/* <div className="seccion-contacto col-md-4">
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
                    </div> */}
                </div>
                {/*RESEÑAS*/}
                <div className="container2 reseñas-section py-4 mt-4">
                    <div className="container">
                        <h2 className="mb-4">Reseñas</h2>
                        <div className="row">
                            {/* Calificaciones por separado */}
                            <div className="col-md-4 mb-4">
                                <div className="trabajador-fondo p-3 h-100">
                                    <div className="rating-summary text-center">
                                        <h3 className="mb-3">Calificación General</h3>
                                        <div className="rating-stars mb-2">
                                            <PrettyStars rating={workerInfo.ratings[0].rating} />
                                        </div>
                                        <h4 className="mb-4">{workerInfo.ratings[0].rating}</h4>

                                        {workerInfo.ratings?.filter((_, index) => index !== 0).map((rating) => (
                                            <div className="category-rating mb-3">
                                                <span>{rating.skill}</span>
                                                <div className="d-inline-block ms-2">
                                                    <PrettyStars rating={rating.rating} />
                                                    <span className="ms-1">{rating.rating}</span>
                                                </div>
                                            </div>

                                        ))}

                                        <br />
                                        {/*MODAL PARA RESEÑAS*/}
                                        < ReviewModal />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {workerInfo.reviews?.map((review) => (
                                    <div className="review-card mb-4">
                                        <div className="review-header mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {
                                                        review.pfpFileName ? (
                                                            <img
                                                                src={"http://localhost:3000/images/" + review.pfpFileName}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                                }}
                                                                className="rounded-circle"
                                                                width={50}
                                                                alt={review.pfpFileName}
                                                            />

                                                        ) : (
                                                            <img
                                                                src="http://localhost:3000/images/icon.jpg"

                                                                className="rounded-circle"
                                                                width={50}
                                                                alt={review.pfpFileName}
                                                            />
                                                        )

                                                    }
                                                </div>
                                                <div className="col">
                                                    <h5 className="mb-0">{review.username}</h5>
                                                    <small className="text-muted">{dateReview(review.date)}</small>
                                                </div>
                                            </div>
                                            <div className="rating-stars mt-2">
                                                <PrettyStars rating={review.rating} />
                                            </div>
                                            <div className="col-12 mt-2 d-flex align-items-center gap-2">
                                                <p className="mb-0">Categoria:</p>
                                                <PrettySkills skills={[review.skill]} />
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            <p className="card-text">
                                                {review.review}
                                            </p>
                                        </div>
                                    </div>

                                ))}
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