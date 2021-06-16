const express = require('express');
const connection = require("./banco_dados/database.js");
const Pergunta = require("./banco_dados/Pergunta.js");
const Resposta = require("./banco_dados/Resposta.js");

const bodyparser = require('body-parser');

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//conexao ao banco de dados
connection.authenticate().then(()=>{console.log("conectou")}).catch((msgErro)=>{console.log(msgErro)})


app.get("/",(req, res)=>
{
    Pergunta.findAll({raw:true,order:[
        
        ['titulo','ASC']
    
    
        ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
  

});

app.get("/perguntar", (req,res)=>
{
    res.render("perguntar.ejs");
})

app.get("/pergunta/:id", (req,res)=>
{
    var id = req.params.id;

    Pergunta.findOne({
        where: {id : id}
    })
    .then(perguntas =>
        {
            if(perguntas != undefined){
               
                Resposta.findAll({
                    where: {id :perguntas.id}

                   

                }).then(respostas => {
                        res.render("pergunta",{

                        perguntas:perguntas,
                        respostas : respostas
                        });
                   
                })



            }else{
                res.redirect("/");
            }
        });
})

app.post("/salvapergunta", (req,res)=>
{
    var titulo = req.body.titulo;
    var perg = req.body.campo;
    Pergunta.create(
        {
            titulo:titulo,
            desc:perg
        }).then(()=>{
            res.redirect("/");
        })
});



app.post("/salvaresposta",(req,res)=>
{
    var resp = req.body.resp;
    var perg = req.body.perg;

    Resposta.create(
        {
            resp:resp,
            pergunta_id:perg
        }).then(()=>{
            res.redirect("/pergunta/"+ perg);
        })
});
app.listen(8888, ()=>
    {
        console.log("funcionando");
    });