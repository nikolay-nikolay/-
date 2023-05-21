const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  telegram: { type: String },
  balance: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  reasonBan: { type: String },
  date: { type: Date, default: new Date()},
  
});

UserSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.checkUserExists = function(email) {
  return this.findOne({ email: email }).then((user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  }).catch((err) => {
    return { error: 'Ошибка при поиске пользователя' };
  });
};

module.exports = mongoose.model('User', UserSchema);
