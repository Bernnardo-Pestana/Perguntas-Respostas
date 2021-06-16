const Sequelize = require("sequelize");

const connection = require("./database");

const Resposta_model = connection.define("resposta",{
    
    resp:{
        type: Sequelize.TEXT,
        allowNull:false
    },

    pergunta_id:{
        type: Sequelize.INTEGER,
        allowNull:false
    }

});

Resposta_model.sync({force:false})

module.exports = Resposta_model ;