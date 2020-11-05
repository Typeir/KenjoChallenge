export type Entity = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
};

export const entities = ['artist', 'album'] as const;

export type entityTypes = typeof entities[number];
