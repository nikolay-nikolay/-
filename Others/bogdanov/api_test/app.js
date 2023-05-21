const express = require("express");
const path = require('path');
const localStorage = require('localStorage');
const crypto = require('crypto');
const cors = require('cors')
const {Test,User} = require('./db-config')
const toHex = require('to-hex');
const { stat } = require("fs");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


PORT = 3001



// app.post(`/createst` , async function(request, response){
//     const { title, description, questions } = request.body;
//     await Test.create({title:title,description:description,questions:questions,countViewed:0,countSolved:0}).then(
//       response.send("Успешно создано!")
//     )
    
// })

// app.get(`/getalltest` , async function(request, response){
//   await Test.findAll().then(test => response.json(test))
// })

// app.get('/test/get/:id', async (request, response) => {
//   const { id } = request.params;


//   const getTestById = await Test.findOne({ where: { id: id } });
//   getTestById.countViewed++
//   await getTestById.save();
//   response.status(200).json(getTestById)
// })


// app.post(`/test/:id/check-answers` , async function(request, response){
//   const { id } = request.params;
//   const { answers } = request.body;

//   try {
//     const test = await Test.findOne({ where: { id: id } });

//     if (!test) {
//       return response.status(404).json({ message: "Test not found" });
//     }
    

//     let score = 0;

//     const questions = [];

//     for (let i = 0; i < test.questions.length; i++) {
//       const q = test.questions[i];
//       const userAnswer = answers[i];
//       const correctAnswers = q.answers.filter(a => a.correct).map(a => a.text);

//       questions.push({
//         question: q.question,
//         answers: q.answers,
//         selectedAnswer: userAnswer ? userAnswer.value : null,
//       });

//       if (userAnswer && correctAnswers.includes(userAnswer.value)) {
//         score++;
//       }
//     }

//     const result = {
//       score,
//       total: test.questions.length,
//       questions: questions
//     };
    
//     test.countSolved++;
//     await test.save();

//     response.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ message: "Server error" });
//   }
// });


app.get(`/reg/:login/:password` , async function(request, response){
  let login = request.params.login
  const token = crypto.randomBytes(16).toString('hex');
  let status
  let password = toHex(request.params.password)
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  var re2 = /^[a-zA-Z\-]+$/;
  let check_password = re.test(password);
  let nameRegex = re2.test(login);
  const project = await User.findOne({ where: { login: login , password : password } });
  if (password === "" || login == "" || check_password === false || nameRegex === false){
    status = {status: "Введено недопустимое значение"}
  }
  if (project === null) {
      await User.create({login:login,password:password,token:token}).then(
      status = {status : "Пользователь создан"},
      localStorage.setItem('user', login)
  )
  } else {
    status = {status : "Пользователь существует"}
  }
  response.send(status)
})

app.post(`/login` , async function(request, response){
  let status = ""
  const { login , password } = request.body;

  const user = await User.findOne({ where: { login: login , password: toHex(password)} })
  console.log(user)
  if (user == null){
        status = {status : "Данного пользователя не существует"}
  }
  if (user != null){
        status = {status : "Вы успешно вошли",login : user.login}
      }
  response.send(status)
})


app.post(`/userfind` , async function(request, response){
  const { login , password } = request.body;
  const user = await User.findOne({ where: { login: login , password : toHex(password)} })
  if (user!=null){
    let user_info = {username:user.login,token:user.token}
    response.send(user_info)
  }
})

app.post(`/checktoken` , async function(request, response){
  const { token } = request.body;
  let status = ""
  let find_user =  await User.findOne({ where: { token :  token} })
  if (find_user == null){
    status = {status : "Данного пользователя не существует"}
  }
  if (find_user != null){
    status = {username:find_user.login,img:find_user.img,status_auth:"Вы успешно вошли",status:find_user.admin}
  }
  response.send(status)
})


// app.get(`/popular` , async function(request, response){
//   await Test.findAll({
//     order: [['countSolved', 'DESC']]
//   }).then(test => response.json(test))
// })


app.get(`/editadmin/:login/:bool` , async function(request, response){
  let login = request.params.login
  let bool = request.params.bool
  let status
  const login_valid = await User.findOne({ where: { login: login} })
  if (login_valid === null) {
    status = {status : "Пользователя не существует"}
  } else {
    const user = await User.findOne({ where: { login: login} }).then(post => post.update({admin:bool}))
    status = {status : `Пользователь ${login} статус админки ${bool}`}
}
response.send(status)
})

// app.get('/test/redaction/:id', async (request, response) => {
//   const { id } = request.params;
//   const getTestById = await Test.findOne({ where: { id: id } });
//   response.status(200).json(getTestById)
// })

// app.put(`/updatetest/:id`, async function(request, response) {
//   const id = request.params.id;
//   const { title, description, questions } = request.body;

//   await Test.update(
//     { title, description, questions },
//     { where: { id } }
//   ).then(() => {
//     response.send("Успешно обновлено!");
//   });
// });

// app.delete('/deletetest/:id', async (request, response) => {
//   const { id } = request.params;
//   await Test.destroy({ where: { id } });
//   response.json({ message: 'Тест удален' });
// });



app.listen(PORT , () => {
  console.log(`Сервер Запущен на http://localhost:${PORT}`)
});