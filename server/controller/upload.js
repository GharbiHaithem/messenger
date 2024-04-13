const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dblkrot85",
    api_key: "786779564615498",
    api_secret: "0wDogjHc7uDzx7Rg847GEeC2Xu0"
})
const uploadCtrl={
 upload: async(req, res) => {
    // Utilisez cloudinary.uploader.upload_stream pour télécharger l'image
    const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url:result.secure_url,
                        asset_id:result.asset_id,
                        public_id:result.public_id
                    }) 
                }
            });
            stream.end(fileBuffer);
        });
    };

    streamUpload(req.file.buffer)
        .then(result => {
            // Renvoyez l'URL de l'image téléchargée
            console.log(result)
            res.json({ url: result.url,public_id:result.public_id });
        })
        .catch(error => {
            console.error('Erreur lors du téléchargement de l\'image sur Cloudinary :', error);
            res.status(500).send('Erreur lors du téléchargement de l\'image sur Cloudinary.');
        });
}
}
module.exports = uploadCtrl