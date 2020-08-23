const express= require('express')
const app = express();
const database = require('./config/database')
var {runDBupdate} = require('./updateDb');
const anime = require('./lib/anime');
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000 ;

runDBupdate();
setInterval( runDBupdate , 48*60*60*1000) // running update every 24 hrs

app.get("/" , function(req,res){
    res.send("Hello World");
})

app.use('/anime', require('./routes/anime'));

app.listen( PORT , function(){
    console.log('server started on 8000');
})

