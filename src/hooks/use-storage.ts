import { STORAGE_KEYS } from "@/utils/storage-keys";

export function useStorage() {
  function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) as string[] : [];
  }

  function addFavorite(itemCode: string)  {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, itemCode];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  }

  function removeFavorite(itemCode: string) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((favorite) => favorite !== itemCode);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  }

  return {
    getFavorites,
    addFavorite,
    removeFavorite,
  }
}