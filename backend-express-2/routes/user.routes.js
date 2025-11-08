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

// ------------------------------------------ SKILLS ------------------------------------------

/**
 * @swagger
 * /user/skills:
 *  get:
 *      summary: Searches for all skills
 *      tags: [User]
 *      responses:
 *          200:
 *              description: OK
 *          400:
 *              description: Database error
 */
router.get('/skills', controller.getAllSkills)

/**
 * @swagger
 * /user/SearchSkill/{id}:
 *  get:
 *      summary: Searches for all workers who have a specific skill
 *      tags: [User]
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
router.get('/SearchSkill/:id', controller.searchSkill)

/**
 * @swagger
 * /user/profileinfo/{id}:
 *  get:
 *      summary: Returns all of the worker profile information
 *      tags: [User]
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
router.get('/profileinfo/:id', controller.getProfileInfo)

module.exports = router;