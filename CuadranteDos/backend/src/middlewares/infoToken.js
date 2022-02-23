import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const infoUser = async (pToken) => {
  //Guardo el token en una variable
  let token = pToken.headers['Authorization'];
  //Si no hay token se genera el error 409
  //Decodifico el contenido del token
  const decoded = jwt.verify(token, config.SECRET);
  //id del usuario
  const userId = decoded.id;
  const user = await User.findById(userId);
  return user;
};