import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { entityTypes } from './types';

export class EntityManager<T> {
  route: string;
  constructor(protected entityType: entityTypes, protected http: HttpClient) {
    this.route = `${environment.api}/${entityType}`;
  }

  async select(id?: string): Promise<T> {
    return await this.http
      .get<T>(`${this.route}${id ? `/${id}` : `s/all`}`)
      .toPromise<T>();
  }

  async update(id: string, values: T): Promise<T> {
    return await this.http
      .put<T>(`${this.route}${`/${id}`}`, values)
      .toPromise<T>();
  }

  async create(values: T[] | T): Promise<T> {
    return await this.http
      .post<T>(`${this.route}${Array.isArray(values) ? 's' : ''}`, values)
      .toPromise<T>();
  }

  async delete(id: string): Promise<T> {
    return await this.http
      .delete<T>(`${this.route}${id ? `/${id}` : `s/all`}`)
      .toPromise<T>();
  }
}
