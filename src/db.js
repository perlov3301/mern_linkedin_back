import { MongoClient } from "mongodb";

let db1;

async function connectToDb(cback) {
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();
    db1= client.db('react-blog-db');
    cback();
};
export {
    db1,
    connectToDb,
};