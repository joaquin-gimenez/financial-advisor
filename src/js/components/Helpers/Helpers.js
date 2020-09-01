export function uppercaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function unCamelCase(string) {
  return string.split(/(?=[A-Z])/).join(" ");
}

export function toTwoDecimal(number) {
  return parseFloat(
    number.toFixed(2)
  );
}