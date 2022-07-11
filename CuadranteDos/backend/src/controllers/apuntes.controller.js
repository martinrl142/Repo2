import Apunte from "../models/Apunte";

export const createApunte = async (req, res) => {
  const {
    titulo,
    descripcion,
    contenido,
    fechaCreacion
  } = req.body;
  try {
    const newApunte = new Apunte({
      titulo,
      descripcion,
      contenido,
      fechaCreacion
    });

    const apunteSaved = await newApunte.save();

    res.status(201).json(apunteSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getApunte = async (req, res) => {
  const { apunteId } = req.params;

  const apunte = await Apunte.findById(apunteId);
  res.status(200).json(apunte);
};

export const getApuntes = async (req, res) => {
  const apuntes = await Apunte.find();

  // const user = await infoToken.infoUser(token);

  // const apuntesPermitidosAutor = await Apunte.find({ autor: { $in: user.id } });

  return res.json(apuntes);
};

export const updateApunte = async (req, res) => {
    const {
      titulo,
      descripcion,
      contenido,
      fechaCreacion
    } = req.body;

    
    const updatedApunte = await Apunte.findByIdAndUpdate(
    req.params.apunteId, {
    titulo,
    descripcion,
    contenido,
    fechaCreacion,
    });
  res.status(204).json(updatedApunte);
};

export const deleteApunte = async (req, res) => {
  const { apunteId } = req.params;

  await Apunte.findByIdAndDelete(apunteId);

  // code 200 is ok too
  res.status(204).json();
};