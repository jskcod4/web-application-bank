import { faker } from '@faker-js/faker';
import { Product } from '../domain/product';
import { ProductCreateId } from '../domain/product-id';
import { addYears } from 'date-fns';
import {
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
} from '../domain/product-name';
import {
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
} from '../domain/product-description';

export function GeneratePropertyMock(): Product {
  return {
    id: ProductCreateId(),
    name: faker.lorem.word({
      length: { min: PRODUCT_NAME_MIN_LENGTH, max: PRODUCT_NAME_MAX_LENGTH },
    }),
    description: faker.lorem.word({
      length: {
        min: PRODUCT_DESCRIPTION_MIN_LENGTH,
        max: PRODUCT_DESCRIPTION_MAX_LENGTH,
      },
    }),
    imageUrl: faker.image.url(),
    dateRelease: new Date(),
    dateRevision: addYears(new Date(), 1),
  };
}
