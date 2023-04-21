import { Router } from "express"
import signRouter from "./sign.routes.js"
import moveRouter from "./move.routes.js"

const router = Router()
router.use(signRouter)
router.use(moveRouter)

export default router