//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch})=> fetch(...args));
console.log(process.env);
const app = express();
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


// Serve only the static files form the dist directory
app.use(express.static('./dist/project-trumedia'));

app.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/project-trumedia/index.html'));
});








