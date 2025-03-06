import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.insertOne(expense);
      return expense;
    }catch(err){
      console.log(err);
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.findOne({_id:new ObjectId(id)});
    }catch(err){
      console.log(err);
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.find().toArray();
    }catch(err){
      console.log(err);
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tags) {
    try{
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.updateOne({_id:new ObjectId(id)},{$push:tags})
    }catch(err){
      console.log(err);
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    try{
      const {minAmount,maxAmount,date,isRecurring} = criteria;
      const filterExpense = {}
      const db = getDB();
      const collection = db.collection(this.collectionName);
      if(minAmount){
        filterExpense.amount = {$gte: parseFloat(minAmount)};
      }
      if(maxAmount){
        filterExpense.amount = {...filterExpense.amount,$lte: parseFloat(maxAmount)};
      }
      if(date){
        filterExpense.date = date;
      }
      if(isRecurring !== undefined){
        filterExpense.isRecurring = isRecurring === "true" || isRecurring === true;;
      }
      return await collection.find(filterExpense).toArray();
    }catch(err){
      console.log(err);
    }
  }
}

export default ExpenseRepository;
