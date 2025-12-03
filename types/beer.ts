export type Beer = {
  id: string;
  name: string;
  rating: number;
  description: string;
  photo: string | undefined;
  favorite: boolean;
};

export type NewBeer = Omit<Beer, "id">;

export type BeerListProps = {
  items: Beer[];
};
