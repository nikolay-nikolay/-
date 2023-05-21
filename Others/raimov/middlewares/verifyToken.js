const jwt = require('jsonwebtoken');
const SECRET_KEY = '2c153e96bce2e7d121be0ab1b7c9b9e57c0f26919eb79c6f8e24772eb49c2dcf80b1e506ab30f61b57d90c0bbf871cde034cc277e3b99fa00d1ef60e987833a'
const messages = require('../utils/messages')

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // получаем токен из кук
  if (!token) {
    return res.status(401).json({ status: false, message: messages.NOT_AUTHORIZED });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // проверяем действительность токена
    req.user = decoded; // добавляем объект пользователя в запрос
    next(); // пропускаем дальше
  } catch (err) {
    return res.status(401).json({ status: false, error: messages.NOT_AUTHORIZED});
  }
}

module.exports = verifyToken
