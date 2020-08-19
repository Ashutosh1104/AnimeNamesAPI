var {rp} = require('./request')
var cheerio = require('cheerio')
var {gethover , Split } =require('./namemagic')
var anime=require('./anime')

base_url="https://www.anime-planet.com"

function makingDbPage(filter='anime',page=1){
    url=base_url+'/'+filter+'/all?page='+page
    return rp(url).then((data)=>{
        var $=cheerio.load(data)
        result=[]
        searches=$('.card').each(function(){
            search={name:''}
            search.name=$(this).find('img').attr('alt')
            search.nameLink='https://www.anime-planet.com'+$(this).find('img').parent().parent().attr('href')
            search.img=base_url+$(this).find('img').attr('data-src')
            x=gethover(cheerio.load($(this).find('.tooltip').attr('title')),filter)
            search={...search,...x}
            result.push(search)           
        })
        return result
    }).catch(err=> console.log(err))    
}

function makingDb(filter='anime'){
    url=base_url+'/'+filter+'/all?page='+1
    return rp(url).then((data)=>{
        var $=cheerio.load(data)
        var paging = $('li[class="next"]').prev().children().attr('href');
        let totalPages = Split(paging , '=')[1];
        let page =1 ;
        var promises = []
        while( page <= totalPages ){
            promises.push( makingDbPage('anime',page) )
            page = page + 1;
        } 
        return promises;
    }).catch(err=> console.log(err))    
}

module.exports={makingDb}
