export function convertToPath(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}
export function separarToPatch(dato) {
  let regex = /-(\d+)/;
  let m = regex.exec(dato);
  return m[1];
}

export function SelectDivisa(location) {
  const data =
    location.currency.code === "EUR"
      ? location.currency.code
      : location.currency.code === "USD"
      ? location.currency.code
      : location.currency.code === "COP"
      ? "USD"
      : "USD";
  return data;
}
