import { Router } from "express";
const router = Router();

import * as apuntesCtrl from "../controllers/apuntes.controller";
import { authJwt } from "../middlewares";

router.get(
  "/", 
  [authJwt.verifyToken, authJwt.isModerator],
  apuntesCtrl.getApuntes);

router.get(
  "/:apunteId",
  [authJwt.verifyToken, authJwt.isModerator],
  apuntesCtrl.getApunte);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  apuntesCtrl.createApunte
);

router.put(
  "/:apunteId",
  [authJwt.verifyToken, authJwt.isModerator],
  apuntesCtrl.updateApunte
);

router.delete(
  "/:apunteId",
  [authJwt.verifyToken, authJwt.isAdmin],
  apuntesCtrl.deleteApunte
);

export default router;



