const express= require('express')
const app = express();
var {runDBupdate} = require('./updateDb');
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000 ;

runDBupdate();
setInterval( runDBupdate , 48*60*60*1000) // running update every 24 hrs

app.get("/" , function(req,res){
    const result = { 
        Message : "Please read instructions on Github" ,
        Github : 'https://github.com/Ashutosh1104/AnimeNamesAPI/blob/master/README.md'
    }
    res.send(result);
})

app.use('/anime', require('./routes/anime'));

app.listen( PORT , function(){
    console.log('server started on 8000');
})

