import express from "express";
// PUT /articles/learn-react/upvote
const app = express();
// enable json in request.body (in payload)
app.use(express.json());
// define upvote end point put(path,(req,res)=>{})

app.get('/api/articles/:name', (req, res)=> {
  
});

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