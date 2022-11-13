export function generateRandomColor() {
  let maxVal = 0xFFFFFF; // 16777215.
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  let randnumber_string = randomNumber.toString(16);
  let randColor = randnumber_string.padStart(6, "0");
  return `#${randColor.toUpperCase()}`
}