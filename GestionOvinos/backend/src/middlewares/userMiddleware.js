import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export function userOfToken(theToken) {
  let token = theToken.headers.Authorization;
  const decoded = jwt.verify(token, config.SECRET);
  theToken.userId = decoded.id;
  console.log(theToken.userId)
  return theToken.userId;
};
