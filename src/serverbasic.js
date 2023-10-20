import express from "express";
// PUT /articles/learn-react/upvote
const app = express();
// enable json in request.body (in payload)
app.use(express.json());
// get request : path, handlers
app.get('/hello/:myname', (req,res)=>{
    //const myname = req.params.myname;
    const {myname} = req.params;
    res.send(`<b style="color:blue;text-align: center;">
      Hello ${myname} from server.js</b>`);
})
app.post("/hello", (req, res)=> {
    const aname = req.body.name;
    res.send(`<b >Hello World from ${aname}</b>`); // html response
});
// define listener:port, callback
app.listen(8000, ()=>{
    console.log('Server is listening on port 8000');
});