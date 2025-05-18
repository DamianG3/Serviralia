import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button, Form } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ImageUploader from './ImageUploader';
import { UserContext } from "../App"; // Import UserContext from App.jsx


function ReviewModal({ idWorker, skillList }) {
	const [errorMessage, seterrorMessage] = useState('')
	// Star rating
	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(0);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		if (user.loggedIn) {
			setShow(true)
		} else {
			mostrarMensaje("Crea una cuenta o inicia sesión para escribir una reseña", 'error');
		}
	};

	// Form data
	const user = useContext(UserContext);
	const [skillListOpt, setSkillListOpt] = useState([])
	const [rating, setRating] = useState(0);
	const [formData, setFormData] = useState({
		id_client: 0,
		review: '',
		skill: 0
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value })
	}

	useEffect(() => {
		axios.get('http://localhost:3000/skills')
			.then(res => {
				console.log("Skills", res.data);
				setSkillListOpt(
					res.data.filter(item => skillList.includes(item.skill_name))
				)
			})
			.catch(error => {
				console.error("Ha ocurrido un error");

			})
	}, [skillList])
	useEffect(() => {
		if (user.loggedIn) {
			// console.log("id User", user.user.idUser);
			setFormData({ ...formData, id_client: user.user.idUser })

		} else {
			// console.log("USER NOT LOGGED IN");
		}

	}, [user])

	// Galeria de imagenes
	const [imageContainers, setImageContainers] = useState([{
		id: 1,
		file: null,    // For the File object
		preview: null  // For the base64 preview
	}]);




	const handleSubmit = (e) => {
		seterrorMessage("")
		e.preventDefault();

		const formDataToSend = new FormData();

		imageContainers.forEach((container) => {
			// console.log("container:", container);
			if (container.file) {
				// console.log("file:", container.file);
				formDataToSend.append(`gallery`, container.file);
			}
		});

		formDataToSend.append('id_worker', idWorker)
		formDataToSend.append('id_client', formData.id_client)
		formDataToSend.append('rating', rating)
		formDataToSend.append('review', formData.review)
		formDataToSend.append('skill', formData.skill)


		const response = axios.post('http://localhost:3000/newreview', formDataToSend, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((response) => {

			console.log('Submission successful', response.data);
			mostrarMensaje('¡Reseña enviada con éxito! Gracias por tu feedback.', 'success')
			handleClose();
			setRating(0);
			setFormData({
				review: '',
				skill: ''
			})
		}).catch((error) => {
			console.error('Error submitting form', error.response.data);
			seterrorMessage(error.response.data.error)
		})
		// finish
		// alert('¡Reseña enviada con éxito! Gracias por tu feedback.');
		// handleClose();
		// setRating(0);
		// setFormData({
		// 	review: '',
		// 	skill: ''
		// })
	}


	const mostrarMensaje = (mensaje, tipo) => {
		withReactContent(Swal).fire({
			position: "top",
			icon: tipo,
			title: mensaje,
			showConfirmButton: true
		})
	}

	// Testing
	// console.log("skillListOpt", skillListOpt);
	console.log("formData", formData);
	// console.log("imageContainers", imageContainers);



	return (
		<>
			<Button variant="btn btn-primary" onClick={handleShow}>
				Escribir Reseña
			</Button>

			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Escribe tu reseña</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						{/* Calificacion con estrellas */}
						<div className="mb-4">
							<Form.Label>Calificación:</Form.Label>
							<div className="star-rating">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										type="button"
										key={star}
										className={star <= (hover || rating) ? "on" : "off"}
										onClick={() => setRating(star)}
										onMouseEnter={() => setHover(star)}
										onMouseLeave={() => setHover(rating)}
									>
										{/* <span className="star">★</span> */}
										<svg xmlns="http://www.w3.org/2000/svg" className="star" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
											<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
										</svg>
									</button>
								))}
							</div>
						</div>

						{/* Categoria elegir */}
						<Form.Group className="mb-4">
							<Form.Label>Categoría:</Form.Label>
							<Form.Select
								name="skill"
								value={formData.skill}
								onChange={handleChange}
								required
							>
								<option value="">Selecciona una categoría</option>

								{skillListOpt?.map((value) => (
									<option value={value.id_skill}>{value.skill_name}</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Comentario */}
						<Form.Group className="mb-3">
							<Form.Label>Tu reseña:</Form.Label>
							<Form.Control
								as="textarea"
								name="review"
								rows={4}
								value={formData.review}
								onChange={handleChange}
								placeholder='Describe tu experiencia con el servicio: ¿Qué te gustó? ¿El resultado cumplió con tus expectativas?'
								required
							/>
						</Form.Group>


						{/* Subir pics */}

						<ImageUploader
							imageContainers={imageContainers}
							setImageContainers={setImageContainers}
						/>

						{/* <Form.Group className="mb-4">
							<Form.Label>Adjuntar foto (opcional):</Form.Label>
							<Form.Control
								type="file"
								name="fotoResena"
								accept="image/*"
								onChange={handleChange}
							/>
							<Form.Text className="text-muted">Máx. 5MB</Form.Text>
						</Form.Group> */}



					</Modal.Body>
					<Modal.Footer>
						<div className="me-4" id="error">{errorMessage}</div>
						<Button variant="btn btn-secondary" onClick={handleClose}>
							Cancelar
						</Button>
						<span>
							<Button variant="btn btn-primary" type="submit">
								Enviar reseña
							</Button>
						</span>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default ReviewModal;