export type PropertyType = 'apartment' | 'duplex' | 'studio' | 'villa';
export type PurposeType = 'residential' | 'commercial' | 'other';
export type FurnishingType = 'furnished' | 'semi-furnished' | 'unfurnished' | 'not_specified';

export const getPropertyTypeLabel = (type: PropertyType): string => {
  const typeMap: Record<PropertyType, string> = {
    apartment: 'شقة',
    duplex: 'شقة مزدوجة',
    studio: 'استديو',
    villa: 'فيلا'
  };

  return typeMap[type] || 'غير محدد';
};

export const getPurposeLabel = (purpose: PurposeType): string => {
  const purposeMap: Record<PurposeType, string> = {
    residential: 'سكني',
    commercial: 'تجاري',
    other: 'غير محدد'
  };

  return purposeMap[purpose] || 'غير محدد';
};

export const getFurnishingLabel = (furnishing: FurnishingType): string => {
  const furnishingMap: Record<FurnishingType, string> = {
    furnished: 'مفروش',
    'semi-furnished': 'نصف مفروش',
    unfurnished: 'غير مفروش',
    not_specified: 'غير محدد'
  };

  return furnishingMap[furnishing] || 'غير محدد';
};
