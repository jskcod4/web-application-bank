import { Product } from './product';

export interface ProductRepository {
  getAll: (options: { keyword: string; limit: number }) => Promise<Product[]>;
  save(product: Product): Promise<void>;
  isValidId: (id: string) => Promise<boolean>;
  deleteOne: (productId: string) => Promise<void>;
  updateOne: (productId: string, product: Product) => Promise<void>;
}
