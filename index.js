const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



// middle wares
app.use(cors());
app.use(express.json());



// this is from the Mongodb.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ppcaliy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


 //Crud operation start--

async function run() {
   try {
       const serviceCollection = client.db('geniusCar').collection('services');

       // database ar services gulo ak sathe paoya ---
       app.get('/services', async (req, res) => {
           const query = {}
           const cursor = serviceCollection.find(query);
           const services = await cursor.toArray();
           res.send(services);
       });

      

   }
   finally {

   }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
   res.send('genius car server is running')
})

app.listen(port, () => {
   console.log(`Genius Car server running on ${port}`);
})