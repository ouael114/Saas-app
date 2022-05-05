const mongoose = require('mongoose')
const Roles = require('./enums')

var userSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: Roles.MEMBER,
        enum: Object.values(Roles)
    },
    companyId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('User', userSchema)
