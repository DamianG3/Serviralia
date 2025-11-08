const express = require('express');
const router = express.Router();

const leadController = require('../controllers/lead.controller')

/**
 * @swagger
 *  tags: 
 *      name: Leads
 *      description: Worker lead information
 */

/**
 * @swagger
 * /lead:
 *  post:
 *      summary: Creates a new lead
 *      tags: [Leads]
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
router.post('/', leadController.createLead)

/**
 * @swagger
 * /lead/{id}:
 *  get:
 *      summary: Returns the information of the interested clients 
 *      tags: [Leads]
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
router.get('/:id', leadController.getLeadByID)     

/**
 * @swagger
 * /lead:
 *  patch:
 *      summary: Updates the archived status of a lead
 *      tags: [Leads]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: number
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
router.patch('/', leadController.archiveLead)



module.exports = router;