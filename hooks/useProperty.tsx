import { Property } from "@/types/propertyStore";
import { useState } from "react";
import toast from "react-hot-toast";
export default function useProperty(property: Property) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "features" | "video">(
    "details"
  );

  //  Control gallery image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  //   property details
  const handleShareProperty = () => {
    if (navigator.share) {
      navigator
        .share({
          title: property.title,
          text: `شاهد هذا العقار: ${property.title}`,
          url: window.location.href,
        })
        .catch(() => {
          toast.error("حدث خطأ ما");
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط العقار");
    }
  };

  // Format address
  const formattedAddress = [
    property.location.street,
    property.location.district,
    property.location.city,
  ]
    .filter(Boolean)
    .join("، ");

  return {
    // property Gallery
    currentImageIndex,
    nextImage,
    prevImage,
    goToImage,
    // property Details
    activeTab,
    setActiveTab,
    handleShareProperty,
    formattedAddress,
  };
}
