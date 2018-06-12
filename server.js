const pg = require('pg');
const fs = require('fs');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';
const conString = 'postgres://davidchhing@localhost:5432/spacebetween';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

app.use(express.static( './Public' ) );
app.use(cors());

app.get( '/', function (request, response) {
    response.sendFile( 'index.html', {root: './Public'});
});

app.get( '/mapPage', function (request, response) {
    response.sendFile( 'mapPage.html', {root: './Public'});
});

app.post('', bodyParser, function(request, response) {
    console.log(request.body);
    response.send('Location posted to server!!');
});

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
});