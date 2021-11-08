import { Router } from "express";
const router = Router();

import * as establesCtrl from "../controllers/establecimientos.controller";
import { authJwt } from "../middlewares";

router.get(
  "/", 
  [authJwt.verifyToken, authJwt.isModerator],
  establesCtrl.getEstables);

router.get(
  "/:estableId",
  [authJwt.verifyToken, authJwt.isModerator],
  establesCtrl.getEstable);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  establesCtrl.createEstable
);

router.put(
  "/:estableId",
  [authJwt.verifyToken, authJwt.isModerator],
  establesCtrl.updateEstable
);

router.put(
  "/addOvino/:estableId",
  [authJwt.verifyToken, authJwt.isModerator],
  establesCtrl.addOvinoEstable
);

router.delete(
  "/:estableId",
  [authJwt.verifyToken, authJwt.isAdmin],
  establesCtrl.deleteEstable
);

export default router;



