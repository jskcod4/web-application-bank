import { HttpClient } from '@angular/common/http';
import { Product } from '../domain/product';
import { ProductRepository } from '../domain/product.repository';
import { Observable, lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const FromApiProductsToProducts = (apiProducts: ApiProduct[]): Product[] =>
  apiProducts.map((product) => FromApiProductToProduct(product));

const FromApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.name,
  description: apiProduct.description,
  imageUrl: apiProduct.logo,
  dateRelease: new Date(apiProduct.date_release),
  dateRevision: new Date(apiProduct.date_revision),
});

const FromProductToApiProduct = (product: Product): ApiProduct => ({
  id: product.id,
  name: product.name,
  description: product.description,
  logo: product.imageUrl,
  date_release: format(product.dateRelease, 'yyyy-MM-dd'),
  date_revision: format(product.dateRevision, 'yyyy-MM-dd'),
});

const API_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

@Injectable({
  providedIn: 'root',
})
export class ApiProductRepository implements ProductRepository {
  constructor(private http: HttpClient) {}

  private findInValues(arr: Product[], value: string) {
    const keyword = String(value).toLowerCase();
    return arr.filter((o) =>
      Object.entries(o).some((entry) =>
        String(entry[1]).toLowerCase().includes(keyword)
      )
    );
  }

  async getAll(options: {
    keyword: string;
    limit: number;
  }): Promise<Product[]> {
    const obs$: Observable<ApiProduct[]> = this.http.get<ApiProduct[]>(API_URL);

    const res = await lastValueFrom(obs$);

    const mapValues = FromApiProductsToProducts(res);

    let responseArray = mapValues;

    if (options.keyword.trim() !== '') {
      responseArray = this.findInValues(mapValues, options.keyword);
    }

    if (options.limit) {
      responseArray = responseArray.slice(0, options.limit);
    }

    return responseArray;
  }

  async save(product: Product): Promise<void> {
    const data = FromProductToApiProduct(product);
    const obs$: Observable<void> = this.http.post<void>(API_URL, data);

    return lastValueFrom(obs$);
  }

  async isValidId(id: string): Promise<boolean> {
    const obs$: Observable<boolean> = this.http
      .get<boolean>(`${API_URL}/verification`, {
        params: {
          id,
        },
      })
      .pipe(map((res) => !res));

    return lastValueFrom(obs$);
  }

  async deleteOne(productId: string): Promise<void> {
    const obs$: Observable<ApiProduct[]> = this.http.delete<ApiProduct[]>(
      API_URL,
      {
        params: {
          id: productId,
        },
      }
    );

    await lastValueFrom(obs$);
  }

  async updateOne(productId: string, product: Product): Promise<void> {
    const data = FromProductToApiProduct(product);
    const obs$: Observable<ApiProduct[]> = this.http.put<ApiProduct[]>(
      API_URL,
      data
    );

    await lastValueFrom(obs$);
  }
}
