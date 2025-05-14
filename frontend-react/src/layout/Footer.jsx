import '../css/style.css'

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-column">
                    <p>
                        <strong>Serviralia Cancún</strong>
                    </p>
                    <p>
                        <a href="mailto:serviralia.mx@gmail.com">serviralia.mx@gmail.com</a>
                    </p>
                </div>
                <div className="footer-column">
                    <p>
                        <a href="#">Quiero publicarme</a> |{" "}
                        <a href="#">Términos y condiciones</a>
                    </p>
                    <p>Copyright © 2025 Serviralia. All Rights Reserved.</p>
                </div>
                <div className="footer-column">
                    <p>
                        <strong>Síguenos</strong>
                    </p>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Tik Tok</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer