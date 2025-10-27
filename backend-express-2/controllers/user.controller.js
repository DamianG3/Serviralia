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
                error: "Datos incompletos"
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

module.exports = {
    createReview
    // otros metodos
}