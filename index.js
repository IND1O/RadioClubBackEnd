require("dotenv").config();

require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");
//const Socio = require("./models/Socio");

const notFound = require("./middleware/notFound");
const handleErrors = require("./middleware/handleErrors");

const sociosRouter = require("./controllers/socios"); //(aqui) agregue la import del controlador
// const usersRouter = require("./controllers/users");
// const loginRouter = require("./controllers/login");
//const User = require("./models/User");
//const userExtractor = require("./middleware/userExtractor");
app.use(cors());
app.use(express.json());

//let socios = [];

///////////////////////////////////////////////////////////
//////////////////////// MIDDLEWARE ///////////////////////  cambie "/api/socios" x "/" en sociosRouter
///////////////////////////////////////////////////////////
app.use("/", sociosRouter);
//app.use("/api/socios", require("./routes/socios"));

//app.use("/api/login", loginRouter);

//app.use("/api/users", usersRouter);

app.use(notFound);

app.use(handleErrors);

///////////////////////////////////////////////////////////
//////////////////////// CONECTAR /////////////////////////
///////////////////////////////////////////////////////////
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}`);
});

module.exports = { app, server };
