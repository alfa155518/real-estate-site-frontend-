import { RealEstateList } from "@/types/real-estate";

export const realEstateData: RealEstateList = [
  {
    "id": 1,
    "title": "شقة فاخرة في مدينة نصر",
    "slug": "شقة-فاخرة-في-مدينة-نصر",
    "description": "شقة 150 متر مربع في موقع متميز، تشطيب سوبر لوكس، تطل على شارع رئيسي.",
    "price": "2500000.00",
    "currency": "EGP",
    "discount": "10.00",
    "discount_percentage": "10.00",
    "discounted_price": "2250000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "150.00",
    "features": [
      "مصعد",
      "موقف سيارات",
      "تكييف مركزي"
    ],
    "tags": [
      "القاهرة",
      "مدينة نصر"
    ],
    "floor": 2,
    "total_floors": 5,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 94,
    "likes": 17,
    "is_featured": false,
    "created_at": "2025-09-04T12:00:00.000000Z",
    "updated_at": "2025-09-04T12:00:00.000000Z",
    "owner": {
      "id": 1,
      "name": "أحمد محمد",
      "phone": "021000000000",
      "email": "owner1@example.com",
      "type": "individual",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 1,
      "city": "القاهرة",
      "district": "مدينة نصر",
      "street": "شارع النصر",
      "latitude": "30.044400",
      "longitude": "31.235700",
      "landmark": null,
      "created_at": "2025-09-04T12:00:00.000000Z",
      "updated_at": "2025-09-04T12:00:00.000000Z"
    },
    "images": [
      {
        "id": 1,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-luxury-apartment-in-nasr-city-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:00:00.000000Z",
        "updated_at": "2025-09-04T12:00:00.000000Z"
      },
      {
        "id": 2,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-luxury-apartment-in-nasr-city-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:00:00.000000Z",
        "updated_at": "2025-09-04T12:00:00.000000Z"
      }
    ],
    "videos": [
      {
        "id": 1,
        "property_id": 1,
        "video_url": "https://127.0.0.1:8000/properties_videos/vedio_1.mp4",
      }
    ]
  },
  {
    "id": 2,
    "title": "شقة راقية في الزمالك",
    "slug": "شقة-راقية-في-الزمالك",
    "description": "شقة 200 متر بتشطيب فاخر في قلب الزمالك، إطلالة مفتوحة على النيل.",
    "price": "4500000.00",
    "currency": "EGP",
    "discount": "5.00",
    "discount_percentage": "5.00",
    "discounted_price": "4275000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "kitchens": 1,
    "balconies": 1,
    "area_total": "200.00",
    "features": [
      "شرفة",
      "غرفة خادمة",
      "موقف سيارات"
    ],
    "tags": [
      "القاهرة",
      "الزمالك"
    ],
    "floor": 4,
    "total_floors": 12,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 17,
    "likes": 47,
    "is_featured": false,
    "created_at": "2025-09-04T12:10:00.000000Z",
    "updated_at": "2025-09-04T12:10:00.000000Z",
    "owner": {
      "id": 2,
      "name": "فاطمة علي",
      "phone": "021000000001",
      "email": "owner2@example.com",
      "type": "company",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 2,
      "city": "القاهرة",
      "district": "الزمالك",
      "street": "كورنيش النيل",
      "latitude": "30.059500",
      "longitude": "31.224100",
      "landmark": null,
      "created_at": "2025-09-04T12:10:00.000000Z",
      "updated_at": "2025-09-04T12:10:00.000000Z"
    },
    "images": [
      {
        "id": 3,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-luxury-apartment-in-zamalek-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:10:00.000000Z",
        "updated_at": "2025-09-04T12:10:00.000000Z"
      },
      {
        "id": 4,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-luxury-apartment-in-zamalek-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:10:00.000000Z",
        "updated_at": "2025-09-04T12:10:00.000000Z"
      }
    ],
    "videos": [
      {
        "id": 2,
        "property_id": 2,
        "video_url": "https://127.0.0.1:8000/properties_videos/vedio_2.mp4",
      }
    ]
  },
  {
    "id": 3,
    "title": "فيلا مستقلة في الشيخ زايد",
    "slug": "فيلا-مستقلة-في-الشيخ-زايد",
    "description": "فيلا 500 متر بحديقة خاصة، تصميم عصري ومسبح خاص.",
    "price": "12500000.00",
    "currency": "EGP",
    "discount": "8.00",
    "discount_percentage": "8.00",
    "discounted_price": "11500000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "villa",
    "bedrooms": 6,
    "bathrooms": 5,
    "living_rooms": 3,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "500.00",
    "features": [
      "حديقة",
      "مسبح",
      "جراج خاص"
    ],
    "tags": [
      "الجيزة",
      "الشيخ زايد"
    ],
    "floor": null,
    "total_floors": null,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 86,
    "likes": 47,
    "is_featured": false,
    "created_at": "2025-09-04T12:20:00.000000Z",
    "updated_at": "2025-09-04T12:20:00.000000Z",
    "owner": {
      "id": 3,
      "name": "محمد أحمد",
      "phone": "021000000002",
      "email": "owner3@example.com",
      "type": "individual",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 3,
      "city": "الجيزة",
      "district": "الشيخ زايد",
      "street": "الحي الرابع",
      "latitude": "30.017900",
      "longitude": "30.972500",
      "landmark": null,
      "created_at": "2025-09-04T12:20:00.000000Z",
      "updated_at": "2025-09-04T12:20:00.000000Z"
    },
    "images": [
      {
        "id": 5,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-independent-villa-in-sheikh-zayed-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:20:00.000000Z",
        "updated_at": "2025-09-04T12:20:00.000000Z"
      },
      {
        "id": 6,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-independent-villa-in-sheikh-zayed-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:20:00.000000Z",
        "updated_at": "2025-09-04T12:20:00.000000Z"
      }
    ],
    "videos": [
      {
        "id": 3,
        "property_id": 3,
        "video_url": "https://127.0.0.1:8000/properties_videos/vedio_3.mp4",
      }
    ]
  },
  {
    "id": 4,
    "title": "شقة حديثة في المعادي",
    "slug": "شقة-حديثة-في-المعادي",
    "description": "شقة 160 متر بتشطيب مودرن، قريبة من كورنيش المعادي.",
    "price": "3200000.00",
    "currency": "EGP",
    "discount": "12.00",
    "discount_percentage": "12.00",
    "discounted_price": "2816000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "160.00",
    "features": [
      "مصعد",
      "أمن 24 ساعة",
      "موقف سيارات"
    ],
    "tags": [
      "القاهرة",
      "المعادي"
    ],
    "floor": 9,
    "total_floors": 7,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 75,
    "likes": 27,
    "is_featured": false,
    "created_at": "2025-09-04T12:30:00.000000Z",
    "updated_at": "2025-09-04T12:30:00.000000Z",
    "owner": {
      "id": 4,
      "name": "عائشة حسن",
      "phone": "021000000003",
      "email": "owner4@example.com",
      "type": "company",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 4,
      "city": "القاهرة",
      "district": "المعادي",
      "street": "كورنيش النيل",
      "latitude": "29.960300",
      "longitude": "31.257300",
      "landmark": null,
      "created_at": "2025-09-04T12:30:00.000000Z",
      "updated_at": "2025-09-04T12:30:00.000000Z"
    },
    "images": [
      {
        "id": 7,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-modern-apartment-in-maadi-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:30:00.000000Z",
        "updated_at": "2025-09-04T12:30:00.000000Z"
      },
      {
        "id": 8,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-modern-apartment-in-maadi-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:30:00.000000Z",
        "updated_at": "2025-09-04T12:30:00.000000Z"
      }
    ],
    "videos": [
      {
        "id": 4,
        "property_id": 4,
        "video_url": "https://127.0.0.1:8000/properties_videos/vedio_4.mp4",
      }
    ]
  },
  {
    "id": 5,
    "title": "شقة للإيجار في التجمع الخامس",
    "slug": "شقة-للإيجار-في-التجمع-الخامس",
    "description": "شقة 120 متر للإيجار الشهري، تشطيب ممتاز، قريبة من الجامعة الأمريكية.",
    "price": "15000.00",
    "currency": "EGP",
    "discount": "0.00",
    "discount_percentage": "0.00",
    "discounted_price": null,
    "type": "rent",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "120.00",
    "features": [
      "مكيفات",
      "مطبخ مجهز",
      "مصعد"
    ],
    "tags": [
      "القاهرة الجديدة",
      "التجمع الخامس"
    ],
    "floor": 1,
    "total_floors": 5,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 11,
    "likes": 13,
    "is_featured": true,
    "created_at": "2025-09-04T12:40:00.000000Z",
    "updated_at": "2025-09-04T12:40:00.000000Z",
    "owner": {
      "id": 5,
      "name": "علي خالد",
      "phone": "021000000004",
      "email": "owner5@example.com",
      "type": "individual",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 5,
      "city": "القاهرة الجديدة",
      "district": "التجمع الخامس",
      "street": "شارع التسعين",
      "latitude": "30.025000",
      "longitude": "31.483300",
      "landmark": null,
      "created_at": "2025-09-04T12:40:00.000000Z",
      "updated_at": "2025-09-04T12:40:00.000000Z"
    },
    "images": [
      {
        "id": 9,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-apartment-for-rent-in-the-fifth-settle-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:40:00.000000Z",
        "updated_at": "2025-09-04T12:40:00.000000Z"
      },
      {
        "id": 10,
        "image_url": "http://127.0.0.1:8000/properties_images/real-estate-apartment-for-rent-in-the-fifth-settle-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:40:00.000000Z",
        "updated_at": "2025-09-04T12:40:00.000000Z"
      }
    ],
    "videos": [
      {
        "id": 5,
        "property_id": 6,
        "video_url": "https://127.0.0.1:8000/properties_videos/vedio_5.mp4",
      }
    ]
  },
  {
    "id": 6,
    "title": "شقة مفروشة في مصر الجديدة",
    "slug": "شقة-مفروشة-في-مصر-الجديدة",
    "description": "شقة 100 متر مفروشة بالكامل للإيجار الشهري بالقرب من الكلية الحربية.",
    "price": "12000.00",
    "currency": "EGP",
    "discount": "0.00",
    "discount_percentage": "0.00",
    "discounted_price": null,
    "type": "rent",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "kitchens": 1,
    "balconies": 1,
    "area_total": "100.00",
    "features": [
      "مكيفات",
      "انترنت",
      "شرفة"
    ],
    "tags": [
      "القاهرة",
      "مصر الجديدة"
    ],
    "floor": 4,
    "total_floors": 5,
    "furnishing": "furnished",
    "status": "available",
    "views": 25,
    "likes": 45,
    "is_featured": false,
    "created_at": "2025-09-04T12:50:00.000000Z",
    "updated_at": "2025-09-04T12:50:00.000000Z",
    "owner": {
      "id": 6,
      "name": "سارة إبراهيم",
      "phone": "021000000005",
      "email": "owner6@example.com",
      "type": "company",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": {
      "id": 4,
      "name": "وكيل الساحل",
      "phone": "0470123456",
      "website": "https://agency4.com",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "location": {
      "id": 6,
      "city": "القاهرة",
      "district": "مصر الجديدة",
      "street": "شارع عمر بن الخطاب",
      "latitude": "30.087600",
      "longitude": "31.344000",
      "landmark": null,
      "created_at": "2025-09-04T12:50:00.000000Z",
      "updated_at": "2025-09-04T12:50:00.000000Z"
    },
    "images": [
      {
        "id": 11,
        "image_url": "http://127.0.0.1:8000/properties_images/furnished-apartment-in-heliopolis-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T12:50:00.000000Z",
        "updated_at": "2025-09-04T12:50:00.000000Z"
      },
      {
        "id": 12,
        "image_url": "http://127.0.0.1:8000/properties_images/furnished-apartment-in-heliopolis-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T12:50:00.000000Z",
        "updated_at": "2025-09-04T12:50:00.000000Z"
      }
    ]
  },
  {
    "id": 7,
    "title": "شقة دوبلكس في 6 أكتوبر",
    "slug": "شقة-دوبلكس-في-6-أكتوبر",
    "description": "شقة دوبلكس 250 متر في كمبوند متكامل الخدمات بمدينة 6 أكتوبر.",
    "price": "3800000.00",
    "currency": "EGP",
    "discount": "7.00",
    "discount_percentage": "7.00",
    "discounted_price": "3534000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "duplex",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "250.00",
    "features": [
      "حديقة",
      "موقف سيارات",
      "أمن 24 ساعة"
    ],
    "tags": [
      "الجيزة",
      "6 أكتوبر"
    ],
    "floor": 9,
    "total_floors": 18,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 28,
    "likes": 28,
    "is_featured": false,
    "created_at": "2025-09-04T13:00:00.000000Z",
    "updated_at": "2025-09-04T13:00:00.000000Z",
    "owner": {
      "id": 7,
      "name": "خالد عمر",
      "phone": "021000000006",
      "email": "owner7@example.com",
      "type": "individual",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 7,
      "city": "الجيزة",
      "district": "6 أكتوبر",
      "street": "الحي الثاني",
      "latitude": "29.934000",
      "longitude": "30.913000",
      "landmark": null,
      "created_at": "2025-09-04T13:00:00.000000Z",
      "updated_at": "2025-09-04T13:00:00.000000Z"
    },
    "images": [
      {
        "id": 13,
        "image_url": "http://127.0.0.1:8000/properties_images/duplex-apartment-in-6th-of-october-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T13:00:00.000000Z",
        "updated_at": "2025-09-04T13:00:00.000000Z"
      },
      {
        "id": 14,
        "image_url": "http://127.0.0.1:8000/properties_images/duplex-apartment-in-6th-of-october-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T13:00:00.000000Z",
        "updated_at": "2025-09-04T13:00:00.000000Z"
      }
    ]
  },
  {
    "id": 8,
    "title": "ستوديو صغير في وسط البلد",
    "slug": "ستوديو-صغير-في-وسط-البلد",
    "description": "ستوديو 60 متر للإيجار بالقرب من ميدان التحرير.",
    "price": "7000.00",
    "currency": "EGP",
    "discount": "0.00",
    "discount_percentage": "0.00",
    "discounted_price": null,
    "type": "rent",
    "purpose": "residential",
    "property_type": "studio",
    "bedrooms": 1,
    "bathrooms": 1,
    "living_rooms": 0,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "60.00",
    "features": [
      "أثاث كامل",
      "انترنت",
      "مكيف"
    ],
    "tags": [
      "القاهرة",
      "وسط البلد"
    ],
    "floor": 10,
    "total_floors": 13,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 0,
    "likes": 48,
    "is_featured": false,
    "created_at": "2025-09-04T13:10:00.000000Z",
    "updated_at": "2025-09-04T13:10:00.000000Z",
    "owner": {
      "id": 8,
      "name": "نورا يوسف",
      "phone": "021000000007",
      "email": "owner8@example.com",
      "type": "company",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 8,
      "city": "القاهرة",
      "district": "وسط البلد",
      "street": "ميدان التحرير",
      "latitude": "30.044500",
      "longitude": "31.235700",
      "landmark": null,
      "created_at": "2025-09-04T13:10:00.000000Z",
      "updated_at": "2025-09-04T13:10:00.000000Z"
    },
    "images": [
      {
        "id": 15,
        "image_url": "http://127.0.0.1:8000/properties_images/small-studio-in-downtown-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T13:10:00.000000Z",
        "updated_at": "2025-09-04T13:10:00.000000Z"
      },
      {
        "id": 16,
        "image_url": "http://127.0.0.1:8000/properties_images/small-studio-in-downtown-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T13:10:00.000000Z",
        "updated_at": "2025-09-04T13:10:00.000000Z"
      }
    ]
  },
  {
    "id": 9,
    "title": "فيلا على البحر في الساحل الشمالي",
    "slug": "فيلا-على-البحر-في-الساحل-الشمالي",
    "description": "فيلا 400 متر تطل مباشرة على البحر، حديقة خاصة ومسبح.",
    "price": "9500000.00",
    "currency": "EGP",
    "discount": "6.00",
    "discount_percentage": "6.00",
    "discounted_price": "8930000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "villa",
    "bedrooms": 5,
    "bathrooms": 4,
    "living_rooms": 2,
    "kitchens": 1,
    "balconies": 0,
    "area_total": "400.00",
    "features": [
      "مسبح",
      "حديقة",
      "شاطئ خاص"
    ],
    "tags": [
      "مطروح",
      "الساحل الشمالي"
    ],
    "floor": null,
    "total_floors": null,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 89,
    "likes": 27,
    "is_featured": false,
    "created_at": "2025-09-04T13:20:00.000000Z",
    "updated_at": "2025-09-04T13:20:00.000000Z",
    "owner": {
      "id": 9,
      "name": "يوسف زيد",
      "phone": "021000000008",
      "email": "owner9@example.com",
      "type": "individual",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": {
      "id": 1,
      "name": "وكالة عقارات القاهرة",
      "phone": "0220123456",
      "website": "https://agency1.com",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "location": {
      "id": 9,
      "city": "مطروح",
      "district": "الساحل الشمالي",
      "street": "الكيلو 80",
      "latitude": "31.093600",
      "longitude": "28.259700",
      "landmark": null,
      "created_at": "2025-09-04T13:20:00.000000Z",
      "updated_at": "2025-09-04T13:20:00.000000Z"
    },
    "images": [
      {
        "id": 17,
        "image_url": "http://127.0.0.1:8000/properties_images/villa-on-the-sea-in-the-north-coast-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T13:20:00.000000Z",
        "updated_at": "2025-09-04T13:20:00.000000Z"
      },
      {
        "id": 18,
        "image_url": "http://127.0.0.1:8000/properties_images/villa-on-the-sea-in-the-north-coast-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T13:20:00.000000Z",
        "updated_at": "2025-09-04T13:20:00.000000Z"
      }
    ]
  },
  {
    "id": 10,
    "title": "شقة عائلية في الإسكندرية",
    "slug": "شقة-عائلية-في-الإسكندرية",
    "description": "شقة 180 متر بإطلالة جانبية على البحر، قريبة من مكتبة الإسكندرية.",
    "price": "3000000.00",
    "currency": "EGP",
    "discount": "9.00",
    "discount_percentage": "9.00",
    "discounted_price": "2730000.00",
    "type": "sale",
    "purpose": "residential",
    "property_type": "apartment",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "kitchens": 1,
    "balconies": 1,
    "area_total": "180.00",
    "features": [
      "شرفة",
      "مصعد",
      "موقف سيارات"
    ],
    "tags": [
      "الإسكندرية",
      "سيدي جابر"
    ],
    "floor": 6,
    "total_floors": 13,
    "furnishing": "unfurnished",
    "status": "available",
    "views": 19,
    "likes": 13,
    "is_featured": true,
    "created_at": "2025-09-04T13:30:00.000000Z",
    "updated_at": "2025-09-04T13:30:00.000000Z",
    "owner": {
      "id": 10,
      "name": "زينب رامي",
      "phone": "021000000009",
      "email": "owner10@example.com",
      "type": "company",
      "created_at": "2025-09-04T10:00:00.000000Z",
      "updated_at": "2025-09-04T10:00:00.000000Z"
    },
    "agency": null,
    "location": {
      "id": 10,
      "city": "الإسكندرية",
      "district": "سيدي جابر",
      "street": "الكورنيش",
      "latitude": "31.215600",
      "longitude": "29.955300",
      "landmark": null,
      "created_at": "2025-09-04T13:30:00.000000Z",
      "updated_at": "2025-09-04T13:30:00.000000Z"
    },
    "images": [
      {
        "id": 19,
        "image_url": "http://127.0.0.1:8000/properties_images/family-apartment-in-alexandria-1.webp",
        "is_primary": true,
        "created_at": "2025-09-04T13:30:00.000000Z",
        "updated_at": "2025-09-04T13:30:00.000000Z"
      },
      {
        "id": 20,
        "image_url": "http://127.0.0.1:8000/properties_images/family-apartment-in-alexandria-2.webp",
        "is_primary": false,
        "created_at": "2025-09-04T13:30:00.000000Z",
        "updated_at": "2025-09-04T13:30:00.000000Z"
      }
    ]
  }
]