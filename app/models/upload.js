'use strict'

const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  folder: {
    type: String,
    required: true
  },
  pendingReview: {
    type: Boolean,
    required: false
  },
  complete: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Upload = mongoose.model('Upload', uploadSchema)

module.exports = Upload
