const express = require('express');
const router = express.Router();
const upload = require('../config/multer').upload

const controller = require('../controllers/edit.controller')


/**
 * @swagger
 *  tags: 
 *      name: Edit
 *      description: Changing account information
 */

/**
 * @swagger
 * /edit/client/{id}:
 *  get:
 *      summary: Returns the client's account information
 *      tags: [Edit]
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
router.get('/client/:id', controller.clientAccount)


/**
 * @swagger
 * /edit/worker/{id}:
 *  get:
 *      summary: Returns the worker's personal information
 *      tags: [Edit]
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
router.get('/worker/:id', controller.workerAccount)

/**
 * @swagger
 * /edit/client:
 *  put:
 *      summary: Edits the client's account information
 *      tags: [Edit]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userID:
 *                              type: integer
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
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
 *              description: Client's info was edited correctly
 *          400:
 *              description: Incomplete data
 */
router.put('/client', upload.single('pfp'), controller.editClientAccount)


/**
 * @swagger
 * /edit/worker:
 *  put:
 *      summary: Edits the workers's account information
 *      tags: [Edit]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userID:
 *                              type: integer
  *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
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
router.put('/worker', uploadMiddleware, controller.editWorkerAccount)


/**
 * @swagger
 * /edit/{id}:
 *  delete:
 *      summary: Delete the account of a client or worker
 *      tags: [Edit]
 *      parameters:
 *          - in: path
 *            name: id
 *            description: User ID
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 *          404:
 *              description: Not Found
 */
router.delete('/:id', controller.deleteAccount)


module.exports = router;