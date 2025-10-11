import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { RealEstate, RealEstateFilterParams } from "@/types/real-estate";
import useRealEstateStore from "@/store/RealestateStore";
export default function useRealestate() {
  // RealEstate Store
  const {
    properties,
    handleInitProperties,
    handleFilters,
    handleResetFilters,
  } = useRealEstateStore();

  // ** RealEstate page logic
  useEffect(() => {
    handleInitProperties();
  }, [handleInitProperties]);

  // Memoize featured properties to avoid recalculating on every render
  const featuredProperties = useMemo(
    () =>
      properties?.filter((prop: RealEstate) => prop.is_featured).slice(0, 4),
    [properties]
  );

  //  ** RealEstate filters logic

  const initialFilters: RealEstateFilterParams = {
    type: "all",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    search: "",
  };

  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm<RealEstateFilterParams>({
      defaultValues: initialFilters,
    });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filters = watch();

  const handleTypeChange = (type: "all" | "sale" | "rent") => {
    setValue("type", type);
  };

  const onSubmit = async (data: RealEstateFilterParams) => {
    await handleFilters(data);
    setIsMobileFiltersOpen(false);
  };

  const applyFilters = async () => {
    const data = getValues();
    await onSubmit(data);
  };

  const resetFilters = async () => {
    await handleResetFilters();
    setIsMobileFiltersOpen(false);
    reset();
  };

  return {
    // ** RealEstate page logic
    featuredProperties,
    // ** RealEstate filters logic
    register,
    handleSubmit,
    setValue,
    control,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    filters,
    handleTypeChange,
    onSubmit,
    applyFilters,
    resetFilters,
  };
}
