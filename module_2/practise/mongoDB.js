const {MongoClient} = require('mongodb');
const connectionURI = 'mongodb://localhost:27017';
const client = new MongoClient(connectionURI);

client.connect()
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });