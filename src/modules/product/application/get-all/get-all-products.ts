import { Product } from '../../domain/product';
import { ProductRepository } from '../../domain/product.repository';

export function getAllProducts(
  productRepository: ProductRepository,
  options: {
    keyword: string;
    limit: number;
  }
): Promise<Product[]> {
  return productRepository.getAll(options);
}
