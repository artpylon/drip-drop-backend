'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Upload = models.upload

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const multer = require('multer')
const multerUpload = multer({ dest: '/tmp/' })

const awsUpload = require('lib/aws-upload')

const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
        e.toJSON({ virtuals: true }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true })
  })
}

const create = (req, res, next) => {
  console.log('req body', req.body)
  const file = {
    path: req.upload.path,
    name: req.body.upload.name
  }
  // console.log(awsFile)
  awsUpload(file)
    .then((s3Response) => {
      return Upload.create({
        name: req.body.upload.name,
        url: s3Response.Location,
        folder: req.body.upload.folder,
        _owner: req.user._id
      })
    })
    .then((file) => res.status(201).json({file}))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.upload.remove()
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
  { method: multerUpload.single('upload[file]'), only: ['create'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Upload), only: ['show', 'destroy', 'update'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
