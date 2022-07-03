import Patologia from "../models/Patologia";
//import Ovino from "../models/Ovino";

export const createPatologia = async (req, res) => {

    const {
        nomPatologia,
        fechaDiagn,
        tipoPatologia,
        descripDiagn
    } = req.body;
    //const ovinosFound = await Ovino.find({ name: { $in: ovinos } });
  try {
    const newPatologia = new Patologia({
        nomPatologia,
        fechaDiagn,
        tipoPatologia,
        descripDiagn
        //ovinos: ovinosFound.map((ovino) => ovino._id),
    });

    const patologiaSaved = await newPatologia.save();

    res.status(201).json(patologiaSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getPatologia = async (req, res) => {
  const { patologiaId } = req.params;

  const patologia = await Patologia.findById(patologiaId);
  res.status(200).json(patologia);
};

export const getPatologiasOvino = async (req, res) => {
  
  const { ovinoId } = req.params;
  const patologiasList = [];
  const patologias = await Patologia.find();
  patologias.map(patologia => {
        patologia.ovinos.map(ovino => {
          
          if(ovino.toString() === ovinoId){
            console.log(ovino);
            patologiasList.push(patologia); 
          }
      }
      );
    }
  );
  console.log(patologiasList);
  return res.json(patologiasList);
};

export const getPatologias = async (req, res) => {
  const patologias = await Patologia.find();
  return res.json(patologias);
};
export const updatedPatologia = async (req, res) => {
    const updatedPatologia = await Patologia.findByIdAndUpdate(
    req.params.patologiaId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedPatologia);
};

export const deletePatologia = async (req, res) => {
  const { patologiaId } = req.params;

  await Patologia.findByIdAndDelete(patologiaId);

  // code 200 is ok too
  res.status(204).json();
};

export const addOvinoPatologia = async (req, res) => {
  const { ovinos } = req.body;
  const updatedPatologia = await Patologia.findByIdAndUpdate(
  req.params.patologiaId,
  { $push: { ovinos: ovinos } },
  {
    new: true,
  }
);
res.status(204).json(updatedPatologia);
};