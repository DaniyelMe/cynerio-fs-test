export function validateAlphaLengthName(name: string): boolean {
  const regex = /^[A-Za-z]{3,32}$/;
  return !!name && regex.test(name);
}

export function validateAlphaNumericAddress(address: string): boolean {
  const regex = /^[A-Za-z0-9 .]{3,100}$/;
  return !!address && regex.test(address);
}

export function validateAlphaNumeric(string: string): boolean {
  const regex = /^[A-Za-z0-9]{1,100}$/;
  return !!string && regex.test(string);
}
