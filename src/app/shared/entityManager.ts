import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { entityTypes } from './types';

export class EntityManager<T> {
  route: string;
  entity: T;
  constructor(protected entityType: entityTypes, protected http: HttpClient) {
    this.route = `${environment.api}/${entityType}`;
  }

  async select(id?: string): Promise<T | T[]> {
    return await this.http
      .get<T>(`${this.route}${id ? `/${id}` : `s/all`}`)
      .toPromise<T>();
  }

  async update(id: string, values: T): Promise<T> {
    return await this.http
      .put<T>(`${this.route}${`/${id}`}`, values)
      .toPromise<T>();
  }

  async create(values: T[]): Promise<T> {
    return await this.http
      .post<T>(
        `${this.route}${values.length > 1 ? 's' : ''}`,
        values.length > 1 ? values : values[0]
      )
      .toPromise<T>();
  }

  async delete(id: string): Promise<T> {
    return await this.http
      .delete<T>(`${this.route}${id ? `/${id}` : `s/all`}`)
      .toPromise<T>();
  }
}
