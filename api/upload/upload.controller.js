const cloudinary = require('cloudinary').v2;

async function upload(req, res, next)  {
  console.log("Files", req.files)

  cloudinary.uploader.upload(req.files.image.file, function(error, result) {
    if (error) {
      return next(error)
    }

    console.log(result, error)
    const url = result.url
  });
}

module.exports = {
  upload
}
