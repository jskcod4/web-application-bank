import { ProductRepository } from '../../domain/product.repository';

export async function validateProductId(
  productRepository: ProductRepository,
  productId: string
): Promise<boolean> {
  return productRepository.isValidId(productId);
}
