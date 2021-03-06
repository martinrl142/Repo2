import Establecimiento from "../models/Establecimiento";
//import Ovino from "../models/Ovino";
//import User from "../models/User";
import { userOfToken } from "../middlewares/userMiddleware";

export const createEstable = async (req, res) => {
    const { nombre, email, direccion, fechaInauguracion, token } = req.body;
    const creador = userOfToken(token);
  try {
    const newEstable = new Establecimiento({
        nombre,
        email,
        direccion,
        fechaInauguracion,
        creador
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

export const getEstablesUser = async (req, res) => {
  // Id del user  
  const creadorId = userOfToken(req.params['creadorId']);
  const establesList = [];
  // Todos los ovinos
  const estables = await Establecimiento.find();
  estables.map(estable => {          
      if(estable.creador.toString() === creadorId){
        console.log(establecimiento);
        establesList.push(estable); 
      }
    }
  );
  console.log(establesList);
  return res.json(establesList);
};

export const updateEstable = async (req, res) => {
  const updatedEstable = await Establecimiento.findByIdAndUpdate(
  req.params.estableId,
  req.body,
  {
    new: true,
  }
);
res.status(204).json(updatedEstable);
};

export const addOvinoEstable = async (req, res) => {
    const { ovinos } = req.body;
    const updatedEstable = await Establecimiento.findByIdAndUpdate(
    req.params.estableId,
    { $push: { ovinos: ovinos } },
    {
      new: true,
    }
  );
  res.status(204).json(updatedEstable);
};

export const addUserEstable = async (req, res) => {
  const { usuarios } = req.body;
  const updatedEstable = await Establecimiento.findByIdAndUpdate(
  req.params.estableId,
  { $push: { users: users } },
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
