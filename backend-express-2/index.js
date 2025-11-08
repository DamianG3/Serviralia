require('dotenv').config();

/**
 * Server
 */

const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log("\nServer is Successfully Running on port " + port)
    console.log("Click here to check it out: http://localhost:" + port);
    console.log("Swagger Documentation UI: http://localhost:" + port + "/api-docs/")

})

/**
 * Routes
 */

// Swagger documentation
const { swaggerUI, swaggerDocs } = require('./config/swagger')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Serve static images
app.use(express.static('public'));

/**
 * API
 */

const userRoutes = require('./routes/user.routes')
app.use('/user', userRoutes)

const leadRoutes = require('./routes/lead.routes')
app.use('/lead', leadRoutes)

const signupRoutes = require('./routes/signup.routes')
app.use('/signup', signupRoutes)

const editRoutes = require('./routes/edit.routes')
app.use('/edit', editRoutes)

// const loginRoutes = require('./routes/login.routes')
// app.use('/login', loginRoutes)

// Home
app.get('/', (req, res) => {
    res.json({
        message: "Serviralia API - Home",
        version: '2.0.0',
        endpoint: {
            documetacion: '/api-docs',
            user: {
                search: "/user/search/:id",
                profileinfo: "/user/profileinfo/:id",
                review: "/user/review",
                skills: "/user/skills"
            },
            lead: {
                create: "/lead",
                get: "/lead/:id",
                update: "/lead/:id"
            },
            signup: {
                client: "/signup/client",
                worker: "/signup/worker"
            },
            login: {
                get: "/login",
                post: "/login",
                logout: "/login/logout"
            },
            edit: {
                getWorker: "/edit/worker/:id",
                updateWorker: "/edit/worker/:id",
                getClient: "/edit/client/:id",
                updateClient: "/edit/client/:id"
            }
        }
    })
})

// Route 404: Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

// Error managment
app.use((error, req, res, nect) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
    })
})


