import User from "../models/User";
import Role from "../models/Role";
import Establecimiento from "../models/Establecimiento";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles, establecimientos } = req.body;
    const establesFound = await Establecimiento.find({ name: { $in: establecimientos } });
    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
      establecimientos: establesFound.map((estable) => estable._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addEstableUser = async (req, res) => {
  const { establecimientos } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
  req.params.userId,
  { $push: { establecimientos: establecimientos } },
  {
    new: true,
  }
);
res.status(204).json(updatedUser);
};

export const getUsers = async (req, res) => {};

export const getUser = async (req, res) => {};
