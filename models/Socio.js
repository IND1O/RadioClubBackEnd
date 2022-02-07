const { Schema, model } = require("mongoose");

const socioSchema = new Schema({
  numero: {
    type: Number,
    require: true,
    unique: true,
  },
  tipo: {
    type: String,
    require: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  licencia: {
    type: String,
    require: true,
    unique: true,
  },
  dni: {
    type: Number,
    require: true,
    unique: true,
  },
  telefono: {
    type: Number,
    require: false,
  },
  direccion: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: false,
    unique: false,
    trim: true,
  },
  pago: {
    type: Date,
    //require: false,
  },
});

//////////////////// Trasformo el modelo /////////////////
//////////////////////////////////////////////////////////
socioSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//////////////////// Instancio el modelo /////////////////
//////////////////////////////////////////////////////////
const Socio = model("Socio", socioSchema);

module.exports = Socio;
