"use client";

import SkeletonRealEstateCard from "@/components/common/SkeletonRealEstateCard";
import FavoriteItems from "./FavoriteItems";
import NoFavoriteProperties from "./NoFavoriteProperties";
import { useEffect } from "react";
import useFavoritePropertiesStore from "@/store/FavoritePropertiesStore";
import styles from "@/sass/pages/favorites/favorites.module.scss";

export default function RenderedFavorites() {
  // Favorite Properties Store
  const { favoriteProperties, handleGetFavoriteProperties, isLoading } =
    useFavoritePropertiesStore();

  // Load favorite properties
  useEffect(() => {
    async function getFavoriteProperties() {
      await handleGetFavoriteProperties();
    }
    getFavoriteProperties();
  }, [handleGetFavoriteProperties]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SkeletonRealEstateCard count={5} />
      </div>
    );
  }
  return !favoriteProperties.length ? (
    <NoFavoriteProperties />
  ) : (
    <FavoriteItems />
  );
}
