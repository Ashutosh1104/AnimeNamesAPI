const express = require('express')
const app = express();
var { runDBupdate } = require('./updateDb');
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});

const PORT = process.env.PORT || 8000;

runDBupdate();
setInterval(runDBupdate, 48 * 60 * 60 * 1000) // running update every 48 hrs

app.get("/", function (req, res) {
    const result = {
        Message: "Please read instructions on Github",
        Github: 'https://github.com/Ashutosh1104/AnimeNamesAPI/blob/master/README.md'
    }
    res.send(result);
})

app.use('/anime', require('./routes/anime'));

app.listen(PORT, function () {
    console.log('server started on 8000');
})

