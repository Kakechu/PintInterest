import { useAuthStore } from "@/store/authStore";
import { Beer, NewBeer } from "@/types/beer";
import axios, { isAxiosError } from "axios";

const BACKEND_URL = process.env.EXPO_PUBLIC_DATABASE_URL;

function handleApiError(error: any, fallbackMessage: string): never {
  if (isAxiosError(error)) {
    console.error("Axios error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || fallbackMessage);
  } else {
    console.error("Unexpected error:", error.message || error);
    throw new Error(error.message || fallbackMessage);
  }
}

export async function getBeersApi(): Promise<Beer[]> {
  try {
    const { userId, idToken } = useAuthStore.getState();

    if (!userId || !idToken) {
      throw new Error("User not authenticated.");
    }
    const response = await axios.get(
      `${BACKEND_URL}beers/${userId}.json?auth=${idToken}`
    );
    const beers: Beer[] = [];

    if (!response.data) return [];

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
  } catch (error: any) {
    handleApiError(error, "Failed to fetch beers.");
  }
}

export async function addBeerApi(beerData: NewBeer) {
  try {
    const { userId, idToken } = useAuthStore.getState();

    if (!userId || !idToken) {
      throw new Error("User not authenticated.");
    }
    const response = await axios.post(
      `${BACKEND_URL}beers/${userId}.json?auth=${idToken}`,
      beerData
    );
    return response;
  } catch (error: any) {
    handleApiError(error, "Failed to add beer.");
  }
}

export async function editBeerApi(editedBeer: Beer) {
  try {
    const { id, ...data } = editedBeer;
    const { userId, idToken } = useAuthStore.getState();
    if (!userId || !idToken) {
      throw new Error("User not authenticated.");
    }

    const response = await axios.put(
      `${BACKEND_URL}beers/${userId}/${id}.json?auth=${idToken}`,
      data
    );
    return response;
  } catch (error: any) {
    handleApiError(error, "Failed to edit beer.");
  }
}

export async function deleteBeerApi(id: string) {
  try {
    const { userId, idToken } = useAuthStore.getState();

    if (!userId || !idToken) {
      throw new Error("User not authenticated.");
    }
    const response = await axios.delete(
      `${BACKEND_URL}beers/${userId}/${id}.json?auth=${idToken}`
    );
    return response;
  } catch (error: any) {
    handleApiError(error, "Failed to delete beer.");
  }
}
