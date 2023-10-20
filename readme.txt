npm install -y // package.json
npm install express
-within package.json we are adding "type":"module"// for using import-export
/src/server.js
const app=express();
app.use(express.json());// enable json in request body
app.get("/hello", (req,res)=>{res.send("HelloWorld")});
app.listen(8000,()=>{console.log("server is listening on the port 8000")});
my-blog-backend>node src/server.js
html=>localhost:8000/hello=>Hello World 
postman=> new=> get + http://localhost:8000/hello

upvote+=1
npx nodemon src/server.js
post http://localhost:8000/api/articles/learn-react/upvote
req= body(from json)+params(/:... from url)
"attr":{"port":27017,"ssl":"off"}
mongosh
db.articles.insertOne()/insertMany()
db.getCollectionNames()
db.articles.find()/find({name:'leart-react'})
npm run dev
