const pg = require('pg');
const fs = require('fs');
const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
// const conString = 'postgres://USERNAME:PASSWORD@HOST:PORT';

const conString = 'postgres://postgres@localhost:5432/spacebetween';

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

app.get( './resultPage', function (request, response) {
    response.sendFile( 'resultPage.html', {root: './Public'});
});


app.get( '/config', function (request, response) {
    response.sendFile( 'config.js', {root: './'});
});

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
});

app.post( '/account', (request, response) => {
    client.query(
      'INSERT INTO authentication(username, userpass) VALUES($1, $2) ON CONFLICT DO NOTHING',
      [request.body.username, request.body.userpass]
    )
    .then(() => response.send('New account created! Welcome, ' + request.body.username + '!'))
    .catch(console.error)
});

app.get('/account', function (request, response) {
    response.sendFile( 'account.html', {root: './Public'});
});

// app.get('/account', (request, response) => {
//     client.query(
//         'SELECT * FROM authentication WHERE username =' + request.body.username + 'AND userpass =' +request.body.userpass,
//     // )
//     response.sendFile ('successfulLogin.html', {root: './Public'});
// });
