export const PRODUCT_DESCRIPTION_MIN_LENGTH = 10;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 200;

export function isProductDescriptionValid(description: string): boolean {
  if (description.length < PRODUCT_DESCRIPTION_MIN_LENGTH) {
    return false;
  }

  if (description.length > PRODUCT_DESCRIPTION_MAX_LENGTH) {
    return false;
  }

  if (description.trim() === '') {
    return false;
  }

  return true;
}

export function ProductDescriptionNotValidError(description: string): Error {
  return new Error(`Description ${description} is not valid`);
}
