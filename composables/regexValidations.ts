export function validateAlphaLengthName(name: string): boolean {
  const regex = /^[A-Za-z]{3,32}$/;
  return regex.test(name);
}

export function validateAlphaNumericAddress(address: string): boolean {
  const regex = /^[A-Za-z0-9 .]{3,100}$/;
  return regex.test(address);
}
