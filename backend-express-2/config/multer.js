const multer = require('multer')
const path = require('path')
const fs = require('fs').promises;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log("Added image:", file);
        cb(null, Date.now() + path.extname(file.originalname))

    }
})

const upload = multer({ storage: storage })

// In case an error occurs, the image will be deleted 
const deleteCreatedImage = (imagePath) => {
    if (imagePath) {
        const fullPath = path.join(__dirname, '..', 'public', 'images', path.basename(imagePath));
        fs.unlink(fullPath)
            .then(() => console.log(`Deleted uploaded file: ${imagePath}`))
            .catch(unlinkError => console.error('Error deleting file:', unlinkError));
    }
}

module.exports = {
    upload, deleteCreatedImage
}