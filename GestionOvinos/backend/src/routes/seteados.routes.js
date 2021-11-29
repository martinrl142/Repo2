import { Router } from "express";
const router = Router();

import * as seteadosCtrl from "../controllers/seteados.controller";
import { authJwt } from "../middlewares";

router.get(
  "/", 
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.getSeteados);

router.get(
  "/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.getSeteado);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.createCaracterística
);

router.put(
  "/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.updateSeteado
);

router.put(
  "/addSeteadoAptoRep/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoAptoRep
);

router.put(
  "/addSeteadoColorCar/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoColorCar
);

router.put(
  "/addSeteadoCruza/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoCruza
);

router.put(
  "/addSeteadoNacio/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoNacio
);

router.put(
  "/addSeteadoRaza/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoRaza
);

router.put(
  "/addSeteadoSexo/:seteadoId",
  [authJwt.verifyToken, authJwt.isModerator],
  seteadosCtrl.addSeteadoSexo
);

router.delete(
  "/:seteadoId",
  [authJwt.verifyToken, authJwt.isAdmin],
  seteadosCtrl.deleteSeteado
);

export default router;