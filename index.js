const express= require('express')
const app = express();
const pool = require('./db');
var {makingDb} = require('./lib/makingDb');
const anime = require('./lib/anime');

app.use(express.json());
// Routes 

// makingDb().then(promises=>{
//     Promise.all(promises).then( temp => {
//         result=[]
//         for( let i = 0 ; i < temp.length ; i++){
//             for( let j = 0 ; j < temp[i].length ; j++){
//                 result.push(temp[i][j])
//                 if( i == temp.length-1 && j == temp[i].length-1 ){
//                     result.forEach(element => {
//                         element.name = element.name ? element.name : '';
//                         element.altName = element.altName ? element.altName : '';
//                         element.nameLink = element.nameLink ? element.nameLink : '';
//                         element.img = element.img ? element.img : '';
//                         element.type = element.type ? element.type : '';
//                         element.episode = element.episode ? element.episode : 0 ;
//                         element.rating = element.rating ? element.rating : 0;
//                         element.plot = element.plot ? element.plot.toString() : '';
//                         element.source = element.source ?element.source : 'Unknown';
//                         element.year = element.year ? element.year : '--';
//                         element.tags = element.tags ? element.tags :'';
//                         const sql = 'INSERT into anime (name,altname,nameLink,image,type,episodes,rating,plot,source,year,tags) values ($1, $2 ,$3,$4,$5,$6,$7,$8,$9,$10,$11) on conflict (name) do update set (name,altname,nameLink,image,type,episodes,rating,plot,source,year,tags) = ($12 ,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) where anime.name = $23;';
//                         const values = [element.name , element.altName ,element.nameLink, element.img, element.type , element.episode , element.rating , element.plot , element.source , element.year ,element.tags,element.name , element.altName ,element.nameLink, element.img, element.type , element.episode , element.rating , element.plot , element.source , element.year ,element.tags,element.name];
//                         try {
//                             pool.query(sql,values)
//                             .then(res => console.log(res.rows[0].name))
//                             .catch(err => console.error('Error executing query', err.stack))
//                         } catch (err) {
//                             console.log(err)
//                         }
//                     });
//                 }
//             }
//         }
//     }).catch(err=> console.log(err))
// }).catch(err=> console.log(err))


app.get('/forSearch',async function(req,res){
    try {
        const newAnime= await pool.query(
        "select array_agg(row_to_json(anime)) from ( select name, altname , nameLink from anime) anime;"
        )
        res.send(newAnime.rows)
    } catch (err) {
        console.log(err)
    }
})

app.listen('8000',function(){
    console.log('server started on 8000');
})

