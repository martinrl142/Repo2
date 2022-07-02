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

router.get(
  "/estable/:estableId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvinosEstable);

router.get(
  "/machos/padres",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvinosMachos);  

router.get(
  "/hembras/madres",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvinosHembras); 
  
router.get(
  "/ovino/:padreId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.getOvinosEstable);
  
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

router.put(
  "/addPatologiaOvino/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.addPatologiaOvino
);

router.put(
  "/addPadreOvino/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.addPadreOvino
);

router.put(
  "/addMadreOvino/:ovinoId",
  [authJwt.verifyToken, authJwt.isModerator],
  ovinosCtrl.addMadreOvino
);

router.delete(
  "/:ovinoId",
  [authJwt.verifyToken, authJwt.isAdmin],
  ovinosCtrl.deleteOvino
);

export default router;