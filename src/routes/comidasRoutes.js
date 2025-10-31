import { Router } from "express";
import * as ComidasControllers from './../controllers/comidasControllers.js'

const router = Router();

router.get("/", ComidasControllers.listarTodos);
router.get("/:id", ComidasControllers.listarUm)
router.post("/", ComidasControllers.criarComida);

router.put("/:id", ComidasControllers.atualizarComida);

router.delete("/:id", ComidasControllers.removerComida);

export default router;