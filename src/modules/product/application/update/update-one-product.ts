import { Product, ensureProductIsValid } from '../../domain/product';
import { ProductRepository } from '../../domain/product.repository';

export async function updateOneProduct(
  productRepository: ProductRepository,
  productId: string,
  product: Product
): Promise<void> {
  ensureProductIsValid(product);

  if (productId !== product.id) {
    const isValidId = await productRepository.isValidId(product.id);

    if (!isValidId) {
      return Promise.reject();
    }
  }

  await productRepository.updateOne(productId, product);
}
