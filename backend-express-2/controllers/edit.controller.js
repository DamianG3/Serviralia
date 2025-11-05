const db = require('../config/db')
const deleteCreatedImage = require('../config/multer').deleteCreatedImage


const clientAccount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const [result] = await db.query("SELECT * FROM userData WHERE id = ?", [id])

        res.json({
            success: true,
            data: result[0]
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al buscar al cliente",
            error: error.message
        })
    }
}

const workerAccount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)

        const [result] = await db.query("SELECT * FROM workerData WHERE id = ?", [id])

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

const editClientAccount = async (req, res) => {
    const imagePath = req.file ? req.file.filename : null;
    console.log("image path:", imagePath);

    try {
        const { userID, firstName, lastName, email, phone, birthDate } = req.body

        // Validate data
        if (!userID || !firstName || !lastName || !email || !phone || !birthDate) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "Datos incompletos"
            })
        }

        // Check if email already exist
        const [isEmailDuplicate] = await db.query("SELECT 1 FROM users WHERE email = ? AND id_user != ?", [email, userID])
        if (isEmailDuplicate[0]) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "El email ya existe"
            })
        }

        // Check if phone already exist
        const [isPhoneDuplicate] = await db.query("SELECT 1 FROM users WHERE phone = ? AND id_user != ?", [phone, userID])
        if (isPhoneDuplicate[0]) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "El telefono ya existe"
            })
        }
        
        // Delete previous pfp
        const [pfp] = await db.query("SELECT pfp_file_name FROM users where id_user = ?", [userID])
        deleteCreatedImage(pfp[0]["pfp_file_name"]);

        await db.query('CALL EditUser(?,?,?,?,?,?,?)', [
            userID, firstName, lastName, email, imagePath, phone, birthDate
        ])

        res.status(201).json({
            success: true,
            message: "Usuario editado exitosamente"
        })

    } catch (error) {
        deleteCreatedImage(imagePath);
        res.status(500).json({
            success: false,
            message: "Hubo un error al editar usuario",
            error: error.message
        })
    }
}

const editWorkerAccount = async (req, res) => {
    const pfpPath = req.files['pfp'] ? req.files['pfp'][0].filename : null;
    // console.log("pfpPath:", pfpPath);

    const galleryPath = req.files['gallery'] ? req.files['gallery'].map((file) => {
        return file.filename
    }) : null;
    // console.log("galleryPath:", galleryPath);

    try {
        const { userID, firstName, lastName, email, phone, birthDate, biography, skill } = req.body

        // Validate data
        if (!userID || !firstName || !lastName || !email || !phone || !birthDate || !biography || !skill) {
            deleteCreatedImage(pfpPath);
            galleryPath?.forEach(deleteCreatedImage)

            return res.status(400).json({
                success: false,
                message: "Datos incompletos"
            })
        }

        // Check if gallery is not null
        // The MySQL procedure is inconsistent when 'gallery' is null
        let galleryCheck = galleryPath;
        if (galleryCheck === null) {
            galleryCheck = undefined
        }

        // Check if email already exist
        const [isEmailDuplicate] = await db.query("SELECT 1 FROM users WHERE email = ? AND id_user != ?", [email, userID])
        if (isEmailDuplicate[0]) {
            deleteCreatedImage(pfpPath);
            galleryPath?.forEach(deleteCreatedImage)
            return res.status(400).json({
                success: false,
                message: "El email ya existe"
            })
        }

        // Check if phone already exist
        const [isPhoneDuplicate] = await db.query("SELECT 1 FROM users WHERE phone = ? AND id_user != ?", [phone, userID])
        if (isPhoneDuplicate[0]) {
            deleteCreatedImage(pfpPath);
            galleryPath?.forEach(deleteCreatedImage)
            return res.status(400).json({
                success: false,
                message: "El telefono ya existe"
            })
        }

        // Delete previous pfp
        const [pfp] = await db.query("SELECT pfp_file_name FROM users where id_user = ?", [userID])
        deleteCreatedImage(pfp[0]["pfp_file_name"]);
        
        // Delete previous worker gallery
        const [gallery] = await db.query("SELECT file_name FROM WorkerGallery JOIN Workers USING (id_worker) WHERE id_user = ?", [userID])
        gallery.forEach((i) => {
            deleteCreatedImage(i["file_name"]);
        })

        await db.query('CALL EditWorker(?,?,?,?,?,?,?,?,?,?)', [
            userID, firstName, lastName, email, pfpPath, phone, birthDate, biography, skill, JSON.stringify(galleryCheck)
        ])

        res.status(201).json({
            success: true,
            message: "Usuario editado exitosamente"
        })

    } catch (error) {
        deleteCreatedImage(pfpPath);
        galleryPath?.forEach(deleteCreatedImage)

        res.status(500).json({
            success: false,
            message: "Hubo un error al editar usuario",
            error: error.message
        })
    }
}


const deleteAccount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)


        const [images] = await db.query("SELECT * FROM UserImages where id_user = ?", [id])

        // console.log(images);
        images.forEach((i) => {
            deleteCreatedImage(i["file_name"]);
        })

        const [result] = await db.query("CALL DeleteUser(?)", [id])

        res.json({
            success: true
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al buscar al cliente",
            error: error.message
        })
    }
}

module.exports = {
    clientAccount,
    workerAccount,
    editClientAccount,
    editWorkerAccount,
    deleteAccount
}