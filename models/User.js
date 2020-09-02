const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  id: {type: String},
  username: { type: String },
  displayName: { type: String },
  email: { type: String},
  avatar: { type: String},
  rol: { type: String, default: 'student'},
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;