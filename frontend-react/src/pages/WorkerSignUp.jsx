import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Footer from "../layout/Footer"
import Header from "../layout/Header"
import '../css/sign-in.css'
import '../css/AvatarUpload.css'
import ImageUploader from '../components/ImageUploader';
import MultiselectSkills from '../components/multiselectSkills';


function WorkerSignUp() {
    const [newWorker, setNewWorker] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "phone": "",
        "birthDate": "",

        "biography": ""

    })

    // upload logic
    const [errorMessage, seterrorMessage] = useState('')
    const navigate = useNavigate();

    // pfp
    const size = 80;
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('img/icon.jpg');
    const fileInputRef = useRef(null);
    
    // gallery
    const [imageContainers, setImageContainers] = useState([{
        id: 1,
        file: null,    // For the File object
        preview: null  // For the base64 preview
    }]);

    // skill select
    const [skillList, setSkillList] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const handleSkillChange = (selected) => {
        setSelectedSkills(selected);
    };
    

    // Functions

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorker({ ...newWorker, [name]: value })
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
            console.log("pfp:", image);
            formDataToSend.append('pfp', image);
        }

        imageContainers.forEach((container) => {
            // console.log("container:", container);
            if (container.file) {
                // console.log("file:", container.file);
                formDataToSend.append(`gallery`, container.file);
            }
        });

        formDataToSend.append('firstName', newWorker.firstName);
        formDataToSend.append('lastName', newWorker.lastName);
        formDataToSend.append('email', newWorker.email);
        formDataToSend.append('password', newWorker.password);
        formDataToSend.append('phone', newWorker.phone);
        formDataToSend.append('biography', newWorker.biography);

        if (selectedSkills) {
            // console.log("skills:", selectedSkills.map(obj => obj.value));
            formDataToSend.append('skill', selectedSkills.map(obj => obj.value));
            
        }

        console.log("Form to send", formDataToSend);
        
        
        // try {
        //     const response = await axios.post('http://localhost:3000/newWorker', formDataToSend, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //     console.log('Submission successful', response.data);
        //     submissionSuccessful(response.data.message)
        // } catch (error) {
        //     console.error('Error submitting form', error.response.data);
        //     seterrorMessage(error.response.data.error)
        // }
    }



    // const submissionSuccessful = (message) => {
    //     withReactContent(Swal).fire({
    //         title: message,
    //         icon: "success"
    //     }).then(() => {
    //         console.log("redirecting...");
    //         navigate('/SignIn');

    //     })
    // }

    useEffect(() => {
        axios.get('http://localhost:3000/skills')
            .then(res => {
                setSkillList(res.data.map(item => ({
                    value: item.id_skill,
                    label: item.skill_name
                })))
            })
            .catch(error => {
                console.error("Ha ocurrido un error");

            })
    }, [])


    // Testing
    console.log("newWorker", newWorker);
    console.log("selectedSkills", selectedSkills);

    return (
        <>
            <Header />
            <section className="d-flex justify-content-center align-items-center py-5">
                <main className="form-signup w-100 m-auto">
                    <form id="login">
                        <div className="float-end" id="error">{errorMessage}</div>
                        <h1 className="h3 mb-3 fw-normal">Crear cuenta de trabajador</h1>
                        <div className="row g-3">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input
                                        type="name"
                                        name="firstName"
                                        value={newWorker.firstName}
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
                                        value={newWorker.lastName}
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
                                        value={newWorker.birthDate}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="floatingDate"
                                        placeholder="dd/mm/aaaa"
                                        required
                                    />
                                    <label htmlFor="floatingDate">Fecha de nacimiento</label>
                                </div>
                                <br />
                                <p>Foto de perfil</p>

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
                                        <div className="avatar-preview" >
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

                            </div>

                            <div className="col-md">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        name="email"
                                        value={newWorker.email}
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
                                        value={newWorker.phone}
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
                                        value={newWorker.password}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                                <br />
                                <p>Selecciona tus habilidades</p>


                                <MultiselectSkills options={skillList} selectedSkills={selectedSkills} onOptionChange={handleSkillChange}/>

                                {/* <div className="input-group">
                                    <select
                                        className="form-select"
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                    >
                                        <option defaultValue="">Habilidades</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                    <button className="btn btn-outline-secondary w-50" type="button">
                                        Seleccionar
                                    </button>
                                </div> */}


                            </div>
                        </div>
                        <br />
                        <p>Biografía</p>
                        <div className=" ">
                            <textarea
                                type="text"
                                name="biography"
                                className="form-control"
                                value={newWorker.biography}
                                onChange={handleInputChange}
                                id="floatingInput"
                                rows={8}
                                placeholder="Esta es tu oportunidad para destacar. Describe a los clientes:

¿Qué servicios ofreces?
¿Cuánto tiempo llevas en el sector?
¿Cuál es tu tarifa? (opcional)
¿Qué te diferencia? (certificaciones, garantías, etc.)"
                                required=""
                            />
                        </div>
                        <br />
                        <p>Fotos para tu galería</p>

                        <ImageUploader
                            imageContainers={imageContainers}
                            setImageContainers={setImageContainers}
                        />

                        {/* <div className="row g-3">
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
                        </div> */}



                    </form>
                    <br />
                    <div className="centro">
                        <button
                            onClick={saveNewUser}
                            type="submit"
                            className="btn botonregistro"
                        >
                            Registrar
                        </button>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default WorkerSignUp;