const { palindrome } = require("../utils/for_testing");

test.skip("palindrome para josemaria", () => {
  const result = palindrome("josemaria");

  expect(result).toBe("airamesoj");
});

test.skip("palindrome para empty string", () => {
  const result = palindrome("");

  expect(result).toBe("");
});

test.skip("palindrome para empty undefined", () => {
  const result = palindrome();

  expect(result).toBeUndefined();
});
