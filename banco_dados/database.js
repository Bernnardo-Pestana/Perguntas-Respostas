const { Sequelize } = require("sequelize");

const connection = new Sequelize("perguntas","root","Txai1990",{
host: 'localhost',
dialect : 'mysql'

});

module.exports = connection;
