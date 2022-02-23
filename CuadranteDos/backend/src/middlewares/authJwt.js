import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import Apunte from "../models/Apunte";
import Apuntes from "../controllers/apuntes.controller";

export const verifyToken = async (req, res, next) => {
  //Guardo el token en una variable
  let token = req.get('Authorization');
  //Si no hay token se genera el error 409
  if (!token) return res.status(409).json({ message: "No token provided" });

  //Si hay token
  try {
    //Decodifico el contenido del token
    const decoded = jwt.verify(token, config.SECRET);
    //id del usuario
    req.userId = decoded.id;
    //Busco usuario con ese id en User
    const user = await User.findById(req.userId, { password: 0 });
    //Si el usuario no exite muestro el error 404
    if (!user) return res.status(404).json({ message: "No user found" });
    
    //Si existe continúo
    next();
  } catch (error) {
    //Si ocurre algo diferente a lo anterior muestro el error 401
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(405).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(408).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

/* export const isOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "owner") {
        next();
        return;
      }
    }

    return res.status(408).json({ message: "Require Owner Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
}; */

export const isAllowedUserId = async (req, res, next) => {
  try {
    const { apunteId } = req.params;
    //Busco si hay un usuario con ese id
    //En la variable user guardo los datos del usuario
    const user = await User.findById(req.userId);
    //Del documento Apuntes todos los apuntes con ese user._id
    const apuntes = await Apunte.find({ autor: { $in: user._id } });

    for (let i = 0; i < apuntes.length; i++) {
      //Recorro todos los apuntes que existían y que a su vez el usuario tenía permiso, si es igual el de apunteId se le da permiso
      if (apuntes[i].id === apunteId) {
        next();
        return;
      }
    }

    return res.status(408).json({ message: "Requires permission to Apunte!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};