const Sequelize = require("sequelize");

const connection = require("./database");

const Pergunta_model = connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },

    desc:{
        type: Sequelize.TEXT,
        allowNull:false
    }
});

Pergunta_model.sync({force:false})

module.exports = Pergunta_model ;