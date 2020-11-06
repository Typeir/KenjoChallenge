import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeepPartial } from 'utility-types';
import { EntityManager } from '../shared/entityManager';
import { AlbumEntity } from './album';

@Injectable({
  providedIn: 'root',
})
export class AlbumService extends EntityManager<DeepPartial<AlbumEntity>> {
  constructor(protected http: HttpClient) {
    super('album', http);
  }
}
