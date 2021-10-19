import Establecimiento from "../models/Establecimiento";

export const createEstable = async (req, res) => {
    const { nombre, email, direccion, sociedad, fechaInauguracion, user } = req.body;

  try {
    const newEstable = new Establecimiento({
        nombre,
        email,
        direccion,
        sociedad,
        fechaInauguracion,
        //user
    });

    const estableSaved = await newEstable.save();

    res.status(201).json(estableSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getEstable = async (req, res) => {
  const { estableId } = req.params;

  const estable = await Establecimiento.findById(estableId);
  res.status(200).json(estable);
};

export const getEstables = async (req, res) => {
  const estables = await Establecimiento.find();
  return res.json(estables);
};

export const updateEstable = async (req, res) => {
    const { nombre, email, direccion, sociedad, fechaInauguracion, user } = req.body;
    const updatedEstable = await Establecimiento.findByIdAndUpdate(
    req.params.EstableId,
    {
        nombre,
        email,
        direccion,
        sociedad,
        fechaInauguracion,
        user
    },
    {
      new: true,
    }
  );
  res.status(204).json(updatedEstable);
};

export const deleteEstable = async (req, res) => {
  const { estableId } = req.params;

  await Establecimiento.findByIdAndDelete(estableId);

  // code 200 is ok too
  res.status(204).json();
};
