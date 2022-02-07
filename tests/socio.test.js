const mongoose = require("mongoose");

const { server } = require("../index");
const Socio = require("../models/Socio");
const { api, initialSocios, getAllLicenciasFromSocio } = require("./helpers");

beforeEach(async () => {
  await Socio.deleteMany({});

  // paralelo
  // const socioObject = initialSocios.map((socio) => new Socio(socio));
  // const promises = socioObject.map((socio) => socio.save());
  // await Promise.all(promises);
  //secuencial
  for (const socio of initialSocios) {
    const socioObject = new Socio(socio);
    await socioObject.save();
  }
});

describe("GET all socios", () => {
  test("socios are returned as json", async () => {
    await api
      .get("/api/socios")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two socios", async () => {
    const response = await api.get("/api/socios");
    expect(response.body).toHaveLength(initialSocios.length);
  });

  test("the first socios about ", async () => {
    const { licencias } = await getAllLicenciasFromSocio();

    expect(licencias).toContain("LU2KBR");
  });
});

describe("POST create a socio", () => {
  test("is possible with a valid socio", async () => {
    const newSocio = {
      numero: 1,
      nombre: "Test Ter",
      tipo: "A",
      licencia: "LUTEST",
      dni: 11111111,
      telefono: 2222222,
      direccion: "Test 123",
      pago: "2030-01-01",
    };

    await api
      .post("/api/socios")
      .send(newSocio)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const { licencias, response } = await getAllLicenciasFromSocio();

    expect(response.body).toHaveLength(initialSocios.length + 1);
    expect(licencias).toContain(newSocio.licencia);
  });

  test("is not possible with an invalid socio", async () => {
    const newSocio = {
      numero: 1,
      nombre: "Test Ter",
      tipo: "A",

      dni: 11111111,
      telefono: 2222222,
      direccion: "Test 123",
      pago: "2030-01-01",
    };

    await api.post("/api/socios").send(newSocio).expect(400);

    const response = await api.get("/api/socios");

    expect(response.body).toHaveLength(initialSocios.length);
  });
});

test("a socio can be delete", async () => {
  const { response: firstResponse } = await getAllLicenciasFromSocio();
  const { body: socios } = firstResponse;
  const socioToDelete = socios[0];

  await api.delete(`/api/socios/${socioToDelete.id}`).expect(204);

  const { licencias, response: secondResponse } =
    await getAllLicenciasFromSocio();

  expect(secondResponse.body).toHaveLength(initialSocios.length - 1);

  expect(licencias).not.toContain(socioToDelete.licencias);
});

test("a socio that has an invalid id can not be deleted", async () => {
  await api.delete("/api/socios/1234").expect(400);

  const { response } = await getAllLicenciasFromSocio();

  expect(response.body).toHaveLength(initialSocios.length);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
