An Api working based on a small names database 

It contains names in english as well as Japanese 
which are updated every two days by itself to add any new anime added to it
This update is done by a web scraper .

There are two three paths defined in this 

https://anime2211.herokuapp.com/anime/all : 
this returns a list of every anime in the Database with other details which are stored there  in Json Format
{
    name : 'somename',
    altName : 'name in alternate language',
    nameLink : 'link to place where you can see other detals about the anime',
    image : 'link to image',
    type : 'movie . tv series etc',
	episodes : INT,
    rating : FLOAT (out of five) ,
    plot : 'summary'
    source : 'credits to original source'
	year : INT,
    tags : "Action , Adventure , Dra… Manga , Domestic Abuse" // seperated by commas 
}

https://anime2211.herokuapp.com/anime/GeneralSearch/naruto : // Naruto can be replaced by any word 
it gives all the anime whose names or laternative names contain the passed variable == string 

[
    {
        name : 'somename',
        altName : 'name in alternate language',
        nameLink : 'link to place where you can see other detals about the anime',
    },
    {
        name : 'somename',
        altName : 'name in alternate language',
        nameLink : 'link to place where you can see other detals about the anime',
    },
    .
    .
    .   
]

https://anime2211.herokuapp.com/anime/SpecificSearch/naruto : // Naruto can be replaced by any full anime name ( FULL NAME PLEASE ) 
it takes exact name and gives one answer

{
    name : 'somename',
    altName : 'name in alternate language',
    nameLink : 'link to place where you can see other detals about the anime',
}

//NOTE

Due to some space issues i have only mainted those anime which have a rating of over 2.1 chnage that after forking to get every name of the anime ever.
I will be updating it  
