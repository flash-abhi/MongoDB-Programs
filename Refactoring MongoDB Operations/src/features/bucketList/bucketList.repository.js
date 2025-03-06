// Please don't change the pre-written code
// Import the necessary modules here

import { getDB } from "../../config/mongodb.js";

class BucketListRepository {
  constructor() {
    this.collection = "bucketListItems";
  }
  async addBucketListItem(bucketListItem) {
    // Write your code here
  try{
    const db = await getDB();
    const collection = db.collection(this.collection);
    await collection.insertOne(bucketListItem);
    const {title} = bucketListItem;
    const item = await collection.findOne({title})
    return item;
  }catch(err){
    console.log(err);
  }
  }

  async findOneBucketListItem(title) {
    // Write your code here
    try{
      const db = await getDB();
      const collection = db.collection(this.collection);
      const item = await collection.findOne({title})
      return item;
    }catch(err){
      console.log(err);
    }
  }
}

export default BucketListRepository;
