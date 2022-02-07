const mongoose = require("mongoose");

// const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

// const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

const connectionString = process.env.MONGO_DB_URI;

// comment for students puposes
if (!connectionString) {
  console.error(
    "Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso)."
  );
}

// Conección a MongoDb

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("Base de datos Conectada");
  })
  .catch((err) => {
    console.error(err);
  });

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});

///////////////////// Busca todo /////////////////////////
//////////////////////////////////////////////////////////
// Socio.find({}).then((result) => {
//   console.log(result);
//   mongoose.connection.close();
// });

/////////// Agrega un Socio a la BD //////////////////////
//////////////////////////////////////////////////////////
// const socio = new Socio({
//   numero: 369,
//   tipo: "Activo",
//   nombre: "Prueba",
//   licencia: "LU2KGTA",
//   dni: 24671174,
//   telefono: 3815807972,
//   direccion: "Alberdi 287",
//   email: "prueba@prueba.com",
//   pago: "2022-12-31",
// });

// socio
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
