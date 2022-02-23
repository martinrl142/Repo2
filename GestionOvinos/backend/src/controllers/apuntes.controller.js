const apuntesCtrl = {};

const Apunte = require('../models/Apunte');

apuntesCtrl.getApuntes = async (req, res) => {
    const apuntes = await Apunte.find();
    res.json(apuntes);
};

apuntesCtrl.createApunte = async (req, res) => {
    const { titulo, descripcion, contenido, fechaCreacion, user } = req.body;
    const newApunte = new Apunte({
        titulo,
        descripcion,
        contenido,
        fechaCreacion,
        user
    });
    await newApunte.save();
    res.json('Apunte creado');
};

apuntesCtrl.getApunte = async (req, res) => {
    const apunte = await Apunte.findById(req.params.id);
    res.json(apunte);
}

apuntesCtrl.deleteApunte = async (req, res) => {
    await Apunte.findOneAndDelete(req.params.id)
    res.json('Apunte eliminado');
}

apuntesCtrl.updateApunte = async (req, res) => {
    const { titulo, descripcion, contenido, fechaCreacion, user } = req.body;
    await Apunte.findByIdAndUpdate(req.params.id, {
        titulo,
        descripcion,
        contenido,
        fechaCreacion,
        user
    });
    res.json('Apunte actualizado');
}

module.exports = apuntesCtrl;