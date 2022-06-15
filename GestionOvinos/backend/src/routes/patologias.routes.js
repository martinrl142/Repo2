import { Router } from "express";
const router = Router();

import * as patologiasCtrl from "../controllers/patologias.controller";
import { authJwt } from "../middlewares";

router.get(
  "/", 
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.getPatologias);

router.get(
  "/:patologiaId",
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.getPatologia);

router.get(
  "/patologia/:patologiaId",
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.getPatologiasOvino);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.createPatologia
);

router.put(
  "/:patologiaId",
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.updatedPatologia
);

router.put(
  "/addOvinoPatologia/:patologiaId",
  [authJwt.verifyToken, authJwt.isModerator],
  patologiasCtrl.addOvinoPatologia
);

router.delete(
  "/:patologiaId",
  [authJwt.verifyToken, authJwt.isAdmin],
  patologiasCtrl.deletePatologia
);

export default router;