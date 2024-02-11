import { ProductRepository } from '../../domain/product.repository';

export async function deleteOneProduct(
  productRepository: ProductRepository,
  productId: string
): Promise<void> {
  return productRepository.deleteOne(productId);
}
