import { Entity } from '../shared/types';

export type Artist = {
  title: string;
  artistId: string;
  coverUrl: string;
  year: number;
  genre: string;
};

export type ArtistEntity = Artist & Entity;
