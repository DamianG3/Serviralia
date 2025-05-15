import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Footer from "../layout/Footer"
import Header from "../layout/HeaderGuest"
import '../css/sign-in.css'
import '../css/AvatarUpload.css'

function ClientSignUp() {
    const [newClient, setNewClient] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "phone": "",
        "birthDate": ""
    })
    const [errorMessage, seterrorMessage] = useState('')
    const navigate = useNavigate();

    const size = 80;
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('img/icon.jpg');
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value })
    }

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveNewUser = async (e) => {
        seterrorMessage("")
        e.preventDefault();

        const formDataToSend = new FormData();
        if (image) {
            console.log(image);

            formDataToSend.append('pfp', image);
        }
        formDataToSend.append('firstName', newClient.firstName);
        formDataToSend.append('lastName', newClient.lastName);
        formDataToSend.append('email', newClient.email);
        formDataToSend.append('password', newClient.password);
        formDataToSend.append('phone', newClient.phone);
        formDataToSend.append('birthDate', newClient.birthDate);

        try {
            const response = await axios.post('http://localhost:3000/newclient', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Submission successful', response.data);
            submissionSuccessful(response.data.message)
        } catch (error) {
            console.error('Error submitting form', error.response.data);
            seterrorMessage(error.response.data.error)
        }
    }

    const submissionSuccessful = (message) => {
        withReactContent(Swal).fire({
            title: message,
            icon: "success"
        }).then(() => {
            console.log("redirecting...");
            navigate('/SignIn');

        })
    }

    console.log(newClient);

    return (
        <>
            <section className="d-flex justify-content-center align-items-center py-5">
                <main className="form-signup w-100 m-auto">
                    <form id="login">
                        <div className="float-end" id="error">{errorMessage}</div>
                        <h1 className="h3 mb-3 fw-normal">Crear cuenta de cliente</h1>
                        <div className="row g-3">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input
                                        type="name"
                                        name="firstName"
                                        value={newClient.firstName}
                                        onChange={handleInputChange}
                                        className="correo_electronico form-control"
                                        id="floatingInput"
                                        placeholder="Nombre(s) completos"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Nombre(s)</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="name"
                                        name="lastName"
                                        value={newClient.lastName}
                                        onChange={handleInputChange}
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
                                        name="birthDate"
                                        value={newClient.birthDate}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="floatingDate"
                                        placeholder="dd/mm/aaaa"
                                        required
                                    />
                                    <label htmlFor="floatingDate">Fecha de nacimiento</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        name="email"
                                        value={newClient.email}
                                        onChange={handleInputChange}
                                        className="correo_electronico form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Correo electrónico</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="name"
                                        name="phone"
                                        value={newClient.phone}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Number"
                                        required
                                    />
                                    <label htmlFor="floatingInput">Número de teléfono</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        name="password"
                                        value={newClient.password}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                            </div>
                        </div>
                        <br />
                        <h5>Foto de perfil</h5>

                        {/* Avatar Upload */}

                        <div className="avatar-upload-container">
                            <div className="avatar-upload">
                                <div className="avatar-edit">
                                    <input
                                        type='file'
                                        id="imageUpload"
                                        name='pfp'
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                    />
                                    <label htmlFor="imageUpload">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                        </svg>
                                    </label>
                                </div>
                                <div className="avatar-preview">
                                    <label
                                        className="image-preview" htmlFor="imageUpload"
                                        style={{
                                            backgroundImage: `url(${previewImage})`,
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            cursor: 'pointer'
                                        }}
                                    ></label>
                                </div>
                            </div>
                        </div>


                        {/* Submit */}
                        <div className="centro">
                            <button
                                onClick={saveNewUser}
                                type='submit'
                                className="btn botonregistro"
                            >
                                Registrar
                            </button>
                        </div>
                    </form>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default ClientSignUp