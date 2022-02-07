// const uniqueValidator = require("mongoose-unique-validator");
// const { Schema, model } = require("mongoose");

// const userSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//   },
//   name: String,
//   passwordHash: String,
//   socios: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Socio",
//     },
//   ],
// });
// //////////////////// Trasformo el modelo /////////////////
// //////////////////////////////////////////////////////////
// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id;
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.passwordHash;
//   },
// });

// userSchema.plugin(uniqueValidator);
// //////////////////// Instancio el modelo /////////////////
// //////////////////////////////////////////////////////////
// const User = model("User", userSchema);

// module.exports = User;
