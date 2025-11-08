const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOption = {
    swaggerDefinition:{
        openapi:'3.1.0',
        info:{
            title:'Serviralia\'s API',
            version:'2.0.0',
            description:'API for the mobile app of Serviralia'
        }
    },
    apis:['./routes/*.js']
}

const swaggerDocs = swaggerJSDoc(swaggerOption)

module.exports = {
    swaggerUI, swaggerDocs
}
