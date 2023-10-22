import express from "express";
import { MongoClient } from "mongodb";
// PUT /articles/learn-react/upvote
const app = express();
// enable json in request.body (in payload)
app.use(express.json());
//download data: get name_parameter->get info from db
app.get('/api/articles/:name', async (req,res)=> {
   const { name } = req.params;
   // listening at localhost to port 27017.
  // from mongodb.com: const db = connect("localhost:27017/react-blog-db");
   //we do need actually IP=127.0.0.1
   const client = new MongoClient('mongodb://127.0.0.1:27017');
   await client.connect();
   // in mongosh: use react-blog-db
   const db1 = client.db('react-blog-db');
   // in mongosh: db.articles.findOne({name:name});
   const article = await db1.collection('articles').findOne({ name:name });
  // if (name) {
  //   const article = await db1.collection('articles').findOne({ name });
  // } else {res.send("article din't match");}
  //  res.send(article);
   if (article) {
    res.json(article);
   } else {
    res.sendStatus(404);
    // res.status(404).send("...")
   }
  // res.json(article);
});
// define upvote end point put(path,(req,res)=>{})
app.put('/api/articles/:name/upvote', (req,res)=>{
//    const name = req.params.name;
   const { name } = req.params;
   const article = articlesInfo.find(item=> item.name===name);
   if (article) { 
    article.upvotes += 1; 
    const msg1=`upvotes for the article ${name} has grown to ${article.upvotes}  `;
    res.send(msg1);
 }  else {
    res.send(`the article \"${name}\" does\'nt exist`);
 }
   
});
app.post('/api/articles/:name/comments',(req,res)=>{
  const { name } = req.params;
 // console.log("server;req.params: ",req.params);
  //  const postedBy = req.body.postedBy;
  //  const text = req.body.text;
  const { postedBy, text } =req.body;
  const article=articlesInfo.find(item=> item.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send(`that article does\'nt exist yet`);
  }
  
});

// definition listener:port, callback
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
});