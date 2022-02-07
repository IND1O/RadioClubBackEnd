const { app } = require("../index");
const supertest = require("supertest");
const User = require("../models/User");

const api = supertest(app);

const initialSocios = [
  {
    numero: 474,
    tipo: "Activo",
    nombre: "Alberto Agote",
    licencia: "LU2KBR",
    dni: 7065883,
    telefono: 4239308,
    direccion: "Prospero Mena 75",
    pago: "2007-08-31",
  },
  {
    numero: 71,
    nombre: "Ardiles Gray",
    tipo: "Vitalicio",
    licencia: "LU7KI",
    dni: 70466465,
    telefono: 4236131,
    direccion: "Pje. Benjamín Paz 156",
    pago: "2025-12-31",
  },
  {
    numero: 735,
    tipo: "Activo",
    nombre: "Salvador Medina",
    licencia: "LU5KAH",
    dni: 21744664,
    telefono: 155244393,
    direccion: "Fermin Cariola 393",
    email: "LU5KHF.Tucuman.Argentina@gmail.com",
    pago: "2020-10-31",
  },
];

const getAllLicenciasFromSocio = async () => {
  const response = await api.get("/api/socios");
  return {
    licencias: response.body.map((soc) => soc.licencia),
    response,
  };
};

const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user) => user.toJSON());
};

module.exports = { api, initialSocios, getAllLicenciasFromSocio, getUsers };
