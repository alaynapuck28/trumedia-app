//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();
console.log(process.env);

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/project-trumedia'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/project-trumedia/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
