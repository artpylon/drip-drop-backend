const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
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
  tag: {
    type: String,
    required: false,
    enum: ['New', 'Pending', 'Complete']
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
