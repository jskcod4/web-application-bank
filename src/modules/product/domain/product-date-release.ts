export function isProductDateReleaseValid(date: Date): boolean {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (date < today) {
    return false;
  }

  return true;
}

export function ProductDateReleaseNotValidError(date: Date): Error {
  return new Error(`Name ${date} is not valid`);
}
