const express = require('express');



const bodyparser = require('body-parser');

const app = express();

app.set('view engine','ejs');

app.use(express.static('public'));



app.get("/",(req, res)=>
{
    res.render("index.ejs");

});

app.get("/perguntar", (req,res)=>
{
    res.render("perguntar.ejs");
})

app.listen(8888, ()=>
    {
        console.log("funcionando");
    });