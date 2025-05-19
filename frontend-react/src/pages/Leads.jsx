import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
import axios from 'axios';

import Footer from "../layout/Footer"
import HeaderLogIn from "../layout/HeaderWorker"

import '../css/solicitudes.css';

function Leads() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [solicitudes, setSolicitudes] = useState([{
        idLead: 1,
        isArchived: false,
        username: "",
        email: "",
        phone: "",
        pfpFileName: "",
        date: "",
        title: "",
        details: ""
    }]);

    // CONTADOR DE SOLICITUDES NUEVAS
    const nuevasCount = solicitudes.filter(s => !s.isArchived).length;


    // PARA ARCHIVAR/DESARCHIVAR SOLICITUDES
    const toggleArchivada = (id, isArchived) => {

        axios.patch('http://localhost:3000/lead/' + id,
            { "archivedFlag": !isArchived })
            .catch(() => console.log("Ocrurrio un error al patch"))

        setSolicitudes(solicitudes.map(solicitud =>
            solicitud.idLead === id
                ? { ...solicitud, isArchived: !solicitud.isArchived }
                : solicitud
        ));
    };

    const dateReview = (dateString) => {
        const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let d = new Date(dateString);

        return d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();

    }

    useEffect(() => {
        if (user.loggedIn && user.user.idWorker) {
            console.log("IS A WORKER");

            axios.get('http://localhost:3000/leads/' + user.user.idWorker)
                .then(res => {
                    setSolicitudes(res.data)
                })
                .catch(() => {
                    console.error("Ha ocurrido un error");

                })

        } else {
            console.log("USER NOT LOGGED IN OR NOT A WORKER");
            // navigate('/');
            // console.log("redirecting...");

        }

    }, [user])

    console.log("solicitudes: ", solicitudes);


    return (
        <>
            <main>
                <div className="container-fluid1 px-0">
                    <div className="image-container">
                        <img src="img/fondo gris.jpg" alt="Solicitudes" />
                        <div className="text-overlay">Solicitudes</div>
                    </div>
                </div>

                <div className="container mt-4">
                    {/* Sección de Solicitudes Nuevas */}
                    <div className="d-flex align-items-center gap-3">
                        {nuevasCount > 0 && (
                            <div className="badge bg-primary notification-badge">
                                {nuevasCount}
                            </div>
                        )}
                        <h3 className="section-title">Solicitudes Nuevas</h3>
                    </div>
                    <div id="solicitudes-nuevas">

                        {solicitudes
                            .filter(solicitud => !solicitud.isArchived)
                            .map(solicitud => (
                                <div key={solicitud.idLead} className="solicitud-card card shadow-sm">
                                    <div className="trabajador-fondo">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="d-flex align-items-start mb-3">
                                                    {solicitud.pfpFileName ? (
                                                        <img
                                                            src={"http://localhost:3000/images/" + solicitud.pfpFileName}
                                                            className="rounded-circle foto-trab me-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                            }}
                                                            style={{ width: 80, height: 80 }}
                                                            alt={solicitud.pfpFileName}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="http://localhost:3000/images/icon.jpg"
                                                            className="rounded-circle foto-trab me-3"
                                                            alt={solicitud.pfpFileName}
                                                            style={{ width: 80, height: 80 }}
                                                        />
                                                    )}

                                                    <div>
                                                        <h5 className="mb-1">{solicitud.username}</h5>
                                                        <span className="d-block text-muted">{solicitud.email}</span>
                                                        <span className="d-block text-muted">{solicitud.phone}</span>
                                                        <span className="d-block text-muted">{dateReview(solicitud.date)}</span>
                                                        {/* <br /> */}
                                                        <button
                                                            className="btn btn-archivar mt-2"
                                                            onClick={() => toggleArchivada(solicitud.idLead)}
                                                        >
                                                            Archivar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="trabajador-bio">
                                                    <h6 className="border-bottom pb-2">{solicitud.title}</h6>
                                                    <p className="mb-0">{solicitud.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Sección de Solicitudes Archivadas */}
                    <h3 className="section-title">Solicitudes Archivadas</h3>
                    <div id="solicitudes-archivadas">
                        {solicitudes
                            .filter(solicitud => solicitud.isArchived)
                            .map(solicitud => (
                                <div key={solicitud.idLead} className="solicitud-card card shadow-sm">
                                    <div className="trabajador-fondo">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="d-flex align-items-start mb-3">
                                                    {solicitud.pfpFileName ? (
                                                        <img
                                                            src={"http://localhost:3000/images/" + solicitud.pfpFileName}
                                                            className="rounded-circle foto-trab me-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = 'http://localhost:3000/images/icon.jpg';
                                                            }}
                                                            style={{ width: 80, height: 80 }}
                                                            alt={solicitud.pfpFileName}
                                                        />
                                                    ) : (
                                                        <img
                                                            src="http://localhost:3000/images/icon.jpg"
                                                            className="rounded-circle foto-trab me-3"
                                                            alt={solicitud.pfpFileName}
                                                            style={{ width: 80, height: 80 }}
                                                        />
                                                    )}


                                                    <div>
                                                        <h5 className="mb-1">{solicitud.username}</h5>
                                                        <span className="d-block text-muted">{solicitud.email}</span>
                                                        <span className="d-block text-muted">{solicitud.phone}</span>
                                                        <span className="d-block text-muted">{dateReview(solicitud.date)}</span>
                                                        {/* <br /> */}
                                                        <button
                                                            className="btn btn-desarchivar mt-2"
                                                            onClick={() => toggleArchivada(solicitud.idLead, solicitud.isArchived)}
                                                        >
                                                            Desarchivar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="trabajador-bio">
                                                    <h6 className="border-bottom pb-2">{solicitud.title}</h6>
                                                    <p className="mb-0">{solicitud.details}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Leads