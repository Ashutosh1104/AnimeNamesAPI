const { WSAEHOSTUNREACH } = require('constants');
var {makingDb} = require('./lib/makingDb');
const anime = require('./models/Anime');

const runDBupdate = async () => {
    const allPromise = await makingDb()
  
    for (let onePromise of allPromise) {
        const onePage = await onePromise;
        for (let element of onePage){
            var name = element.name ? element.name.toLowerCase() : '';
            var altName = element.altName ? element.altName.toLowerCase() : '';
            var nameLink = element.nameLink ? element.nameLink : '';
            var image = element.img ? element.img : '';
            var type = element.type ? element.type : '';
            var episodes = element.episode ? element.episode : -1 ; // -1 is unknown
            var rating = element.rating ? element.rating : -1;  // -1 rating is unknown
            var plot = element.plot ? element.plot.toString() : '';
            var source = element.source ?element.source : 'Unknown';
            var year = element.year ? element.year : 0000; // 0000 is unknown
            var tags = element.tags ? element.tags.join(' , ') :'';
            if( rating > 2.2 ){
                await anime.upsert({ name,altName,nameLink,image,type,episodes,rating,plot,source,year,tags})
                .then(()=> console.log('done all///////////'))
                .catch(err=>console.log(err));
            }
        }
    }
}

module.exports = {runDBupdate}