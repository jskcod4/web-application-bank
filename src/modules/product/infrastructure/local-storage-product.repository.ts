import { Product } from '../domain/product';
import { ProductRepository } from '../domain/product.repository';

export function createLocalStorageProductRepository(): ProductRepository {
  return {
    getAll,
    isValidId,
    save,
    deleteOne,
    updateOne,
  };
}

async function updateOne(productId: string, product: Product): Promise<void> {
  const products = getAllFromLocalStorage();
  products.set(productId, product);

  const productsParsed = Array.from(products.entries());

  localStorage.setItem('products', JSON.stringify(productsParsed));

  await Promise.resolve();
}

async function deleteOne(productId: string): Promise<void> {
  const products = getAllFromLocalStorage();

  products.delete(productId);

  const productsParsed = Array.from(products.entries());

  localStorage.setItem('products', JSON.stringify(productsParsed));

  await Promise.resolve();
}

async function save(product: Product): Promise<void> {
  const products = getAllFromLocalStorage();

  products.set(product.id, product);

  const productsParsed = Array.from(products.entries());

  localStorage.setItem('products', JSON.stringify(productsParsed));

  await Promise.resolve();
}

async function isValidId(id: string): Promise<boolean> {
  const products = getAllFromLocalStorage();

  return products.size ? !products.has(id) : true;
}

async function getAll(): Promise<Product[]> {
  const products = getAllFromLocalStorage();
  const productsParsed = Array.from(products.values());

  return Promise.resolve(productsParsed);
}

function getAllFromLocalStorage(): Map<string, Product> {
  const products = localStorage.getItem('products');

  if (products === null) {
    return new Map();
  }

  const productsParsed = JSON.parse(products) as Product[];

  const resultsToMap = new Map(productsParsed as Iterable<[string, Product]>);

  return resultsToMap;
}
