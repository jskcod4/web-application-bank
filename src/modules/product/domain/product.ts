import {
  ProductDateReleaseNotValidError,
  isProductDateReleaseValid,
} from "./product-date-release";
import {
  ProductDateRevisionNotValidError,
  isProductDateRevisionValid,
} from "./product-date-revision";
import {
  ProductDescriptionNotValidError,
  isProductDescriptionValid,
} from "./product-description";

import { ProductIdNotValidError, isProductIdValid } from "./product-id";

import {
  ProductImageUrlNotValidError,
  isProductImageUrlValid,
} from "./product-image-url";

import { ProductNameNotValidError, isProductNameValid } from "./product-name";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dateRelease: Date;
  dateRevision: Date;
}

export function ensureProductIsValid({
  id,
  name,
  description,
  imageUrl,
  dateRelease,
  dateRevision,
}: Product): void {
  if (!isProductIdValid(id)) {
    throw ProductIdNotValidError(id);
  }

  if (!isProductNameValid(name)) {
    throw ProductNameNotValidError(name);
  }

  if (!isProductDescriptionValid(description)) {
    throw ProductDescriptionNotValidError(description);
  }

  if (!isProductImageUrlValid(imageUrl)) {
    throw ProductImageUrlNotValidError(imageUrl);
  }

  if (!isProductDateReleaseValid(dateRelease)) {
    throw ProductDateReleaseNotValidError(dateRelease);
  }

  if (!isProductDateRevisionValid(dateRevision, dateRelease)) {
    throw ProductDateRevisionNotValidError(dateRevision);
  }
}
