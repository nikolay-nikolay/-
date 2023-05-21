const User = require('../models/user.js');

const messages = require('../utils/messages')
const jwt = require('jsonwebtoken');

const SECRET_KEY = '2c153e96bce2e7d121be0ab1b7c9b9e57c0f26919eb79c6f8e24772eb49c2dcf80b1e506ab30f61b57d90c0bbf871cde034cc277e3b99fa00d1ef60e987833a'

const register = function(req, res) {
  const { email, password, r_password, telegram} = req.body

  if (password !== r_password) {
    return res.json({status: false, error: messages.PASSWORD_MISMATCH})
  }

  const userModelData = {
    email: email,
    telegram: telegram
  }

  const user = new User(userModelData);
  
  User.checkUserExists(user.email)
  .then((userExist) => {
    if (userExist) {
      res.status(500).json({status: false, error: messages.USER_EXIST})
    } else {
      user.setPassword(password);
  
      user.save().then(()=>{
        // какое-то действие при успешной регистрации
        res.json({ status: true, message: messages.SUCCESS_REGISTER })
      }).catch((err)=>{
          console.log(err);
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ status: false, error: messages.SERVER_ERROR });
  });
};

const login = function(req, res) {
  const { email, password, remember} = req.body;

    // Поиск пользователя в базе данных
    User.findOne({ email: email }).then((user) => {

      if (!user) {
        // если нет в бд
        return res.json({status: false, error: messages.LOGIN_FAILED})
      }

      if (!user.checkPassword(password)) {
        return res.json({status: false, error: messages.LOGIN_FAILED });
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '365d' });

      res.json({ status: true, access_token: token, message: messages.SUCCESS_LOGIN });

    }).catch((err) => {
      console.log(err)
      console.log('Ошибка при поиске пользователя')
    });
};


const logout = function(req, res) {
  res.clearCookie('access_token');
  res.json({ status: true, message: messages.SUCCESS_LOGOUT });
};


module.exports = { register, login, logout }