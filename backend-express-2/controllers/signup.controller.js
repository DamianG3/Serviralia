const db = require('../config/db')
const deleteCreatedImage = require('../config/multer').deleteCreatedImage

const bcrypt = require('bcrypt')
const saltRounds = 10


const newClient = async (req, res) => {
    const imagePath = req.file ? req.file.filename : null;
    console.log("image path:", imagePath);

    try {
        const { firstName, lastName, email, password, phone, birthDate } = req.body

        // Validate data
        if (!firstName || !lastName || !email || !password || !phone || !birthDate) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "Datos incompletos"
            })
        }

        // Check if email already exist
        const [isEmailDuplicate] = await db.query("SELECT 1 FROM users WHERE email = ?", [email])
        if (isEmailDuplicate[0]) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "El email ya existe"
            })
        }

        // Check if phone already exist
        const [isPhoneDuplicate] = await db.query("SELECT 1 FROM users WHERE phone = ?", [phone])
        if (isPhoneDuplicate[0]) {
            deleteCreatedImage(imagePath);
            return res.status(400).json({
                success: false,
                message: "El telefono ya existe"
            })
        }

        // Hashed the password
        const hash = await bcrypt.hash(password, saltRounds);


        // Creates the new user
        await db.query('CALL AddNewUser(?,?,?,?,?,?,?)',
            [firstName, lastName, email, hash, imagePath, phone, birthDate])

        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente"
        })

    } catch (error) {
        deleteCreatedImage(imagePath);
        res.status(500).json({
            success: false,
            message: "Hubo un error al registrar usuario",
            error: error.message
        })
    }
}

const newWorker = async (req, res) => {
    const pfpPath = req.files['pfp'] ? req.files['pfp'][0].filename : null;
    // console.log("pfpPath:", pfpPath);

    const galleryPath = req.files['gallery'] ? req.files['gallery'].map((file) => {
        return file.filename
    }) : null;
    // console.log("galleryPath:", galleryPath);

    try {
        const { firstName, lastName, email, password, phone, birthDate, biography, skill } = req.body

        if (!firstName || !lastName || !email || !password || !phone || !birthDate || !biography || !skill) {
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
        const [isEmailDuplicate] = await db.query("SELECT 1 FROM users WHERE email = ?", [email])
        if (isEmailDuplicate[0]) {
            deleteCreatedImage(pfpPath);
            galleryPath?.forEach(deleteCreatedImage)
            return res.status(400).json({
                success: false,
                message: "El email ya existe"
            })
        }

        // Check if phone already exist
        const [isPhoneDuplicate] = await db.query("SELECT 1 FROM users WHERE phone = ?", [phone])
        if (isPhoneDuplicate[0]) {
            deleteCreatedImage(pfpPath);
            galleryPath?.forEach(deleteCreatedImage)
            return res.status(400).json({
                success: false,
                message: "El telefono ya existe"
            })
        }

        // Hashed the password
        const hash = await bcrypt.hash(password, saltRounds);

        // Creates the new user
        const [result] = await db.query('CALL AddNewWorker(?,?,?,?,?,?,? ,?,?,?)',
            [firstName, lastName, email, hash, pfpPath, phone, birthDate, biography,
                // JSON.stringify(skill), 
                // '[' + skill + ']', 
                skill,
                JSON.stringify(galleryCheck)])

        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente"
        })

    } catch (error) {
        deleteCreatedImage(pfpPath);
        galleryPath?.forEach(deleteCreatedImage)

        res.status(500).json({
            success: false,
            message: "Error al registrar usuario",
            error: error.message
        })
    }
}

module.exports = {
    newClient,
    newWorker
}