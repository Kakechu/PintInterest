import { Beer, NewBeer } from "@/types/beer";
import axios from "axios";

const BACKEND_URL =
  "https://pint-interest-kaisa-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getBeersApi(): Promise<Beer[]> {
  const response = await axios.get(BACKEND_URL + "beers.json");
  const beers: Beer[] = [];

  for (const key in response.data) {
    const beerObject: Beer = {
      id: key,
      name: response.data[key].name,
      rating: response.data[key].rating,
      description: response.data[key].description,
      photo: response.data[key].photo,
      favorite: response.data[key].favorite,
    };
    beers.push(beerObject);
  }
  return beers;
}

export async function addBeerApi(beerData: NewBeer) {
  const response = await axios.post(BACKEND_URL + "beers.json", beerData);
  return response;
}
