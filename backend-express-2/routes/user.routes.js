const express = require('express');
const router = express.Router();
const upload = require('../config/multer').upload

const controller = require('../controllers/user.controller')

/**
 * @swagger
 *  tags: 
 *      name: User
 *      description: User actions
 */

/**
 * @swagger
 * /user/review:
 *  post:
 *      summary: Creates a new review
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
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
 *                                 type: string
 *                                 format: binary
 *      responses:
 *          201: 
 *              description: Lead created
 *          400:
 *              description: Incomplete data
 */
router.post('/review', upload.array('gallery'), controller.createReview)


module.exports = router;