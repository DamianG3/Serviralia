import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReviewModal() {

	const [show, setShow] = useState(false);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [formData, setFormData] = useState({
		comentario: '',
		fotoResena: null,
		categoria: ''
	})

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData({
			...formData,
			[name]: files ? files[0] : value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const reviewData = {
			...formData,
			rating
		}
		alert('¡Reseña enviada con éxito! Gracias por tu feedback.');
		console.log('Review data:', reviewData);
		handleClose();
		setRating(0);
		setFormData({
			comentario: '',
			fotoResena: null,
			categoria: ''
		})
	}

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
										<span className="star">★</span>
									</button>
								))}
							</div>
						</div>

						{/* Comentario */}
						<Form.Group className="mb-3">
							<Form.Label>Tu reseña:</Form.Label>
							<Form.Control
								as="textarea"
								name="comentario"
								rows={4}
								value={formData.comentario}
								onChange={handleChange}
								required
							/>
						</Form.Group>

						{/* Subir pics */}
						<Form.Group className="mb-4">
							<Form.Label>Adjuntar foto (opcional):</Form.Label>
							<Form.Control
								type="file"
								name="fotoResena"
								accept="image/*"
								onChange={handleChange}
							/>
							<Form.Text className="text-muted">Máx. 5MB</Form.Text>
						</Form.Group>

						{/* Categoria elegir */}
						<Form.Group className="mb-4">
							<Form.Label>Categoría:</Form.Label>
							<Form.Select
								name="categoria"
								value={formData.categoria}
								onChange={handleChange}
								required
							>
								<option value="" disabled>Selecciona una categoría</option>
								<option value="plomeria">Plomería</option>
								<option value="electricidad">Electricidad</option>
							</Form.Select>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
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