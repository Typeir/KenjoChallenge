import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeepPartial } from 'utility-types';
import { EntityManager } from '../shared/entityManager';
import { ArtistEntity } from './artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService extends EntityManager<DeepPartial<ArtistEntity>> {
  constructor(protected http: HttpClient) {
    super('artist', http);
  }
}
