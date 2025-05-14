import { useState, useEffect } from 'react';

import Footer from "../layout/Footer"
import HeaderLogIn from "../layout/HeaderLogIn"

import '../css/solicitudes.css';

function Leads() {

    const [solicitudes, setSolicitudes] = useState([
        {
            id: 1,
            is_archived: false,
            nombre: "Maria",
            email: "maria.gonzales@gmail.com",
            telefono: "9981234567",
            fecha: "6 de Mayo",
            pfp: "img/pers11.jpg",
            title: "Reparación de fuga de tubería bajo lavabo",
            details: "Hola, tengo una fuga de agua en la tubería del lavabo de mi baño principal. El agua gotea constantemente y ya intenté ajustar las conexiones, pero persiste. Necesito que un plomero revise y repare la tubería. Preferiría que el servicio fuera este viernes por la mañana (10 am a 2 pm). El lavabo es de porcelana y las tuberías son de PVC. ¡Gracias!"
        },
        {
            id: 2,
            is_archived: false,
            nombre: "Sergio",
            email: "sergio@gmail.com",
            telefono: "9987654321",
            fecha: "10 de Abril",
            pfp: "img/pers12.jpg",
            title: "Destapar drenaje de la cocina con obstrucción grave",
            details: "Buen día, el drenaje de mi cocina está completamente tapado desde ayer. Ya intenté usar desatascador y soda cáustica, pero no funcionó. El agua ya no baja y hay mal olor. Necesito un plomero con herramienta profesional (como hidrojet o serpentina) para destaparlo. La tubería es de PVC y tiene aproximadamente 3 años de instalación. Preferiría el servicio hoy o mañana en la tarde (después de 4 pm). ¡Agradezco su ayuda!"
        },
        {
            id: 3,
            is_archived: true,
            nombre: "Ana",
            email: "ana.banana@gmail.com",
            telefono: "9988765432",
            fecha: "15 de Enero",
            pfp: "img/pers10.jpg",
            title: "Cambio de válvula del paso de agua general (está goteando)",
            details: "Hola, tengo una fuga de agua en la tubería del lavabo de mi baño principal. El agua gotea constantemente y ya intenté ajustar las conexiones, pero persiste. Necesito que un plomero revise y repare la tubería. Preferiría que el servicio fuera este viernes por la mañana (10 am a 2 pm). El lavabo es de porcelana y las tuberías son de PVC. ¡Gracias!"
        }
    ]);

    // PARA ARCHIVAR/DESARCHIVAR SOLICITUDES
    const toggleArchivada = (id) => {
        setSolicitudes(solicitudes.map(solicitud =>
            solicitud.id === id
                ? { ...solicitud, is_archived: !solicitud.is_archived }
                : solicitud
        ));
    };

    // CONTADOR DE SOLICITUDES NUEVAS
    const nuevasCount = solicitudes.filter(s => !s.is_archived).length;

    return (
        <>
            <HeaderLogIn />
            <main>
                <div className="container-fluid1 px-0">
                    <div className="image-container">
                        <img src="img/BG-gray.jpg" alt="Solicitudes" />
                        <div className="text-overlay">Solicitudes</div>
                    </div>
                </div>

                <div className="container mt-4">
                    {/* Sección de Solicitudes Nuevas */}
                    {nuevasCount > 0 && (
                        <span className="badge bg-primary notification-badge">
                            {nuevasCount}
                        </span>
                    )}
                    <h3 className="section-title">Solicitudes Nuevas</h3>
                    <div id="solicitudes-nuevas">
                        {solicitudes
                            .filter(solicitud => !solicitud.is_archived)
                            .map(solicitud => (
                                <div key={solicitud.id} className="solicitud-card card shadow-sm">
                                    <div className="trabajador-fondo">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="d-flex align-items-start mb-3">
                                                    <img
                                                        src={solicitud.pfp}
                                                        className="rounded-circle foto-trab me-3"
                                                        alt="Foto del trabajador"
                                                        style={{ width: 80, height: 80 }}
                                                    />
                                                    <div>
                                                        <h5 className="mb-1">{solicitud.nombre}</h5>
                                                        <span className="d-block text-muted">{solicitud.email}</span>
                                                        <span className="d-block text-muted">{solicitud.telefono}</span>
                                                        <br />
                                                        <span className="d-block text-muted">{solicitud.fecha}</span>
                                                        <button
                                                            className="btn btn-archivar mt-2"
                                                            onClick={() => toggleArchivada(solicitud.id)}
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
                            .filter(solicitud => solicitud.is_archived)
                            .map(solicitud => (
                                <div key={solicitud.id} className="solicitud-card card shadow-sm">
                                    <div className="trabajador-fondo">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="d-flex align-items-start mb-3">
                                                    <img
                                                        src={solicitud.pfp}
                                                        className="rounded-circle foto-trab me-3"
                                                        alt="Foto del trabajador"
                                                        style={{ width: 80, height: 80 }}
                                                    />
                                                    <div>
                                                        <h5 className="mb-1">{solicitud.nombre}</h5>
                                                        <span className="d-block text-muted">{solicitud.email}</span>
                                                        <span className="d-block text-muted">{solicitud.telefono}</span>
                                                        <br />
                                                        <span className="d-block text-muted">{solicitud.fecha}</span>
                                                        <button
                                                            className="btn btn-desarchivar mt-2"
                                                            onClick={() => toggleArchivada(solicitud.id)}
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