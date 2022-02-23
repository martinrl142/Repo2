import { infoToken } from "../middlewares";

export const receiveToken = async (req, res) => {
  const {
    token
  } = req.body;
  const user = await infoToken.infoUser(token);
  console.log(user.id);
};