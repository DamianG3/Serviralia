const express = require('express');
const router = express.Router();
const upload = require('../config/multer').upload

const controller = require('../controllers/signup.controller')

/**
 * @swagger
 *  tags: 
 *      name: Sign up
 *      description: Registering new users
 */

/**
 * @swagger
 * /signup/client:
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
 *      responses:
 *          201: 
 *              description: Client registered correctly
 *          400:
 *              description: Incomplete data
 */
router.post('/client', upload.single('pfp'), controller.newClient)



/**
 * @swagger
 * /signup/worker:
 *  post:
 *      summary: Registers a brand new worker
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
 *                          biography:
 *                              type: string
 *                          skill:
 *                              type: string
 *                          pfp:
 *                              type: string
 *                              format: binary
 *                          gallery:
 *                              type: array
 *                              items:
 *                                 type: string
 *                                 format: binary
 *      responses:
 *          201: 
 *              description: Worker registered correctly
 *          400:
 *              description: Incomplete data
 */
const uploadMiddleware = upload.fields([{ name: 'pfp' }, { name: 'gallery' }])
router.post('/worker', uploadMiddleware, controller.newWorker)

module.exports = router;