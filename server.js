const express = require('express');
const path = require('path');
// const cors = require('cors')

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Main
app.listen(8151);

// Dev
 //app.listen(8331);
