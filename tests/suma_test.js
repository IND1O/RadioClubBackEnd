const suma = (a, b) => {
  return a + b;
};

const check = [
  { a: 0, b: 0, result: 0 },
  { a: 1, b: 3, result: 4 },
  { a: -3, b: 3, result: 0 },
];

check.forEach((chec) => {
  const { a, b, result } = chec;

  console.assert(
    suma(a, b) === result,
    `la suma de ${a} y ${b} deberia ser ${result}`
  );
});

console.log(`${check.length} check performed ...`);

// console.assert(suma(1, 3) === 4, "la suma de 1 y 3 deberia ser 4");

// console.assert(suma(0, 0) === 0, "la suma de 0 y 0 deberia ser 0");
