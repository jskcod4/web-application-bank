import { Product, ensureProductIsValid } from '../../domain/product';
import { ProductRepository } from '../../domain/product.repository';

export async function createProduct(
  productRepository: ProductRepository,
  product: Product
): Promise<void> {
  ensureProductIsValid(product);

  const isValidId = await productRepository.isValidId(product.id);

  if (isValidId) {
    return await productRepository.save(product);
  }

  return Promise.reject();
}
