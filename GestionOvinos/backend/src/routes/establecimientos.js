import { Router } from "express";
const router = Router();

import * as establesCtrl from "../controllers/establecimientos.controller";
import { authJwt } from "../middlewares";

router.get("/", establesCtrl.getEstables);

router.get("/:estableId", establesCtrl.getEstable);

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

router.delete(
  "/:estableId",
  [authJwt.verifyToken, authJwt.isAdmin],
  establesCtrl.deleteEstable
);

export default router;



