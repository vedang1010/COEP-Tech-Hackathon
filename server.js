const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(/home/chiro/Desktop/Hackathon + '/build/favicon.ico'));
// the /home/chiro/Desktop/Hackathon is the current directory from where the script is running
app.use(express.static(/home/chiro/Desktop/Hackathon));
app.use(express.static(path.join(/home/chiro/Desktop/Hackathon, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(/home/chiro/Desktop/Hackathon, 'build', 'index.html'));
});

app.listen(port);