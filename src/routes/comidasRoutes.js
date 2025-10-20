import { Router } from "express";
import * as ComidasControllers from './../controllers/comidasControllers.js'

const router = Router();

router.get("/", ComidasControllers.listarTodos);
router.get("/:id", ComidasControllers.listarUm)

export default router;