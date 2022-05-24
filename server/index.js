const express = require('express');
const path = require('path');
const port = process.env.PORT ?? '3000';
const { MongoClient } = require('mongodb');

const client = new MongoClient(
  'mongodb+srv://kevinndlc:123@cluster0.o1kje.mongodb.net/?retryWrites=true&w=majority'
);
client.connect()
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => {
    console.error(err);
  })

const app = express();
app.use(express.static('../client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.listen(port);