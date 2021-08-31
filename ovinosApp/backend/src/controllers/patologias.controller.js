const establesCtrl = {};

const Establecimiento = require('../models/Establecimiento');

establesCtrl.getEstables = async (req, res) => {
    const estables = await Establecimiento.find();
    res.json(estables);
};

establesCtrl.createEstable = async (req, res) => {
    const { nombre, email, direccion, sociedad, fechaInauguracion, user } = req.body;
    const newEstablecimiento = new Establecimiento({
        nombre,
        email,
        direccion,
        sociedad,
        fechaInauguracion,
        user
    });
    await newEstablecimiento.save();
    res.json('Nuevo establecimiento agregado');
};

establesCtrl.getEstable = async (req, res) => {
    const estable = await Establecimiento.findById(req.params.id);
    res.json(estable);
}

establesCtrl.deleteEstable = async (req, res) => {
    await Establecimiento.findOneAndDelete(req.params.id)
    res.json('Establecimiento eliminado');
}

establesCtrl.updateEstable = async (req, res) => {
    const { nombre, email, direccion, sociedad, fechaInauguracion, user } = req.body;
    await Establecimiento.findByIdAndUpdate(req.params.id, {
        nombre,
        email,
        direccion,
        sociedad,
        fechaInauguracion,
        user
    });
    res.json('Establecimiento actualizado');
}

module.exports = establesCtrl;