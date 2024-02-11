export function isProductImageUrlValid(imageUrl: string): boolean {
  const regexExp =
    /^(?:https?:\/\/)?(?:[\w]+\.)(?:\.?[\w]{2,})(\/[\w]*)*(\.[\w]+)*/;

  return regexExp.test(imageUrl);
}

export function ProductImageUrlNotValidError(imageUrl: string): Error {
  return new Error(`Logo url ${imageUrl} is not valid`);
}
