import { MongoClient } from "mongodb";

// connect to mongodb
export default async function connects() {
    const client = await  MongoClient.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true }
    );
    const db = client.db('test');
    return { db, client };
}
    