const db = require('../config/db')


const methodResourse = async (req, res) => {
    try {

        // const [result] = await db.query("", [])

        res.json({
            success: true,
            message: "",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "",
            error: error.message
        })
    }
}

module.exports = {
    
    // otros metodos
}