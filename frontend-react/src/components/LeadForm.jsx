import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function LeadForm({ idWorker }) {
    const [leadInfo, setLeadInfo] = useState({
        "id_worker": 0,
        "id_client": 19,
        "title": "",
        "details": ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeadInfo({ ...leadInfo, [name]: value })
    }

    const sendLead = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/lead', leadInfo)
            .then(response => {
                console.log(response.data);
                // Limpiar form
                setLeadInfo({...leadInfo,"title": "","details": ""})
                mostrarMensaje(response.data.message, 'success');
            })
            .catch(error => {
                console.log(error.response.data);
                mostrarMensaje(error.response.data.error, 'error');
            })
    }

    const mostrarMensaje = (mensaje, tipo) => {
        withReactContent(Swal).fire({
            icon: tipo,
            title: mensaje,
            showConfirmButton: true
        })
    }

    // Set the idWorker inside  leadInfo 
    useEffect(() => {
        setLeadInfo({ ...leadInfo, "id_worker": idWorker })
    }, [idWorker])

    console.log(leadInfo);


    return (
        <>
            <div className="seccion-contacto col-md-4">
                <form>
                    <div className="form-group">
                        <h2 className="Contactar">Contactar</h2>

                        <label htmlFor="subject">Asunto:</label>
                        <input
                            type="text"
                            id="subject"
                            name="title"
                            value={leadInfo.title}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Ej: 'Instalación de ventilador en sala'"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Detalles:</label>
                        <textarea
                            id="details"
                            name="details"
                            value={leadInfo.details}
                            onChange={handleInputChange}
                            className="form-control"
                            rows={4}
                            placeholder="Cuéntanos: ¿Qué pasa? ¿Cuándo lo necesitas? ¿Algo que deba saber el profesional?"
                        />
                    </div>
                    <div className="form-group">
                        <button onClick={sendLead} type="submit" className="btn btn-warning send-button">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default LeadForm
