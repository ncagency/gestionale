import { connectToDatabase } from '../utils/connectMongo'
 


export async function getStudents() {
    const db = await connectToDatabase();
    const collection = await db.collection('students').find().toArray();
  
    return collection;
}

