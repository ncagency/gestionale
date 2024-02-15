import { connectToDatabase } from '../utils/connectMongo'
 



export async function getDatas(type:any) {
    const db = await connectToDatabase();
    const collection = await db.collection(type).find().toArray();
  
    return collection;
}



export async function getById(id:string,type:any) {
    const db = await connectToDatabase();
    const collection = await db.collection(type).findOne({ _id: id });
  
    return collection;
}

