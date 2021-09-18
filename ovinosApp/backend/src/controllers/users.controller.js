const usersCtrl = {};

const User = require('../models/user');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password
    });
    await newUser.save();
    res.json('Nuevo usuario agregado');
};

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

usersCtrl.deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id)
    res.json('Usuario eliminado');
}

usersCtrl.updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        username,
        email,
        password
    });
    res.json('usuario actualizado');
}

module.exports = usersCtrl;