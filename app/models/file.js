const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    type: Boolean
  },
  complete: {
    type: Boolean
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

const File = mongoose.model('File', fileSchema)

module.exports = File
