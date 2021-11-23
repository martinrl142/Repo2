import { Router } from "express";
const router = Router();

import * as ovinosCtrl from "../controllers/ovinos.controller";
import { authJwt } from "../middlewares";

router.get(
  "/", 
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvinos);

router.get(
  "/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvino);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.createOvino
);

router.put(
  "/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.updateOvino
);

router.put(
  "/addEstableOvino/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.addEstableOvino
);

router.delete(
  "/:ovinoId",
  [authJwt.verifyToken, authJwt.isAdmin],
  ovinosCtrl.deleteOvino
);

export default router;