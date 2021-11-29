import Seteado from "../models/Seteado";
//import Ovino from "../models/Ovino";

export const createCaracterística = async (req, res) => {

    const {
      coloresCaravana,
      sexos,
      razas,
      cruzamientos,
      aptoReproduccion,
      nacio
    } = req.body;
    //const ovinosFound = await Ovino.find({ name: { $in: ovinos } });
  try {
    const newSeteado = new Seteado({
      coloresCaravana,
      sexos,
      razas,
      cruzamientos,
      aptoReproduccion,
      nacio
        //ovinos: ovinosFound.map((ovino) => ovino._id),
    });

    const seteadoSaved = await newSeteado.save();

    res.status(201).json(seteadoSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getSeteado = async (req, res) => {
  const { seteadoId } = req.params;

  const seteado = await Seteado.findById(seteadoId);
  res.status(200).json(seteado);
};

export const getSeteados = async (req, res) => {
  const seteados = await Seteado.find();
  return res.json(seteados);
};

export const updateSeteado = async (req, res) => {
    const updatedSeteado = await Seteado.findByIdAndUpdate(
    req.params.seteadoId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedSeteado);
};

export const deleteSeteado = async (req, res) => {
  const { seteadoId } = req.params;

  await Seteado.findByIdAndDelete(seteadoId);

  // code 200 is ok too
  res.status(204).json();
};

export const addSeteadoColorCar = async (req, res) => {
  const { coloresCaravana } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { coloresCaravana: coloresCaravana } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoColorCar = async (req, res) => {
  const { coloresCaravana } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { coloresCaravana: coloresCaravana } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoSexo = async (req, res) => {
  const { sexos } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { sexos: sexos } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoRaza = async (req, res) => {
  const { razas } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { razas: razas } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoCruza = async (req, res) => {
  const { cruzamientos } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { cruzamientos: cruzamientos } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoAptoRep = async (req, res) => {
  const { aptoReproduccion } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { aptoReproduccion: aptoReproduccion } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};

export const addSeteadoNacio = async (req, res) => {
  const { nacio } = req.body;
  const updatedSeteado = await Seteado.findByIdAndUpdate(
  req.params.seteadoId,
  { $push: { nacio: nacio } },
  {
    new: true,
  }
);
res.status(204).json(updatedSeteado);
};