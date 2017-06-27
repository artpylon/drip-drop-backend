'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const File = models.file

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/' })

const awsUpload = require('lib/aws-upload')

const index = (req, res, next) => {
  File.find()
    .then(files => res.json({
      files: files.map((e) =>
        e.toJSON({ virtuals: true }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    file: req.file.toJSON({ virtuals: true })
  })
}

const create = (req, res, next) => {
  const awsFile = {
    path: req.file.originalname,
    title: req.body.image.title
  }
  awsUpload(awsFile)
    .then((s3Response) => {
      return File.create({
        url: s3Response.Location,
        title: s3Response.Key
      })
    })
    .then((upload) => res.status(201).json({upload}))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.file.update(req.body.file)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.file.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['destroy', 'update'] },
  { method: multerUpload.single('image[file]'), only: ['create'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(File), only: ['show', 'destroy', 'update'] },
  { method: setModel(File, { forUser: true }), only: ['update', 'destroy'] }
] })
