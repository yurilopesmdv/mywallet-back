import { Router } from "express";
import { addTransaction, listTransaction } from "../controllers/transaction.controller.js";

const transactionRouter = Router()

transactionRouter.post("/transactions", addTransaction)
transactionRouter.get("/transactions", listTransaction)

export default transactionRouter