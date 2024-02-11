import { v4 as uuidv4 } from 'uuid';

export const PRODUCT_ID_MIN_LENGTH = 3;
export const PRODUCT_ID_MAX_LENGTH = 10;

export function isProductIdValid(id: string): boolean {
  if (id.length < PRODUCT_ID_MIN_LENGTH) {
    return false;
  }

  if (id.length > PRODUCT_ID_MAX_LENGTH) {
    return false;
  }

  return true;
}

export function ProductCreateId(): string {
  return generateId();
}

function generateId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

export function ProductIdNotValidError(id: string): Error {
  return new Error(`Id ${id} is not valid`);
}
