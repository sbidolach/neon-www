const fs = require('fs')
const cloudinary = require('cloudinary')
const config = require('config')
const axios = require('axios')
const path = require('path')

cloudinary.config(config.cloudinary)

const uploadImageAndGetUrl = (image) => {
  const filePath = path.join(__dirname, '/', image.name)
  return new Promise(function (resolve, reject) {
    const stream = cloudinary.uploader
      .upload_stream(result => {
        fs.unlink(filePath)
        resolve(result.url)
      })

    image.mv(filePath, function (err) {
      if (err) reject(err)
      fs.createReadStream(filePath).pipe(stream)
    })
  })
}

exports.sendToSlack = async (req, res) => {
  const { webhook } = config.slack
  const body = req.body

  const response = await axios.post(webhook, body)

  return res.status(response.status).send({
    status: response.status,
    statusText: response.statusText
  })
}

exports.uploadImage = async (req, res) => {
  const { image } = req.files
  const url = await uploadImageAndGetUrl(image)
  return res.status(200).send(JSON.stringify(url))
}
