const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('uptasknode', 'root', 'password', {
  dialect: 'mysql',
  port:'3306',
  operatorsAliases:false,
  pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
  },

});

module.exports = sequelize;