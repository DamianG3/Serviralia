const db = require('../config/db')
const deleteImage = require('../config/multer').deleteCreatedImage


const createReview = async (req, res) => {
    const galleryPath = req.files ? req.files.map((file) => {
        return file.filename
    }) : null;

    // console.log("req.files\n",req.files);
    // console.log("galleryPath\n", galleryPath);


    try {
        const { id_worker, id_client, rating, review, skill } = req.body

        // Validate data
        if (!id_worker || !id_client || !rating || !review || !skill) {
            galleryPath?.forEach(deleteImage) // test

            return res.status(400).json({
                success: false,
                message: "Datos incompletos"
            })
        }

        // Check if gallery is not null
        // The MySQL procedure is inconsistent when 'gallery' is null
        let galleryCheck = galleryPath;
        if (galleryCheck.length === 0) {
            galleryCheck = undefined
        }

        const [result] = await db.query('CALL AddReview(?,?,?,?,?,?);',
            [id_worker, id_client, rating, review, skill,
                JSON.stringify(galleryCheck)
                // undefined
            ])

        res.json({
            success: true,
            message: "Información enviada correctamente"
        })
    } catch (error) {
        galleryPath?.forEach(deleteImage)

        res.status(500).json({
            success: false,
            message: "Error al enviar información",
            error: error.message
        })
    }
}


const getAllSkills = async (req, res) => {
    try {
        const [skills] = await db.query('SELECT * FROM Skills order by id_skill');
        res.json({
            success: true,
            data: skills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al obtener las skills',
            error: error.message
        });
    }
}

const searchSkill = async (req, res) => {
    try {
        // If an ID is not send, the database returns all the workers ranked
        const id = parseInt(req.params.id)
        const idSkill = isNaN(id) ? null : id;

        const [result] = await db.query("CALL SearchSkill(?)", [idSkill]);

        // console.log(result[0].length);

        if (result[0].length === 0) {
            return res.status(400).json({
                success: false,
                message: 'El skill ID no existe'
            })
        }

        res.json({
            success: true,
            data: result[0]
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al buscar a los trabajadores',
            error: error.message
        })
    }
}

const getWorkerInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const [worker] = await db.query('SELECT * FROM workerData WHERE id = ?', [id]);

        if (worker.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'trabajador no encontrado'
            });
        }

        res.json({
            success: true,
            data: worker[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al obtener el trabajador',
            error: error.message
        });
    }
}

const getProfileInfo = async (req, res) => {
    try {
        const idWorker = parseInt(req.params.id)
        const responseJSON = {
            info: {},
            ratings: {},
            reviews: {}
        }

        // 1. First query (Worker Info)
        const [infoResults] = await db.query("SELECT * FROM AllWorkers WHERE id = ?", [idWorker]);
        if (infoResults.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'trabajador no encontrado'
            });
        }
        responseJSON.info = infoResults[0];

        // 2. Second query (Ratings)
        const [ratingsResults] = await db.query("SELECT * FROM WorkersRatingSummary WHERE id = ?", [idWorker]);
        responseJSON.ratings = ratingsResults;

        // 3. Third query (Reviews)
        const [reviewsResults] = await db.query("SELECT * FROM AllReviews WHERE id = ?", [idWorker]);
        responseJSON.reviews = reviewsResults;

        // Final response with all queries
        res.json({
            success: true,
            data: responseJSON
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error al obtener el perfil del trabajador',
            error: error.message
        });
    }
}

module.exports = {
    createReview,
    getAllSkills,
    searchSkill,
    getProfileInfo
}