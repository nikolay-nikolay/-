const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/database.sqlite`
  })
  


  // const Test = sequelize.define(
  //   'Test',
  //   {
  //     title: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     description: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     questions: {
  //       type: DataTypes.JSONB,
  //       allowNull: false,
  //     },
  //     countSolved:{
  //       type: DataTypes.NUMBER,
  //       defaultValue : 0,
  //     },
  //     countViewed: { 
  //       type: DataTypes.NUMBER,
  //       defaultValue : 0,
  //     },
  //     // rating: { 
  //     //   type: DataTypes.NUMBER,
  //     //   allowNull: false, 
  //     // },
  //     // timeLimit: { 
  //     //   type: DataTypes.NUMBER,
  //     //   allowNull: false, 
  //     // },
  //   },
  //   {
  //   }
  // )

  const User = sequelize.define(
    'User',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin : {
        type: DataTypes.BOOLEAN,
        defaultValue : false
      },
      img : {
        type: DataTypes.STRING,
        defaultValue : "http://vovet.ru/uploads/img/87/2d2008efd304884c51cf7c6825e12bb8-650.jpg"
      },
    },
    {
    }
  )


  // module.exports.Test = Test
  module.exports.User = User

  // User.sync({force:true})