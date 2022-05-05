const mongoose = require('mongoose')

var companySchema = new mongoose.Schema(
  {
    nom: String,
    siteWeb: {
      type: String,
      default: "www.test.com",
      required: true
    },
    license: {
        type: Number,
        min: 0
    },
    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Company', companySchema)
