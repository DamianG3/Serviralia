import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from "../layout/Footer";
import HeaderClient from "../layout/HeaderClient"; import Header from "../layout/HeaderGuest";

import '../css/electricidad.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function SkillSearch() {
    const navigate = useNavigate();

    // ID DE LA HABILIDAD
    const { id: idSkill } = useParams();
    // LISTA DE TRABAJADORES
    const [workerList, setworkerList] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/SearchSkill/' + idSkill)
            .then(res => {
                setworkerList(res.data)
            })
            .catch(error => {
                console.error("Ha ocurrido un error");

            })
    }, [])

    console.log(workerList);

    return (
        <>
            <main>
                <div className="container-fluid1 px-0">
                    <div className="image-container">
                        <img src={`http://localhost:3000/images/${idSkill}.png`}
                            alt={idSkill} />
                        {/* <div className="text-overlay">{idSkill}</div> */}
                    </div>
                </div>
                {/* PERFIL DESDE BD */}
                <div className="container mt-4 mb-5">
                    {
                        workerList?.map((worker) => (
                            <a href={'/WorkerProfile/1'}>
                                <div key={worker.id} className="card m-4 p-4 shadow-sm">
                                    <div className="row g-4">
                                        <div className="col-md-8">
                                            <div className="trabajador-fondo p-3">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="d-flex align-items-start mb-3">
                                                            <img
                                                                src={`http://localhost:3000/images/${worker.pfpFileName}`}
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                                }}
                                                                className="rounded-circle foto-trab me-3"
                                                                alt="Foto del trabajador"
                                                                style={{ width: 80, height: 80 }}
                                                            />
                                                            <div>
                                                                <h5 className="mb-1">{worker.fullName}</h5>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="rating-stars">
                                                                        {Array.from({ length: worker.rating }, (_, index) => (
                                                                            <span key={index} className="text-warning">★</span>
                                                                        ))}
                                                                    </div>
                                                                    <span className="ms-2 text-muted">{worker.rating}</span>
                                                                </div>
                                                                <span className="d-block text-muted">({worker.totalReviews} reseñas)</span>
                                                                {/* <button className="btn botonplom mt-2">{idSkill}</button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-7">
                                                    <div className="trabajador-bio">
                                                        <h6 className="border-bottom pb-2">Biografía</h6>
                                                        <p className="mb-0">{worker.fullName}</p>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="row g-2">
                                                {worker.gallery?.map((image, index) => (
                                                    <div key={index} className="col-6">
                                                        <img
                                                            src={`http://localhost:3000/images/${image}`}
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'http://localhost:3000/images/image.png';
                                                            }}
                                                            className="img-fluid rounded reparacion-img"
                                                            alt={`Reparación ${index + 1}` + ` ${image}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    }

                </div>
                {/*TRAB 1*/}
                {/* <div className="card p-4 shadow-sm">
                    <div className="row g-4">
                        <div className="col-md-8">
                            <div className="trabajador-fondo p-3">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="d-flex align-items-start mb-3">
                                            <img
                                                src="http://localhost:3000/images/1747282427734.jpg"
                                                className="rounded-circle foto-trab me-3"
                                                alt="Foto del trabajador"
                                                style={{ width: 80, height: 80 }}
                                            />
                                            <div>
                                                <h5 className="mb-1">Francisco Hernández</h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="rating-stars">
                                                        <span className="text-warning">★</span>
                                                        <span className="text-warning">★</span>
                                                        <span className="text-warning">★</span>
                                                        <span className="text-warning">★</span>
                                                    </div>
                                                    <span className="ms-2 text-muted">3.7</span>
                                                </div>
                                                <span className="d-block text-muted">(35 reseñas)</span>
                                                <button className="btn botonplom mt-2">Plomería</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="trabajador-bio">
                                            <h6 className="border-bottom pb-2">Biografía</h6>
                                            <p className="mb-0">
                                                Desde que comencé mi carrera como plomero, he estado
                                                comprometido con ofrecer soluciones efectivas a problemas de
                                                fontanería.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row g-2">
                                <div className="col-6">
                                    <img
                                        src="../img/plom1.jpg"
                                        className="img-fluid rounded reparacion-img"
                                        alt="Reparación 1"
                                    />
                                </div>
                                <div className="col-6">
                                    <img
                                        src="../img/plom2.jpg"
                                        className="img-fluid rounded reparacion-img"
                                        alt="Reparación 2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/*TRAB 2*/}
                {/* <div className="container mt-4 mb-5">
                    <div className="card p-4 shadow-sm">
                        <div className="row g-4">
                            <div className="col-md-8">
                                <div className="trabajador-fondo p-3">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="d-flex align-items-start mb-3">
                                                <img
                                                    src="../img/pers8.jpg"
                                                    className="rounded-circle foto-trab me-3"
                                                    alt="Foto del trabajador"
                                                    style={{ width: 80, height: 80 }}
                                                />
                                                <div>
                                                    <h5 className="mb-1">Carlos López</h5>
                                                    <div className="d-flex align-items-center">
                                                        <div className="rating-stars">
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                        </div>
                                                        <span className="ms-2 text-muted">4.9</span>
                                                    </div>
                                                    <span className="d-block text-muted">(94 reseñas)</span>
                                                    <button className="btn botonplom mt-2">Plomería</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="trabajador-bio">
                                                <h6 className="border-bottom pb-2">Biografía</h6>
                                                <p className="mb-0">
                                                    Con más de 8 años de experiencia en plomería, me especializo
                                                    en la instalación y mantenimiento de sistemas de agua y
                                                    desagüe. Utilizo herramientas de última generación.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row g-2">
                                    <div className="col-6">
                                        <img
                                            src="../img/plom3.webp"
                                            className="img-fluid rounded reparacion-img"
                                            alt="Reparación 1"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <img
                                            src="../img/plom4.jpg"
                                            className="img-fluid rounded reparacion-img"
                                            alt="Reparación 2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/*TRAB 3*/}
                {/* <div className="container mt-4 mb-5">
                    <div className="card p-4 shadow-sm">
                        <div className="row g-4">
                            <div className="col-md-8">
                                <div className="trabajador-fondo p-3">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="d-flex align-items-start mb-3">
                                                <img
                                                    src="../img/pers9.jpg"
                                                    className="rounded-circle foto-trab me-3"
                                                    alt="Foto del trabajador"
                                                    style={{ width: 80, height: 80 }}
                                                />
                                                <div>
                                                    <h5 className="mb-1">Juan Pérez</h5>
                                                    <div className="d-flex align-items-center">
                                                        <div className="rating-stars">
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                            <span className="text-warning">★</span>
                                                        </div>
                                                        <span className="ms-2 text-muted">3.0</span>
                                                    </div>
                                                    <span className="d-block text-muted">(37 reseñas)</span>
                                                    <button className="btn botonplom mt-2">Plomería</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="trabajador-bio">
                                                <h6 className="border-bottom pb-2">Biografía</h6>
                                                <p className="mb-0">
                                                    Comprometido con la calidad y la atención al cliente,
                                                    siempre buscando la mejor solución para cada situación.
                                                    Especializado en instalación de grifos.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row g-2">
                                    <div className="col-6">
                                        <img
                                            src="../img/plom5.png"
                                            className="img-fluid rounded reparacion-img"
                                            alt="Reparación 1"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <img
                                            src="../img/plom6.jpg"
                                            className="img-fluid rounded reparacion-img"
                                            alt="Reparación 2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>

            <Footer />
        </>
    )
}

export default SkillSearch