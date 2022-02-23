import { Router } from "express";
const router = Router();

import * as tokenCtrl from "../controllers/token.controller";
import { authJwt } from "../middlewares";

router.post(
  "/",
  tokenCtrl.receiveToken
);

export default router;



