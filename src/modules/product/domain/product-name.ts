export const PRODUCT_NAME_MIN_LENGTH = 5;
export const PRODUCT_NAME_MAX_LENGTH = 100;

export function isProductNameValid(name: string): boolean {
  if (name.length < PRODUCT_NAME_MIN_LENGTH) {
    return false;
  }

  if (name.length > PRODUCT_NAME_MAX_LENGTH) {
    return false;
  }

  if (name.trim() === '') {
    return false;
  }

  return true;
}

export function ProductNameNotValidError(name: string): Error {
  return new Error(`Name ${name} is not valid`);
}
