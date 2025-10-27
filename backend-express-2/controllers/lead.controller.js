const db = require('../config/db')


const createLead = async (req, res) => {
    try {
        const { id_worker, id_client, title, details } = req.body
         
        // Validate data
        if (!id_worker || !id_client || !title || !details) {
            return res.status(400).json({
                success: false,
                message: "Datos incompletos"
            })
        }

        await db.query('CALL AddLead(?,?,?,?);',
        [id_worker, id_client, title, details])


        res.status(201).json({
            success: true,
            message: "Información enviada correctamente"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al crear el lead",
            error: error.message
        })
    }   
}

const getLeadByID = async (req, res) => {
    try {
        const idWorker = parseInt(req.params.id)

        const [result] = await db.query("SELECT * FROM AllLeads WHERE id = ?", [idWorker])

        res.json({
            success: true,
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al buscar al trabajador",
            error: error.message
        })
    }
}

const archiveLead = async (req, res) => {
    try {
        const { id, archivedFlag } = req.body;

        const [result] = await db.query("CALL updateArchivedLead(?,?);", [id, archivedFlag])

        res.json({
            success: true,
            data: result[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al buscar al trabajador",
            error: error.message
        })
    }
}


module.exports = {
    createLead,
    getLeadByID,
    archiveLead
    // otros metodos
}