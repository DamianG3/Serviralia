
/**
 * Dependencies
 */

// Express: Server
const express = require('express');
const app = express();
const PORT = 3000;

// Swagger: Documentation and testing
const swaggerJsDocs =require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// Multer: Image upload
const multer = require('multer') // Para imagenes
const carpeta_archivos = multer({dest:'fotos'})

// MySQL2: Database server connection
const mysql = require('mysql2')

// CORS: HTTP headers and API middleware 
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

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
 *            description: skill id 
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *              
 */
app.get('/searchskill/:id', (req,res) => {
    const idSkill = parseInt(req.params.id)
    
    db.query("CALL SearchSkill(?)",
        [idSkill], (err, resQuery) => {
            if (err) {
                res.status(400).send("Hubo un error al buscar a los trabajadores")
                console.log(err.message);
                
                return
            }
            res.json(resQuery[0])
        })
})



/**
 * Sign up
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

    db.query('CALL AddNewUser(?,?,?,?,?,?,?)', 
        [firstName, lastName, email, password, pfpFileName, phone, birthDate], 
        (err, resQuery) => {
            if (err) {
                res.status(400).send("Error al registrar usuario");
                console.log(err.stack);
                
                return;
            }
            res.status(201).send("Usuario registrado exitosamente")
        }
    )
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

    // Validate data, pfpFileName can be null
    if(!firstName || !lastName || !email || !password || !phone || !birthDate || !biography || !skill || !gallery ){
        return res.status(400).json({
            error:"Datos incompletos"
        })
    }
    
    db.query('CALL AddNewWorker(?,?,?,?,?,?,? ,?,?,?)', 
        [firstName, lastName, email, password, pfpFileName, phone, birthDate, biography, JSON.stringify(skill), JSON.stringify(gallery)], 
        (err, resQuery) => {
            if (err) {
                res.status(400).send("Error al registrar usuario");
                console.log(err.stack);
                
                return;
            }
            res.status(201).send("Usuario registrado exitosamente")
        }
    )
})