import express from "express";
import { MongoClient } from "mongodb";
import { db1, connectToDb } from './db.js';// cause of type:module
// PUT /articles/learn-react/upvote
const app = express();
// enable json in request.body (in payload)
app.use(express.json());
//download data: get name_parameter->get info from db
app.get('/api/articles/:name', async (req,res)=> {
   const { name } = req.params;
  //  connectToDb();
  // const client = new MongoClient('mongodb://127.0.0.1:27017');
  //  await client.connect();
  //  const db1 = client.db('react-blog-db');
   // mongosh:db.articles.find({name:name});
   const article = await db1.collection('articles').findOne({ name:name });
 
   if (article) {   res.json(article);
   } else {   res.sendStatus(404); // res.status(404).send("...")
   }
});
// define upvote end point put(path,(req,res)=>{})
app.put('/api/articles/:name/upvote', async (req,res)=>{ 
  const { name } = req.params;
  // const client = new MongoClient('mongodb://127.0.0.1:27017');
  //  await client.connect();
  //  const db1 = client.db('react-blog-db');
   // set=100: $set: {upvotes:100} // increment upvotes by 1
   await db1.collection('articles').updateOne(
       { name: name },
       { $inc: { upvotes: 1 }, }
     );

   const article = await db1.collection('articles').findOne({ name });
   if (article) { 
    const msg1=`the ${name} article now has ${article.upvotes} upvotes `;
    res.send(msg1);
 }  else {
    res.send(`the article \"${name}\" does\'nt exist`);
 }
   
});
app.post('/api/articles/:name/comments',async (req,res)=>{
  const { name } = req.params;
  const { postedBy, text } =req.body;
  
  // const client = new MongoClient('mongodb://127.0.0.1:27017')
  // await client.connect();
  // const db1= client.db('react-blog-db');

  await db1.collection('articles').updateOne(
      { name },
      {$push: {comments: { postedBy, text } },
    }
       );
  const article = await db1.collection('articles').findOne({ name });
  if (article) {
    res.send(article.comments);
  } else {
    res.send(`that article does\'nt exist yet`);
  }
  
});

// definition listener:port, callback
connectToDb(()=>{
    console.log('succesfully connected to database');
    app.listen(8000, ()=>{
      console.log('Server is listening on port 8000');
  });
});
/** db.js->connectToDb():
 const client = new MongoClient('mongodb://127.0.0.1:27017');
   await client.connect();
   const db1 = client.db('react-blog-db');
 */