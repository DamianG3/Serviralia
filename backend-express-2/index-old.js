/** IGNORE - Boring session managment for web
// Session managment
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

// CORS: HTTP headers and API middleware 
const cors = require('cors')
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "userID",
    secret: "h744#WZp!DEKpM8@9c2EsPxwpnh&XT",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24
    }
}))
 */

/**
 * Log in
 */

/**
 * @swagger
 * /login:
 *  get:
 *      summary: Gets the user login information from the cookie
 *      tags: [Sign up]
 *      responses:
 *          200:
 *              description: Logged in
 *          400:
 *              description: Not logged in
 *              
 */
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.status(200).send({ loggedIn: true, user: req.session.user })
    } else {
        res.status(400).send({ loggedIn: false })

    }
})

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Returns the user login information
 *      tags: [Sign up]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: mariaf@gmail.com
 *                          password: contraseña123
 *      responses:
 *          201: 
 *              description: Successful login
 *          400:
 *              description: Incomplete data
 */

app.post('/login', (req, res) => {
    const { email, password } = req.body // desconstruccion

    const responseJSON = {};

    // Validate data
    if (!email || !password) {
        return res.status(400).json({
            error: "Datos incompletos"
        })
    }

    const qr = "SELECT id_user, id_worker, first_name, password_hash, pfp_file_name as pfp, UnreadLeads(id_worker) AS unread FROM Users LEFT JOIN Workers USING(id_user) WHERE email = ?;";

    db.promise()
        .query(qr, [email])
        .then(([resQuery]) => {
            if (!resQuery[0]) {
                // If no user match the email
                throw new Error("Correo o contraseña invalidos");
            }

            responseJSON.idUser = resQuery[0]["id_user"]
            responseJSON.idWorker = resQuery[0]["id_worker"]
            responseJSON.firstName = resQuery[0]["first_name"]
            responseJSON.pfp = resQuery[0]["pfp"]
            responseJSON.unread = resQuery[0]["unread"]

            // Compares the passwords
            return bcrypt.compare(password, resQuery[0]["password_hash"])
        })
        .then((response) => {
            if (!response) {
                throw new Error("Correo o contraseña invalidos");
            }

            req.session.user = responseJSON;
            console.log("Session user", req.session.user)

            return res.status(200).json(responseJSON)

        }).catch((err) => {
            if (err.message === "Correo o contraseña invalidos") {
                res.status(401).json({ error: err.message });
            } else {
                res.status(400).json({ error: "Hubo un error al iniciar sesión" })
                console.log(err.stack);
            }
        })

})

// Logout route
app.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            return res.status(400).json({ error: "Hubo un error al cerrar sesión" });
        }
        
        // Clear the session cookie
        res.clearCookie('connect.sid'); // 'connect.sid' is the default name
        
        res.status(200).json({message: "Cerrando sesión..."})
    });
});

