import Ovino from "../models/Ovino";
//import Ovino from "../models/Ovino";

export const createOvino = async (req, res) => {

    const {
      nombre,
      numCaravana,
      colorCaravana,
      sexo,
      raza,
      cruzamiento,
      tatuaje,
      nacimiento,
      aptoReproduccion,
      pesoAlNacer,
      pesoAlDestete,
      nacio
    } = req.body;
    //const ovinosFound = await Ovino.find({ name: { $in: ovinos } });
  try {
    const newOvino = new Ovino({
      nombre,
      numCaravana,
      colorCaravana,
      sexo,
      raza,
      cruzamiento,
      tatuaje,
      nacimiento,
      aptoReproduccion,
      pesoAlNacer,
      pesoAlDestete,
      nacio
        //ovinos: ovinosFound.map((ovino) => ovino._id),
    });

    const ovinoSaved = await newOvino.save();

    res.status(201).json(ovinoSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getOvino = async (req, res) => {
  const { ovinoId } = req.params;

  const ovino = await Ovino.findById(ovinoId);
  res.status(200).json(ovino);
};

export const getOvinosEstable = async (req, res) => {
  
  const { estableId } = req.params;
  const ovinosList = [];
  const ovinos = await Ovino.find();
  ovinos.map(ovino => {
        ovino.establecimientos.map(establecimiento => {
          
          if(establecimiento.toString() === estableId){
            console.log(establecimiento);
            ovinosList.push(ovino); 
          }
      }
      );
    }
  );
  console.log(ovinosList);
  return res.json(ovinosList);
};

export const getOvinos = async (req, res) => {
  const ovinos = await Ovino.find();
  return res.json(ovinos);
};

export const updateOvino = async (req, res) => {
    const updatedOvino = await Ovino.findByIdAndUpdate(
    req.params.ovinoId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedOvino);
};

export const deleteOvino = async (req, res) => {
  const { ovinoId } = req.params;

  await Ovino.findByIdAndDelete(ovinoId);

  // code 200 is ok too
  res.status(204).json();
};

// Agregar Establecimiento a Ovino
export const addEstableOvino = async (req, res) => {
  const { establecimientos } = req.body;
  const updatedOvino = await Ovino.findByIdAndUpdate(
  req.params.ovinoId,
  { $push: { establecimientos: establecimientos } },
  {
    new: true,
  }
);
res.status(204).json(updatedOvino);
};

// Agregar Patologia a Ovino
export const addPatologiaOvino = async (req, res) => {
  const { establecimientos } = req.body;
  const updatedOvino = await Ovino.findByIdAndUpdate(
  req.params.ovinoId,
  { $push: { establecimientos: establecimientos } },
  {
    new: true,
  }
);
res.status(204).json(updatedOvino);
};