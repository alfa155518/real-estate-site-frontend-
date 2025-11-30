"use client";

import { useState, useEffect } from "react";
import { RealEstate } from "@/types/real-estate";
import useAdminManagePropertiesStore from "@/store/admin/AdminManagePropertiesStore";
import { PropertyData } from "@/types/admin/adminPropertiesStore";
import { parseArabicNumber } from "@/utils/numberUtils";
import PresentationalProperties from "./PresentationalProperties";

export default function ContainerPropertiesPage() {

  // admin manage properties store
  const {
    properties,
    handleInitProperties,
    meta,
    handlePageChange,
    handleUpdateProperty,
    handleCreateProperty,
    handleDeleteProperty,
    isLoading,
  } = useAdminManagePropertiesStore();

  useEffect(() => {
    async function initProperties() {
      await handleInitProperties();
    }
    initProperties();
  }, [handleInitProperties]);

  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<RealEstate | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<RealEstate | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    property_type: "",
    type: "",
    status: "",
    city: "",
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEditProperty = (property: RealEstate) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleSubmit = async (data: PropertyData) => {
    // Check if we're creating or updating
    if (editingProperty && data.id !== undefined) {
      // Update existing property
      await handleUpdateProperty(meta.current_page, data.id, data);
    } else {
      // Create new property
      await handleCreateProperty(meta.current_page, data);
    }

    setShowModal(false);
    setEditingProperty(null);
  };

  // show delete modal
  const handleDeleteClick = (property: RealEstate) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  // handle confirm delete
  const handleConfirmDelete = async () => {
    if (propertyToDelete) {
      setIsDeleting(true);
      await handleDeleteProperty(propertyToDelete.id, meta.current_page);
      setIsDeleting(false);
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters to properties
  const filteredProperties = properties.filter((property) => {
    return (
      (filters.property_type === "" ||
        property.property_type === filters.property_type) &&
      (filters.type === "" || property.type === filters.type) &&
      (filters.status === "" || property.status === filters.status) &&
      (filters.city === "" ||
        property.location.city
          .toLowerCase()
          .includes(filters.city.toLowerCase()))
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      property_type: "",
      type: "",
      status: "",
      city: "",
    });
  };

  // Convert RealEstate to PropertyFormData format (updated for new fields if needed)
  const convertToFormData = (property: RealEstate): Partial<PropertyData> => {
    return {
      id: property.id,
      slug: property.slug,
      title: property.title,
      description: property.description,
      price: parseArabicNumber(property.price),
      discount: parseArabicNumber(property.discount),
      discounted_price: parseArabicNumber(property.discounted_price),
      type: property.type,
      purpose: property.purpose,
      property_type: property.property_type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      living_rooms: property.living_rooms,
      kitchens: property.kitchens,
      balconies: property.balconies,
      area_total: parseArabicNumber(property.area_total),
      features: property.features,
      tags: property.tags,
      floor: property.floor ?? 0,
      total_floors: property.total_floors ?? 0,
      furnishing: property.furnishing,
      status: property.status,
      is_featured: property.is_featured,
      owner_id: property.owner_id,
      location: {
        city: property.location.city,
        district: property.location.district,
        street: property.location.street,
        latitude: property.location.latitude,
        longitude: property.location.longitude,
        landmark: property.location.landmark ?? undefined,
      },
      // Add images as URLs (existing images)
      images: property.images?.map((img) => img.image_url) || [],
      // Add video if form supports it
      videos: property.videos?.[0]?.video_url
        ? [property.videos[0].video_url]
        : [],
    };
  };

  return (
    <PresentationalProperties
      filteredProperties={filteredProperties}
      meta={meta}
      isLoading={isLoading}
      showModal={showModal}
      showDeleteModal={showDeleteModal}
      editingProperty={editingProperty}
      propertyToDelete={propertyToDelete}
      isDeleting={isDeleting}
      showFilters={showFilters}
      filters={filters}
      handleAddProperty={handleAddProperty}
      handleEditProperty={handleEditProperty}
      handleDeleteClick={handleDeleteClick}
      handleConfirmDelete={handleConfirmDelete}
      handleCancelDelete={handleCancelDelete}
      handleSubmit={handleSubmit}
      handlePageChange={handlePageChange}
      handleFilterChange={handleFilterChange}
      resetFilters={resetFilters}
      setShowFilters={setShowFilters}
      setShowModal={setShowModal}
      convertToFormData={convertToFormData}
    />
  );
}
