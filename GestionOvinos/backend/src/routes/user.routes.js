import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

router.put(
  "/addEstableUser/:userId",
  [authJwt.verifyToken, authJwt.isModerator],
  usersCtrl.addEstableUser
);

export default router;
