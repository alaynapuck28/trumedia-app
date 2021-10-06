//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch})=> fetch(...args));

console.log(process.env);
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/project-trumedia'));

app.get('/players', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/project-trumedia/index.html'));
});

app.get('/apiToken', async (request, response)=> {
    const apiKey = process.env.API_KEY
    const api_url = `https://project.trumedianetworks.com/api/token`
    var options = {
        method: "GET",
        headers: {
          "apiKey": apiKey
        }
      };

    const fetch_response = await fetch(api_url, options);
    const json = await fetch_response.json()
    response.json(json);
  console.log(response.json(json));
  response.end()

});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
