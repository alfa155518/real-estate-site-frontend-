import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Home, Building, Heart, Info, Phone } from "lucide-react";

import { RealEstate } from "@/types/real-estate";
import useProfileStore from "@/store/ProfileStore";
import { UserHeaderFormData, NavLink } from "@/types/userHeader";
import useRealEstateStore from "@/store/RealestateStore";

export default function useUserHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<RealEstate[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<UserHeaderFormData>();

  const { handleFilters } = useRealEstateStore();

  // user profile store
  const { token, handleLogout, isLoading } = useProfileStore();

  const navLinks: NavLink[] = [
    { name: "الرئيسية", href: "/", icon: <Home size={20} /> },
    { name: "العقارات", href: "/realstate", icon: <Building size={20} /> },
    { name: "المفضلة", href: "/favorites", icon: <Heart size={20} /> },
    { name: "عننا", href: "/aboutUs", icon: <Info size={20} /> },
    { name: "تواصل معنا", href: "/support", icon: <Phone size={20} /> },
  ];

  //handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    useProfileStore.getState().initialize();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    //   handle search results
    const searchTerm = query.toLowerCase();

    // Call handleFilters to update the store with filtered results
    const response = await handleFilters({
      search: searchTerm,
    });

    // Get the filtered properties from the response
    const filteredProperties = response?.data?.properties || [];

    // Filter the properties based on the search term
    const results = filteredProperties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.location.city.toLowerCase().includes(searchTerm)
    );

    setSearchResults(results);
    setShowResults(true);
  };

  //   handle search submit
  const handleSearchSubmit = (data: UserHeaderFormData) => {
    if (data.search.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.search)}`);
      reset();
      setShowResults(false);
      setIsMobileMenuOpen(false);
    }
  };

  //   handle search result click
  const handleResultClick = (id: number, slug: string) => {
    router.push(`/realstate/${id}/${slug}`);
    setShowResults(false);
    reset();
  };

  //   handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchResults,
    showResults,
    setShowResults,
    searchRef,
    pathname,
    token,
    isLoading,
    navLinks,
    register,
    handleSubmit,
    handleSearch,
    handleSearchSubmit,
    handleResultClick,
    toggleMobileMenu,
    handleLogout,
  };
}
