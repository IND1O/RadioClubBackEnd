const sociosRouter = require("express").Router();
const Socio = require("../models/Socio");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

///////////////////////////////////////////////////////////
//////////////////////// HOME /////////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.get("/", (request, response) => {
  // console.log(request.ip);
  // console.log(request.ips);
  // console.log(request.originalUrl);
  response.send("<h1>*Bienvenidos API REST - RADIO CLUB TUCUMAN*<h1/>");
});

///////////////////////////////////////////////////////////
//////////////////////// VER TODOS ////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.get(
  "/api/socios",
  //exports.obtenerSocios =
  async (request, response) => {
    const socios = await Socio.find({});
    response.json(socios);
  }
);

///////////////////////////////////////////////////////////
//////////////////////// VER UNO //////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.get("/api/socios/:id", (request, response, next) => {
  const { id } = request.params;

  Socio.findById(id)
    .then((socio) => {
      if (socio) return response.json(socio);
      response.status(404).end();
    })
    .catch((err) => next(err));
});

///////////////////////////////////////////////////////////
//////////////////////// EDITAR ///////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.put(
  "/api/socios/:id",
  [
    check("numero", "El número de socio es obligatorio")
      .isNumeric()
      .not()
      .isEmpty(),
    check("tipo", "El tipo de socio es obligatorio").not().isEmpty(),
    check("nombre", "El nombre del socio es obligatorio").not().isEmpty(),
    check(
      "licencia",
      "La licencia del socio es obligatorio y no debe ser menor a 4 ni mayor a 10 caracteres"
    )
      .toUpperCase()
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 10 }),
    check("dni", "El Dni del socio es obligatorio")
      .isNumeric()
      .not()
      .isEmpty()
      .isLength({ min: 7, max: 8 }),

    check("direccion", "La direccion del socio es obligatoria").not().isEmpty(),
  ],
  async (req, res, next) => {
    // extraer la información del proyecto
    const {
      numero,
      tipo,
      nombre,
      licencia,
      dni,
      telefono,
      direccion,
      email,
      pago,
    } = req.body;
    const newSocio = {};

    if (numero) {
      newSocio.numero = numero;
    }
    if (tipo) {
      newSocio.tipo = tipo;
    }
    if (nombre) {
      newSocio.nombre = nombre;
    }
    if (licencia) {
      newSocio.licencia = licencia;
    }
    if (dni) {
      newSocio.dni = dni;
    }
    if (telefono) {
      newSocio.telefono = telefono;
    }
    if (direccion) {
      newSocio.direccion = direccion;
    }
    if (email) {
      newSocio.email = email;
    }
    if (pago) {
      newSocio.pago = pago;
    }

    try {
      // revisar el ID
      //console.log(req.params.id);
      let socio = await Socio.findById(req.params.id);

      // si el proyecto existe o no
      if (!socio) {
        return res.status(404).json({ msg: "Socio no encontrado" });
      }

      // actualizar
      socio = await Socio.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: newSocio },
        { new: true }
      );

      res.json({ socio });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  }
);

///////////////////////////////////////////////////////////
//////////////////////// ELIMINAR /////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.delete(
  "/api/socios/:id",

  async (req, res, next) => {
    try {
      let socio = await Socio.findById(req.params.id);

      // si el socio existe o no
      if (!socio) {
        return res.status(404).json({ msg: "Socio no encontrado" });
      }

      // Eliminar el socio
      await Socio.findOneAndRemove({ _id: req.params.id });
      res.json({ msg: "Socio eliminado " });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  }
);

///////////////////////////////////////////////////////////
//////////////////////// CREAR //////////////////////////
///////////////////////////////////////////////////////////
sociosRouter.post(
  "/api/socios",
  [
    check("numero", "El número de socio es obligatorio")
      .isNumeric()
      .not()
      .isEmpty(),
    check("tipo", "El tipo de socio es obligatorio").not().isEmpty(),
    check("nombre", "El nombre del socio es obligatorio").not().isEmpty(),
    check(
      "licencia",
      "La licencia del socio es obligatorio y no debe ser menor a 4 ni mayor a 10 caracteres"
    )
      .toUpperCase()
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 10 }),
    check("dni", "El Dni del socio es obligatorio")
      .isNumeric()
      .not()
      .isEmpty()
      .isLength({ min: 7, max: 8 }),

    check("direccion", "La direccion del socio es obligatoria").not().isEmpty(),
  ],

  async (req, res, next) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    try {
      // Crear un nuevo Socio
      const socio = new Socio(req.body);

      // guardamos el Socio
      socio.save();
      res.json(socio);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  }
);

module.exports = sociosRouter;
