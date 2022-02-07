// const bcrypt = require("bcrypt");
// const usersRouter = require("express").Router();
// const User = require("../models/User");

// usersRouter.get("/", async (request, response) => {
//   const users = await User.find({}).populate("socios", {
//     numero: 1,
//     tipo: 1,
//     nombre: 1,
//     licencia: 1,
//     dni: 1,
//     telefono: 1,
//     direccion: 1,
//     email: 1,
//     _id: 0,
//   });
//   response.json(users);
// });

// usersRouter.post("/", async (request, response) => {
//   try {
//     const { body } = request;
//     const { username, name, password } = body;

//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);
//     const user = new User({
//       username,
//       name,
//       passwordHash,
//     });
//     const saveUser = await user.save();
//     response.status(201).json(saveUser);
//   } catch (error) {
//     response.status(400).json(error);
//   }
// });

// module.exports = usersRouter;
