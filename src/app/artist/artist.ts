import { Entity } from '../shared/types';

export type Artist = {
  name: string;
  photoUrl: string;
  birthdate: string;
  deathDate: string;
};

export type ArtistEntity = Artist & Entity;
