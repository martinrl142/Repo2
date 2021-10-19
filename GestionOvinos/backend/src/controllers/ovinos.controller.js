const ovinosCtrl = {};

const Ovino = require('../models/Ovino');

ovinosCtrl.getOvinos = async (req, res) => {
    const ovinos = await Ovino.find();
    res.json(ovinos);
};

ovinosCtrl.createOvino = async (req, res) => {
    const { nombre, numCaravana, colorCaravana, sexo, raza, pedigreeMO, madre, padre, nacimiento, estable } = req.body;
    const newOvino = new Ovino({
        nombre,
        numCaravana,
        colorCaravana,
        sexo,
        raza,
        pedigreeMO,
        madre,
        padre,
        nacimiento,
        estable
    });
    await newOvino.save();
    res.json('Nuevo ovino agregado');
};

ovinosCtrl.getOvino = async (req, res) => {
    const ovino = await Ovino.findById(req.params.id);
    res.json(ovino);
}

ovinosCtrl.deleteOvino = async (req, res) => {
    await Ovino.findOneAndDelete(req.params.id)
    res.json('Ovino eliminado');
}

ovinosCtrl.updateOvino = async (req, res) => {
    const { nombre, numCaravana, colorCaravana, sexo, raza, pedigreeMO, madre, padre, nacimiento, estable } = req.body;
    await Ovino.findByIdAndUpdate(req.params.id, {
        nombre,
        numCaravana,
        colorCaravana,
        sexo,
        raza,
        pedigreeMO,
        madre,
        padre,
        nacimiento,
        estable
    });
    res.json('Ovino actualizado');
}

ovinosCtrl.getOvinosEstable = async (req, res) => {
    const ovinos = await Ovino.findById(req.params.estableId);
    res.json(ovinos);
}

module.exports = ovinosCtrl;