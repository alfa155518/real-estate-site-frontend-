import { RealEstate } from "./real-estate";



export interface FavoritePropertiesStore {
    favoriteProperties: RealEstate[];
    loadingIds: number[];
    isLoading: boolean;
    handleGetFavoriteProperties: () => Promise<void>;
    handleToggleFavorite: (propertyId: number) => Promise<void>;
}
