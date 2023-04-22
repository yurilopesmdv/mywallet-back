import { Router } from "express";
import { addTransaction, listTransaction } from "../controllers/transaction.controller.js";
import { authValidation } from "../middlewares/authorization.middleware.js";
import { validateSignSchema } from "../middlewares/sign.validate.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const transactionRouter = Router()

transactionRouter.post("/transactions", authValidation, validateSignSchema(transactionSchema), addTransaction)
transactionRouter.get("/transactions", authValidation, listTransaction)

export default transactionRouter