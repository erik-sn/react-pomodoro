/**
 *  This line is necessary because we are using a SASS compiler through
 *  webpack on the client side. Because our JS/ES6 code is also loaded through
 *  node in this server file, we will get syntax errors if the node server
 *  attemps to parse the css/scss files.
 *
 *  To bypass this, we set this process.env variable as true when using webpack
 *  and delete it here. Then we only import/require the css/scss files in React
 *  components if this variable exists (and is true).
 *
 *  This is unique to Isomorphic applications, see here:
 *      http://stackoverflow.com/a/30355080/4396787
 *
 */
delete process.env.BROWSER;

import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import http from 'http';

const app = express(); // delcare application
const PORT = process.env.PORT || 3001;

app.use(compression()); // compress compatible files for quicker client load time
app.use(logger('dev')); // log content

// Set path to public assets
app.use('/pomodoro/resources/', express.static('resources'));
app.use('/pomodoro/static/', express.static('dist'));

app.use('*', (req, res) => {
  res.status(200).send(renderFullPage());
});

// create server based on application configuration
const server = http.createServer(app);

// start the server listening on specified port
server.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening on port', PORT);
});

/**
 * Takes a react rendering in string format and returns a full html page.
 *
 * @param {string} app - react component to be rendered
 * @return {string} full html page
 */
function renderFullPage() {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="/pomodoro/static/bundle.min.css">    
        <script src="https://use.fontawesome.com/79b701a885.js"></script>
      </head>
      <body id="app-body">
        <div class="react-container"></div>
      </body>
      <script src="/pomodoro/static/bundle.min.js"></script>
    </html>
  `;
}
