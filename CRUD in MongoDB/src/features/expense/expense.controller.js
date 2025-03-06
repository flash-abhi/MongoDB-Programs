import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try{
    const {title,amount,date,isRecurring,tags} = req.body;
    const expense = new ExpenseModel(title,amount,date,isRecurring,tags);
    const result = await this.expenseRepository.addExpense(expense);
    return res.status(201).send(result);
    }catch(err){
      console.log(err);
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try{
      const id = req.params.id;
      const result = await this.expenseRepository.getOne(id);
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try{
      const result = await this.expenseRepository.getAllExpenses();
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try{
      const id = req.params.id;
      const tag = req.body;
      const result = await this.expenseRepository.addTagToExpense(id,tag);
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try{
      const minAmount = parseFloat(req.query.minAmount);
      const maxAmount = parseFloat(req.query.maxAmount);
      const date = req.query.date;
      const isRecurring =req.query.isRecurring;
      const obj = {date,minAmount,maxAmount,isRecurring};
      const result = await this.expenseRepository.filterExpenses(obj);
      return res.status(200).send(result);
    }catch(err){
      console.log(err);
    }
  };
}
