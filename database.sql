CREATE DATABASE animes;

CREATE TABLE anime(
    name VARCHAR ( 200 ) UNIQUE NOT NULL,
    altName VARCHAR ( 200 ),
    nameLink VARCHAR ( 200 ),
    image VARCHAR ( 400 ) ,
    type VARCHAR ( 200 ),
	episodes INT,
    rating FLOAT,
    plot VARCHAR ( 10000 ),
    source VARCHAR ( 20 ),
	year INT,
    tags VARCHAR ( 1000 )
);