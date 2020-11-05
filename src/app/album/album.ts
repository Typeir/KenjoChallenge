import { Entity } from '../shared/types';

export type Album = {
  title: string;
  artistId: string;
  coverUrl: string;
  year: number;
  genre: string;
};

export type AlbumEntity = Entity & Album;
