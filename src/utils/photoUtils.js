const fs = require('fs');

function savePhoto(filePath, photo, type) {
    return new Promise((next) => {
        try {
            const buffer = Buffer.from(photo.split(',')[1], "base64");
            fs.writeFileSync(`src/public/${filePath}/${type}.png`, buffer);
            next(true)
        } catch (error) {
            next(false)
        }

    });
}

module.exports = { savePhoto }