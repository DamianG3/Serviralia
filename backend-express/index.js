
/**
 * Dependencies
 */

// Express: Server
const express = require('express');
const app = express();
const PORT = 3000;

// Swagger: Documentation and testing
const swaggerJsDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// Multer: Image upload
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log("Added image:", file);
        cb(null, Date.now() + path.extname(file.originalname))
        
    }
})
const upload = multer({storage: storage})

// In case an error occurs, the image will be deleted 
const deleteCreatedImage = (imagePath) => {
    if (imagePath) {
        const fullPath = path.join(__dirname, '..', 'backend-express', 'images', path.basename(imagePath));
        fs.unlink(fullPath)
        .then(() => console.log(`Deleted uploaded file: ${imagePath}`))
        .catch(unlinkError => console.error('Error deleting file:', unlinkError));
    }
}

// MySQL2: Database server connection
const mysql = require('mysql2')

// CORS: HTTP headers and API middleware 
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// bcrypt: Password hashing
const bcrypt = require('bcrypt')
const saltRounds = 10



/**
 * SETUP
 */

// Make server available
app.listen(PORT, (error) =>{
    console.log();
    
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

// Connect to MySQL Server
const db = mysql.createConnection({
    host:'localhost',
    user:'serviralia_api',
    // port:'3306',
    password:'s#u&q$4g$b9%Yx9G8V4y@',
    database:'serviralia'
})

db.connect((errorDB)=>{
    if(errorDB){
        console.log("Error ocurred while connecting to MySQL Server: ");
        console.log(errorDB.stack);
        
        return;
    }
    console.log('Connected to MySQL Server');    
})

// Swagger Configuration
const swaggerOption = {
    swaggerDefinition:{
        openapi:'3.1.0',
        info:{
            title:'API de Serviralia',
            version:'1.0.0',
            description:'API de Serviralia'
        }
    },
    apis:['*.js']
}
const swaggerDocs = swaggerJsDocs(swaggerOption)
app.use('/apis-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.use('/images', express.static('images'));




/**
 * Search Page
 */

/**
 * @swagger
 * /SearchSkill/{id}:
 *  get:
 *      summary: Searches for all workers who have a specific skill
 *      tags: [Search Page]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Skill ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *              
 */
app.get('/searchskill/:id', (req,res) => {
    const idSkill = parseInt(req.params.id)
    
    db.query("CALL SearchSkill(?)", [idSkill], 
        (err, resQuery) => {
            if (err) {
                res.status(400).json({
                    error: "Hubo un error al buscar a los trabajadores"
                })
                return;
            }

            res.json(resQuery[0])
        })
})



/**
 * Sign up - Register
 */

/**
 * @swagger
 * /client:
 *  post:
 *      summary: Registers a brand new user
 *      tags: [Sign up]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          pfpFileName:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          birthDate:
 *                              type: string
 *                      example:
 *                          firstName: Juan
 *                          lastName: Perez
 *                          email: jperez@gmail.com
 *                          password: contraseña123
 *                          pfpFileName: perfil1.jpg
 *                          phone: 9981234567
 *                          birthDate: 2000-10-10
 *      responses:
 *          201: 
 *              description: Client registered correctly
 *          400:
 *              description: Incomplete data
 */

app.post('/client', (req, res)=>{
    const {firstName, lastName, email, password, pfpFileName, phone, birthDate} = req.body // desconstruccion

    // Validate data, pfpFileName can be null
    if(!firstName || !lastName || !email || !password || !phone || !birthDate){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }


    // Check if email already exist
    db.promise().query("SELECT 1 FROM users WHERE email = ?;", [email])
    .then(([isEmailDuplicate]) => {
        if (isEmailDuplicate[0]) {
            throw new Error("Email duplicated");
        }
        
        // Check if phone already exist
        return db.promise().query("SELECT 1 FROM users WHERE phone = ?;", [phone])
    }) 
    .then(([isPhoneDuplicate]) => {
        if (isPhoneDuplicate[0]) {
            throw new Error("Phone duplicated");
        }

        // Hashes the password
        return bcrypt.hash(password, saltRounds)
    })
    .then((hash) => {
        
        // Creates the new user
        return db.promise().query('CALL AddNewUser(?,?,?,?,?,?,?)', 
            [firstName, lastName, email, hash, pfpFileName, phone, birthDate])
    })
    .then(() => {
        res.status(201).json({
            message:"Usuario registrado exitosamente"
        })
    })
    .catch((err) => {
        if (err.message === "Email duplicated") {
            res.status(400).json({ error: "El email ya existe" });
        } else if (err.message === "Phone duplicated") {
            res.status(400).json({ error: "El telefono ya existe" });
        } else {
            res.status(400).json({ error: "Error al registrar usuario" });
            console.log(err.stack);
        }
    });
})


// Register sending images with multer
/**
 * @swagger
 * /newclient:
 *  post:
 *      summary: Registers a brand new user
 *      tags: [Sign up]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          birthDate:
 *                              type: string
 *                          pfp:
 *                              type: string
 *                              format: binary
 *                      example:
 *                          firstName: Juan
 *                          lastName: Perez
 *                          email: jperez@gmail.com
 *                          password: contraseña123
 *                          phone: 9981234567
 *                          birthDate: 2000-10-10
 *      responses:
 *          201: 
 *              description: Client registered correctly
 *          400:
 *              description: Incomplete data
 */

app.post('/newclient',  upload.single('pfp'), (req, res)=>{
    const {firstName, lastName, email, password, phone, birthDate} = req.body // desconstruccion
    const imagePath = req.file ? req.file.filename : null;
    console.log("image path:", imagePath);
    
    // Validate data, pfpFileName can be null
    if(!firstName || !lastName || !email || !password || !phone || !birthDate){
        deleteCreatedImage(imagePath);

        return res.status(400).json({
            error:"Datos incompletos"
        })
    }
    
    // Check if email already exist
    db.promise().query("SELECT 1 FROM users WHERE email = ?;", [email])
    .then(([isEmailDuplicate]) => {
        if (isEmailDuplicate[0]) {
            throw new Error("Email duplicated");
        }
        
        // Check if phone already exist
        return db.promise().query("SELECT 1 FROM users WHERE phone = ?;", [phone])
    }) 
    .then(([isPhoneDuplicate]) => {
        if (isPhoneDuplicate[0]) {
            throw new Error("Phone duplicated");
        }

        // Hashes the password
        return bcrypt.hash(password, saltRounds)
    })
    .then((hash) => {
        
        // Creates the new user
        return db.promise().query('CALL AddNewUser(?,?,?,?,?,?,?)', 
            [firstName, lastName, email, hash, imagePath, phone, birthDate])
    })
    .then(() => {
        res.status(201).json({
            message:"Usuario registrado exitosamente"
        })
    })
    .catch((err) => {
        deleteCreatedImage(imagePath);

        if (err.message === "Email duplicated") {
            res.status(400).json({ error: "El email ya existe" });
        } else if (err.message === "Phone duplicated") {
            res.status(400).json({ error: "El telefono ya existe" });
        } else {
            res.status(400).json({ error: "Error al registrar usuario" });
            console.log(err.stack);
        }
    });
})


/**
 * @swagger
 * /worker:
 *  post:
 *      summary: Registers a brand new worker
 *      tags: [Sign up]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          pfpFileName:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          birthDate:
 *                              type: string
 *                          biography:
 *                              type: string
 *                          skill:
 *                              type: array
 *                              items:
 *                                  type: integer
 *                          gallery:
 *                              type: array
 *                              items:
 *                                  type: string
 *                      example:
 *                          firstName: Maria
 *                          lastName: Flores
 *                          email: mariaf@gmail.com
 *                          password: contraseña123
 *                          pfpFileName: perfilTrabajador1.jpg
 *                          phone: 9987654321
 *                          birthDate: 2000-10-10
 *                          biography: Trabajo muy bien
 *                          skill: [2,3]
 *                          gallery: ["wk1.jpg", "wk2.jpg"]
 *      responses:
 *          201: 
 *              description: Worker registered correctly
 *          400:
 *              description: Incomplete data
 */

app.post('/worker', (req, res)=>{
    const {firstName, lastName, email, password, pfpFileName, phone, birthDate, biography, skill, gallery} = req.body // desconstruccion

    // Validate data, pfpFileName and gallery can be null
    if(!firstName || !lastName || !email || !password || !phone || !birthDate || !biography || !skill){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }

    // Check if gallery is not null
    // The MySQL procedure is inconsistent when 'gallery' is null
    let galleryCheck = gallery;
    if (galleryCheck === null) {
        galleryCheck = undefined
    }

    
    // Check if email already exist
    db.promise().query("SELECT 1 FROM users WHERE email = ?;", [email])
    .then(([isEmailDuplicate]) => {
        if (isEmailDuplicate[0]) {
            throw new Error("Email duplicated");
        }
        
        // Check if phone already exist
        return db.promise().query("SELECT 1 FROM users WHERE phone = ?;", [phone])
    }) 
    .then(([isPhoneDuplicate]) => {
        if (isPhoneDuplicate[0]) {
            throw new Error("Phone duplicated");
        }

        // Hashes the password
        return bcrypt.hash(password, saltRounds)
    })
    .then((hash) => {
        
        // Creates the new user
        return db.promise().query('CALL AddNewWorker(?,?,?,?,?,?,? ,?,?,?)', 
            [firstName, lastName, email, hash, pfpFileName, phone, birthDate, biography, JSON.stringify(skill), JSON.stringify(galleryCheck)])
    })
    .then(() => {
        res.status(201).json({
            message:"Usuario registrado exitosamente"
        })
    })
    .catch((err) => {
        if (err.message === "Email duplicated") {
            res.status(400).json({ error: "El email ya existe" });
        } else if (err.message === "Phone duplicated") {
            res.status(400).json({ error: "El telefono ya existe" });
        } else {
            res.status(400).json({ error: "Error al registrar usuario" });
            console.log(err.stack);
        }
    });


})

/**
 * Log in
 */


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

app.post('/login', (req, res)=>{
    const {email, password} = req.body // desconstruccion

    const responseJSON = {};

    // Validate data
    if(!email || !password){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }

    db.promise()
    .query("SELECT id_user, id_worker, first_name, password_hash FROM Users LEFT JOIN Workers USING(id_user) WHERE email = ?;", [email])
    .then(([resQuery]) => {
        if (!resQuery[0]) {
            // If no user match the email
            throw new Error("Correo o contraseña invalidos");
        }

        responseJSON.idUser = resQuery[0]["id_user"]
        responseJSON.idWorker = resQuery[0]["id_worker"]
        responseJSON.firstName = resQuery[0]["first_name"]

        // Compares the passwords
        return bcrypt.compare(password, resQuery[0]["password_hash"])
    })
    .then((response) => {
        if (!response) {
            throw new Error("Correo o contraseña invalidos");
        }
        
        return res.status(200).json(responseJSON)

    }).catch((err) => {
        if (err.message === "Correo o contraseña invalidos"){
            res.status(401).json({ error: err.message });
        } else {
            res.status(400).json({error: "Hubo un error al iniciar sesión"})
            console.log(err.stack);
        }
    })

})


/**
 * Edit profile Page
 */

/**
 * @swagger
 * /clientinfo/{id}:
 *  get:
 *      summary: Returns the client's personal information
 *      tags: [Edit profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Client ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 */
app.get('/clientinfo/:id', (req,res) => {
    const idClient = parseInt(req.params.id)
    
    db.query("SELECT * FROM userData WHERE id = ?", [idClient], 
        (err, resQuery) => {
            if (err) {
                res.status(400).json({
                    error: "Hubo un error al buscar al cliente"
                })
                return;
            }

            if (!resQuery[0]) {
                return res.status(404).json({
                    error: "No se pudo encontrar al cliente"
                })
            }

            res.json(resQuery[0])
        })
})

/**
 * @swagger
 * /workerinfo/{id}:
 *  get:
 *      summary: Returns the worker's personal information
 *      tags: [Edit profile]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Worker ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 */
app.get('/workerinfo/:id', (req,res) => {
    const idClient = parseInt(req.params.id)
    
    db.query("SELECT * FROM workerData WHERE id = ?", [idClient], 
        (err, resQuery) => {
            if (err) {
                res.status(400).json({
                    error: "Hubo un error al buscar al trabajador"
                })

                console.log(err.stack);
                
                return;
            }

            if (!resQuery[0]) {
                return res.status(404).json({
                    error: "No se pudo encontrar al trabajador"
                })
            }

            res.json(resQuery[0])
        })
})



/**
 * Worker’s profile
 */

/**
 * @swagger
 * /profileinfo/{id}:
 *  get:
 *      summary: Returns all of the worker profile information
 *      tags: [Worker Profile Page]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Worker ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 *              
 */
app.get('/profileinfo/:id', (req,res) => {
    const idWorker = parseInt(req.params.id)

    const responseJSON = { info: {}, ratings: {}, reviews: {} };

    // 1. First query (Worker Info)
    db.promise()
        .query("SELECT * FROM AllWorkers WHERE id = ?", [idWorker])
        .then(([infoResults]) => {
            if (!infoResults[0]) {
                throw new Error("Worker not found");
            }
            responseJSON.info = infoResults[0];
            
            // 2. Second query (Ratings)
            return db.promise().query("SELECT * FROM WorkersRatingSummary WHERE id = ?", [idWorker]);
        })
        .then(([ratingsResults]) => {
            responseJSON.ratings = ratingsResults;
            
            // 3. Third query (Reviews)
            return db.promise().query("SELECT * FROM AllReviews WHERE id = ?", [idWorker]);
        })
        .then(([reviewsResults]) => {
            responseJSON.reviews = reviewsResults;
            res.json(responseJSON); // Send final response after all queries
        })
        .catch((err) => {
            if (err.message === "Worker not found") {
                res.status(404).json({ error: "No se pudo encontrar al trabajador" });
            } else {
                res.status(400).json({ error: "Hubo un error al buscar información" });
            }
        });


})


/**
 * @swagger
 * /review:
 *  post:
 *      summary: Creates a new lead
 *      tags: [Worker Profile Page]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_worker:
 *                              type: integer
 *                          id_client:
 *                              type: integer
 *                          rating:
 *                              type: integer
 *                          review:
 *                              type: string
 *                          skill:
 *                              type: integer
 *                          gallery:
 *                              type: array
 *                              items:
 *                                  type: string
 *                      example:
 *                          id_worker: 1
 *                          id_client: 20
 *                          rating: 5
 *                          review: Muy buen trabajo
 *                          skill: 1
 *                          gallery: ["img.png", "img2.png"]
 *      responses:
 *          201: 
 *              description: Lead created
 *          400:
 *              description: Incomplete data
 */

app.post('/review', (req, res)=>{
    const {id_worker,id_client,rating,review,skill,gallery} = req.body 

    // Validate data, gallery can be null
    if(!id_worker || !id_client || !rating || !review || !skill){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }
    
    db.query('CALL AddReview(?,?,?,?,?,?);', 
        [id_worker,id_client,rating,review,skill, JSON.stringify(gallery)], 
        (err) => {
            if (err) {
                res.status(400).json({
                    error:"Error al enviar información"
                })
                console.log(err.stack);
                
                return;
            }
            res.status(201).json({
                message:"Información enviada correctamente"
            })
        }
    )
})

/**
 * @swagger
 * /lead:
 *  post:
 *      summary: Creates a new lead
 *      tags: [Worker Profile Page]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id_worker:
 *                              type: integer
 *                          id_client:
 *                              type: integer
 *                          title:
 *                              type: string
 *                          details:
 *                              type: string
 *                      example:
 *                          id_worker: 1
 *                          id_client: 19
 *                          title: Necesito un trabajo
 *                          details: Es una simple reparacion
 *      responses:
 *          201: 
 *              description: Lead created
 *          400:
 *              description: Incomplete data
 */

app.post('/lead', (req, res)=>{
    const {id_worker, id_client, title, details} = req.body // desconstruccion

    // Validate data, pfpFileName can be null
    if(!id_worker || !id_client || !title || !details){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }
    
    db.query('CALL AddLead(?,?,?,?);', 
        [id_worker, id_client, title, details], 
        (err) => {
            if (err) {
                res.status(400).json({
                    error:"Error al enviar información"
                })
                console.log(err.stack);
                
                return;
            }
            res.status(201).json({
                message:"Información enviada correctamente"
            })
        }
    )
})

/**
 * Leads Page
 */

/**
 * @swagger
 * /leads/{id}:
 *  get:
 *      summary: Returns the information of the interested clients 
 *      tags: [Leads Page]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Worker ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 */
app.get('/leads/:id', (req,res) => {
    const idWorker = parseInt(req.params.id)
    
    db.query("SELECT * FROM AllLeads WHERE id = ?", [idWorker], 
        (err, resQuery) => {
            if (err) {
                res.status(400).json({
                    error: "Hubo un error al buscar al trabajador"
                })
                return;
            }

            if (!resQuery[0]) {
                return res.status(404).json({
                    error: "No se pudo encontrar al trabajador"
                })
            }            

            res.json(resQuery)
        })
})


/**
 * @swagger
 * /lead/{id}:
 *  patch:
 *      summary: Updates the archived status of a lead
 *      tags: [Leads Page]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Lead ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          archivedFlag:
 *                              type: boolean
  *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 */
app.patch('/lead/:id', (req,res) => {
    const idLead = parseInt(req.params.id)
    const {archivedFlag} = req.body;    
    
    db.query("CALL updateArchivedLead(?,?);", [idLead, archivedFlag], 
        (err, resQuery) => {
            if (err) {
                res.status(400).json({
                    error: "Hubo un error al buscar al trabajador"
                })

                console.log(err.stack);
                return;
            }

            if (!resQuery[0]) {
                return res.status(404).json({
                    error: "No se pudo encontrar al trabajador"
                })
            }            

            res.json(resQuery[0])
        })
})

