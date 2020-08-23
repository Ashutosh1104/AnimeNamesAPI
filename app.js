const express= require('express')
const app = express();
var {runDBupdate} = require('./updateDb');
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000 ;

runDBupdate();
setInterval( runDBupdate , 48*60*60*1000) // running update every 24 hrs

app.get("/" , function(req,res){
    res.send('hey User There are two functions working as of now  /anime/all to get entire list of anime and /anime/serahc/name to get anime with name in the names');
})

app.use('/anime', require('./routes/anime'));

app.listen( PORT , function(){
    console.log('server started on 8000');
})

