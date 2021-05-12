const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')


// Instancia da aws com as credencias

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
})

// Instancia do S3
const s3 = new aws.S3()

// configurar a storage aws S3

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_STORAGE,
    acl: 'public-read',
    key(req, file, callback) {
      callback(null, Date.now() + file.originalname)
    }
  })
})

module.exports = upload