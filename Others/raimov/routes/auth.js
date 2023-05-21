const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
// контроллеры
const authController = require('../controllers/authController') 

// обрабатываем POST-запрос на регистрацию
router.post('/register', authController.register);

// обрабатываем POST-запрос на вход
router.post('/login', authController.login);

// обрабатываем GET-запрос на выход
router.get('/logout', verifyToken, authController.logout);

router.get('/', verifyToken, function(req, res) {
    
    res.json( req.cookies )

    // Ваш код для защищенного маршрута
  });

module.exports = router;
