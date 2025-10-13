import { STORAGE_KEYS } from "@/utils/storage-keys";
import type { AbilityDTO } from "@/dtos/ability-dto";

export function useStorage() {
  function getFavorites() {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) as string[] : [];
  }

  function emitFavoritesChanged() {
    try {
      window.dispatchEvent(new Event('favorites-changed'));
    } catch {}
  }

  function addFavorite(itemCode: string)  {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, itemCode];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    emitFavoritesChanged();
  }

  function removeFavorite(itemCode: string) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((favorite) => favorite !== itemCode);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    emitFavoritesChanged();
  }

  function findByCode(code: string) {
    const favorites = getFavorites();
    return !!favorites.find((favorite) => favorite === code)
  }

  function getFavoritesDataMap(): Record<string, AbilityDTO> {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES_DATA);
    return raw ? JSON.parse(raw) as Record<string, AbilityDTO> : {};
  }

  function setFavoritesDataMap(map: Record<string, AbilityDTO>) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES_DATA, JSON.stringify(map));
    emitFavoritesChanged();
  }

  function addFavoriteWithData(ability: AbilityDTO) {
    addFavorite(ability.codigo);
    const map = getFavoritesDataMap();
    map[ability.codigo] = ability;
    setFavoritesDataMap(map);
  }

  function removeFavoriteData(code: string) {
    const map = getFavoritesDataMap();
    if (map[code]) {
      delete map[code];
      setFavoritesDataMap(map);
    }
  }

  function saveFavoriteAbilitiesBatch(list: AbilityDTO[]) {
    if (!list?.length) return;
    const map = getFavoritesDataMap();
    for (const ability of list) {
      map[ability.codigo] = ability;
    }
    setFavoritesDataMap(map);
  }

  function getFavoriteAbilities(): AbilityDTO[] {
    const codes = getFavorites();
    const map = getFavoritesDataMap();
    return codes.map(code => map[code]).filter(Boolean);
  }

  function getFavoriteAbilityByCode(code: string): AbilityDTO | null {
    const map = getFavoritesDataMap();
    return map[code] ?? null;
  }

  return {
    getFavorites,
    addFavorite,
    removeFavorite,
    findByCode,
    addFavoriteWithData,
    removeFavoriteData,
    saveFavoriteAbilitiesBatch,
    getFavoriteAbilities,
    getFavoriteAbilityByCode,
  }
}