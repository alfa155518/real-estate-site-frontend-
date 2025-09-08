'use client';

import { RealEstate } from '@/types/real-estate';
import RealEstateCard from '@/components/common/RealEstateCard';
import styles from '@/sass/pages/home/SomeRealStateItems.module.scss';


const properties: RealEstate[] =[
  {
    "id": 1,
    "title": "شقة فاخرة في مدينة نصر",
    "description": "شقة 150 متر مربع في موقع متميز، تشطيب سوبر لوكس، تطل على شارع رئيسي.",
    "price": 2500000.00,
    "discount": 10.00,
    "discounted_price": 2250000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 150.00,
    "location": "القاهرة، مدينة نصر، شارع النصر",
    "latitude": 30.0444,
    "longitude": 31.2357,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/real-estate-luxury-apartment-in-nasr-city-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/real-estate-luxury-apartment-in-nasr-city-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مصعد", "موقف سيارات", "تكييف مركزي"],
    "created_at": "2025-09-04T12:00:00Z",
    "updated_at": "2025-09-04T12:00:00Z"
  },
  {
    "id": 2,
    "title": "شقة راقية في الزمالك",
    "description": "شقة 200 متر بتشطيب فاخر في قلب الزمالك، إطلالة مفتوحة على النيل.",
    "price": 4500000.00,
    "discount": 5.00,
    "discounted_price": 4275000.00,
    "type": "sale",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "area": 200.00,
    "location": "القاهرة، الزمالك، كورنيش النيل",
    "latitude": 30.0595,
    "longitude": 31.2241,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/real-estate-luxury-apartment-in-zamalek-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/real-estate-luxury-apartment-in-zamalek-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "غرفة خادمة", "موقف سيارات"],
    "created_at": "2025-09-04T12:10:00Z",
    "updated_at": "2025-09-04T12:10:00Z"
  },
  {
    "id": 3,
    "title": "فيلا مستقلة في الشيخ زايد",
    "description": "فيلا 500 متر بحديقة خاصة، تصميم عصري ومسبح خاص.",
    "price": 12500000.00,
    "discount": 8.00,
    "discounted_price": 11500000.00,
    "type": "sale",
    "bedrooms": 6,
    "bathrooms": 5,
    "living_rooms": 3,
    "area": 500.00,
    "location": "الجيزة، الشيخ زايد، الحي الرابع",
    "latitude": 30.0179,
    "longitude": 30.9725,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/real-estate-independent-villa-in-sheikh-zayed-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/real-estate-independent-villa-in-sheikh-zayed-2.webp",
        "is_primary": false
      }
    ],
    "features": ["حديقة", "مسبح", "جراج خاص"],
    "created_at": "2025-09-04T12:20:00Z",
    "updated_at": "2025-09-04T12:20:00Z"
  },
  {
    "id": 4,
    "title": "شقة حديثة في المعادي",
    "description": "شقة 160 متر بتشطيب مودرن، قريبة من كورنيش المعادي.",
    "price": 3200000.00,
    "discount": 12.00,
    "discounted_price": 2816000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 160.00,
    "location": "القاهرة، المعادي، كورنيش النيل",
    "latitude": 29.9603,
    "longitude": 31.2573,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/real-estate-modern-apartment-in-maadi-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/real-estate-modern-apartment-in-maadi-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مصعد", "أمن 24 ساعة", "موقف سيارات"],
    "created_at": "2025-09-04T12:30:00Z",
    "updated_at": "2025-09-04T12:30:00Z"
  },
  {
    "id": 5,
    "title": "شقة للإيجار في التجمع الخامس",
    "description": "شقة 120 متر للإيجار الشهري، تشطيب ممتاز، قريبة من الجامعة الأمريكية.",
    "price": 15000.00,
    "discount": 0.00,
    "discounted_price": 15000.00,
    "type": "rent",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 120.00,
    "location": "القاهرة الجديدة، التجمع الخامس، شارع التسعين",
    "latitude": 30.0250,
    "longitude": 31.4833,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/real-estate-apartment-for-rent-in-the-fifth-settle-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/real-estate-apartment-for-rent-in-the-fifth-settle-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مكيفات", "مطبخ مجهز", "مصعد"],
    "created_at": "2025-09-04T12:40:00Z",
    "updated_at": "2025-09-04T12:40:00Z"
  },
  {
    "id": 6,
    "title": "شقة مفروشة في مصر الجديدة",
    "description": "شقة 100 متر مفروشة بالكامل للإيجار الشهري بالقرب من الكلية الحربية.",
    "price": 12000.00,
    "discount": 0.00,
    "discounted_price": 12000.00,
    "type": "rent",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 100.00,
    "location": "القاهرة، مصر الجديدة، شارع عمر بن الخطاب",
    "latitude": 30.0876,
    "longitude": 31.3440,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/furnished-apartment-in-heliopolis-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/furnished-apartment-in-heliopolis-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مكيفات", "انترنت", "شرفة"],
    "created_at": "2025-09-04T12:50:00Z",
    "updated_at": "2025-09-04T12:50:00Z"
  },
  {
    "id": 7,
    "title": "شقة دوبلكس في 6 أكتوبر",
    "description": "شقة دوبلكس 250 متر في كمبوند متكامل الخدمات بمدينة 6 أكتوبر.",
    "price": 3800000.00,
    "discount": 7.00,
    "discounted_price": 3534000.00,
    "type": "sale",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "area": 250.00,
    "location": "الجيزة، 6 أكتوبر، الحي الثاني",
    "latitude": 29.9340,
    "longitude": 30.9130,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/duplex-apartment-in-6th-of-october-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/duplex-apartment-in-6th-of-october-2.webp",
        "is_primary": false
      }
    ],
    "features": ["حديقة", "موقف سيارات", "أمن 24 ساعة"],
    "created_at": "2025-09-04T13:00:00Z",
    "updated_at": "2025-09-04T13:00:00Z"
  },
  {
    "id": 8,
    "title": "ستوديو صغير في وسط البلد",
    "description": "ستوديو 60 متر للإيجار بالقرب من ميدان التحرير.",
    "price": 7000.00,
    "discount": 0.00,
    "discounted_price": 7000.00,
    "type": "rent",
    "bedrooms": 1,
    "bathrooms": 1,
    "living_rooms": 0,
    "area": 60.00,
    "location": "القاهرة، وسط البلد، ميدان التحرير",
    "latitude": 30.0445,
    "longitude": 31.2357,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/small-studio-in-downtown-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/small-studio-in-downtown-2.webp",
        "is_primary": false
      }
    ],
    "features": ["أثاث كامل", "انترنت", "مكيف"],
    "created_at": "2025-09-04T13:10:00Z",
    "updated_at": "2025-09-04T13:10:00Z"
  },
  {
    "id": 9,
    "title": "فيلا على البحر في الساحل الشمالي",
    "description": "فيلا 400 متر تطل مباشرة على البحر، حديقة خاصة ومسبح.",
    "price": 9500000.00,
    "discount": 6.00,
    "discounted_price": 8930000.00,
    "type": "sale",
    "bedrooms": 5,
    "bathrooms": 4,
    "living_rooms": 2,
    "area": 400.00,
    "location": "مطروح، الساحل الشمالي، الكيلو 80",
    "latitude": 31.0936,
    "longitude": 28.2597,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/villa-on-the-sea-in-the-north-coast-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/villa-on-the-sea-in-the-north-coast-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مسبح", "حديقة", "شاطئ خاص"],
    "created_at": "2025-09-04T13:20:00Z",
    "updated_at": "2025-09-04T13:20:00Z"
  },
  {
    "id": 10,
    "title": "شقة عائلية في الإسكندرية",
    "description": "شقة 180 متر بإطلالة جانبية على البحر، قريبة من مكتبة الإسكندرية.",
    "price": 3000000.00,
    "discount": 9.00,
    "discounted_price": 2730000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 180.00,
    "location": "الإسكندرية، سيدي جابر، الكورنيش",
    "latitude": 31.2156,
    "longitude": 29.9553,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/family-apartment-in-alexandria-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/family-apartment-in-alexandria-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "موقف سيارات"],
    "created_at": "2025-09-04T13:30:00Z",
    "updated_at": "2025-09-04T13:30:00Z"
  },
  {
    "id": 11,
    "title": "شقة حديثة في الشروق",
    "description": "شقة 140 متر في مدينة الشروق بتشطيب فاخر وبالقرب من الخدمات.",
    "price": 2200000.00,
    "discount": 4.00,
    "discounted_price": 2112000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 140.00,
    "location": "القاهرة، مدينة الشروق، الحي الثالث",
    "latitude": 30.1425,
    "longitude": 31.6275,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/modern-apartment-in-al-shorouk-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/modern-apartment-in-al-shorouk-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مصعد", "شرفة", "أمن"],
    "created_at": "2025-09-04T13:40:00Z",
    "updated_at": "2025-09-04T13:40:00Z"
  },
  {
    "id": 12,
    "title": "فيلا فاخرة في الرحاب",
    "description": "فيلا مستقلة 450 متر بحديقة واسعة وجراج خاص.",
    "price": 11000000.00,
    "discount": 10.00,
    "discounted_price": 9900000.00,
    "type": "sale",
    "bedrooms": 5,
    "bathrooms": 4,
    "living_rooms": 2,
    "area": 450.00,
    "location": "القاهرة الجديدة، مدينة الرحاب، المنطقة الرابعة",
    "latitude": 30.0639,
    "longitude": 31.4914,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/Leonardo_Phoenix_09_Luxurious_villa_with_a_Coleslaw_themed_fac_1.webp",
        "is_primary": true
      }
    ],
    "features": ["حديقة", "جراج خاص", "غرفة خادمة"],
    "created_at": "2025-09-04T13:50:00Z",
    "updated_at": "2025-09-04T13:50:00Z"
  },
  {
    "id": 13,
    "title": "شقة للايجار في العبور",
    "description": "شقة 130 متر للإيجار السنوي بتشطيب ممتاز وقريبة من الخدمات.",
    "price": 90000.00,
    "discount": 0.00,
    "discounted_price": 90000.00,
    "type": "rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 130.00,
    "location": "القاهرة، مدينة العبور، الحي الخامس",
    "latitude": 30.2282,
    "longitude": 31.4715,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/Apartment-for-rent-in-Obour-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/Apartment-for-rent-in-Obour-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مكيفات", "شرفة", "موقف سيارات"],
    "created_at": "2025-09-04T14:00:00Z",
    "updated_at": "2025-09-04T14:00:00Z"
  },
  {
    "id": 14,
    "title": "ستوديو مفروش في المعادي",
    "description": "ستوديو 70 متر للإيجار مفروش بالكامل بالقرب من المترو.",
    "price": 8000.00,
    "discount": 0.00,
    "discounted_price": 8000.00,
    "type": "rent",
    "bedrooms": 1,
    "bathrooms": 1,
    "living_rooms": 0,
    "area": 70.00,
    "location": "القاهرة، المعادي، شارع 9",
    "latitude": 29.9632,
    "longitude": 31.2760,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/furnished-studio-in-maadi-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/furnished-studio-in-maadi-2.webp",
        "is_primary": false
      }
    ],
    "features": ["أثاث كامل", "انترنت", "مكيف"],
    "created_at": "2025-09-04T14:10:00Z",
    "updated_at": "2025-09-04T14:10:00Z"
  },
  {
    "id": 15,
    "title": "شقة بإطلالة على الأهرامات",
    "description": "شقة 180 متر بتشطيب لوكس تطل مباشرة على الأهرامات.",
    "price": 3500000.00,
    "discount": 6.00,
    "discounted_price": 3290000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 180.00,
    "location": "الجيزة، الهرم، شارع الأهرام",
    "latitude": 29.9792,
    "longitude": 31.1342,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-with-a-view-of-the-pyramids-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-with-a-view-of-the-pyramids-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "أمن"],
    "created_at": "2025-09-04T14:20:00Z",
    "updated_at": "2025-09-04T14:20:00Z"
  },
  {
    "id": 16,
    "title": "شقة صغيرة في حدائق الأهرام",
    "description": "شقة 90 متر بتشطيب جيد وبسعر مناسب للشباب.",
    "price": 1200000.00,
    "discount": 3.00,
    "discounted_price": 1164000.00,
    "type": "sale",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 90.00,
    "location": "الجيزة، حدائق الأهرام، البوابة الأولى",
    "latitude": 29.9910,
    "longitude": 31.1015,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/small-apartment-in-the-pyramids-gardens-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/small-apartment-in-the-pyramids-gardens-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد"],
    "created_at": "2025-09-04T14:30:00Z",
    "updated_at": "2025-09-04T14:30:00Z"
  },
  {
    "id": 17,
    "title": "شقة للايجار في المنيل",
    "description": "شقة 110 متر بتشطيب ممتاز وإطلالة على النيل.",
    "price": 20000.00,
    "discount": 0.00,
    "discounted_price": 20000.00,
    "type": "rent",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 110.00,
    "location": "القاهرة، المنيل، شارع عبد العزيز آل سعود",
    "latitude": 30.0233,
    "longitude": 31.2260,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-for-rent-in-el-manial-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-for-rent-in-el-manial-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مكيفات", "أثاث"],
    "created_at": "2025-09-04T14:40:00Z",
    "updated_at": "2025-09-04T14:40:00Z"
  },
  {
    "id": 18,
    "title": "فيلا على الجولف في مدينتي",
    "description": "فيلا 600 متر بإطلالة مباشرة على ملعب الجولف، بها مسبح خاص.",
    "price": 15000000.00,
    "discount": 5.00,
    "discounted_price": 14250000.00,
    "type": "sale",
    "bedrooms": 6,
    "bathrooms": 5,
    "living_rooms": 3,
    "area": 600.00,
    "location": "القاهرة الجديدة، مدينتي، المنطقة 11",
    "latitude": 30.1121,
    "longitude": 31.6321,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/villa-on-golf-in-madinaty-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/villa-on-golf-in-madinaty-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مسبح", "حديقة", "جراج خاص"],
    "created_at": "2025-09-04T14:50:00Z",
    "updated_at": "2025-09-04T14:50:00Z"
  },
  {
    "id": 19,
    "title": "شقة في برج فاخر بالمهندسين",
    "description": "شقة 170 متر في برج حديث بوسط المهندسين مع أمن 24 ساعة.",
    "price": 3800000.00,
    "discount": 7.00,
    "discounted_price": 3534000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 170.00,
    "location": "الجيزة، المهندسين، شارع جامعة الدول",
    "latitude": 30.0567,
    "longitude": 31.2009,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-in-a-luxury-tower-in-mohandessin-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-in-a-luxury-tower-in-mohandessin-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مصعد", "أمن 24 ساعة", "موقف سيارات"],
    "created_at": "2025-09-04T15:00:00Z",
    "updated_at": "2025-09-04T15:00:00Z"
  },
  {
    "id": 20,
    "title": "شقة في برج سكني بوسط الإسكندرية",
    "description": "شقة 150 متر بتشطيب سوبر لوكس في قلب الإسكندرية.",
    "price": 2700000.00,
    "discount": 4.00,
    "discounted_price": 2592000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 150.00,
    "location": "الإسكندرية، محطة الرمل، شارع صفية زغلول",
    "latitude": 31.2018,
    "longitude": 29.9158,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-in-a-residential-tower-in-downtown-alexa-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-in-a-residential-tower-in-downtown-alexa-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "أمن"],
    "created_at": "2025-09-04T15:10:00Z",
    "updated_at": "2025-09-04T15:10:00Z"
  },
  {
    "id": 21,
    "title": "شقة على الكورنيش في الإسكندرية",
    "description": "شقة 200 متر بإطلالة مباشرة على البحر، تشطيب فاخر.",
    "price": 5000000.00,
    "discount": 8.00,
    "discounted_price": 4600000.00,
    "type": "sale",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "area": 200.00,
    "location": "الإسكندرية، الكورنيش، سبورتنج",
    "latitude": 31.2340,
    "longitude": 29.9480,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-on-the-corniche-in-alexandria-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-on-the-corniche-in-alexandria-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "موقف سيارات"],
    "created_at": "2025-09-04T15:20:00Z",
    "updated_at": "2025-09-04T15:20:00Z"
  },
  {
    "id": 22,
    "title": "شقة صغيرة في مدينة نصر",
    "description": "شقة 95 متر بتشطيب جيد قريبة من سيتي ستارز.",
    "price": 1750000.00,
    "discount": 3.00,
    "discounted_price": 1697500.00,
    "type": "sale",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 95.00,
    "location": "القاهرة، مدينة نصر، شارع عباس العقاد",
    "latitude": 30.0611,
    "longitude": 31.3450,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/small-apartment-in-nasr-city-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/small-apartment-in-nasr-city-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مصعد", "شرفة"],
    "created_at": "2025-09-04T15:30:00Z",
    "updated_at": "2025-09-04T15:30:00Z"
  },
  {
    "id": 23,
    "title": "فيلا راقية في 6 أكتوبر",
    "description": "فيلا 480 متر في كمبوند راقٍ بمدينة 6 أكتوبر مع مسبح وحديقة.",
    "price": 9800000.00,
    "discount": 7.00,
    "discounted_price": 9114000.00,
    "type": "sale",
    "bedrooms": 5,
    "bathrooms": 4,
    "living_rooms": 2,
    "area": 480.00,
    "location": "الجيزة، 6 أكتوبر، الحي المتميز",
    "latitude": 29.9500,
    "longitude": 30.9100,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/luxury-villa-in-6th-of-october-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/luxury-villa-in-6th-of-october-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مسبح", "حديقة", "غرفة خادمة"],
    "created_at": "2025-09-04T15:40:00Z",
    "updated_at": "2025-09-04T15:40:00Z"
  },
  {
    "id": 24,
    "title": "شقة للإيجار في الرحاب",
    "description": "شقة 160 متر للإيجار نصف مفروش في مدينة الرحاب.",
    "price": 18000.00,
    "discount": 0.00,
    "discounted_price": 18000.00,
    "type": "rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 160.00,
    "location": "القاهرة الجديدة، الرحاب، المنطقة السادسة",
    "latitude": 30.0670,
    "longitude": 31.4970,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-for-rent-in-al-rehab-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-for-rent-in-al-rehab-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "أمن"],
    "created_at": "2025-09-04T15:50:00Z",
    "updated_at": "2025-09-04T15:50:00Z"
  },
  {
    "id": 25,
    "title": "شقة استوديو في التجمع الخامس",
    "description": "شقة استوديو 65 متر مفروش بالكامل بالقرب من الجامعة الأمريكية.",
    "price": 10000.00,
    "discount": 0.00,
    "discounted_price": 10000.00,
    "type": "rent",
    "bedrooms": 1,
    "bathrooms": 1,
    "living_rooms": 0,
    "area": 65.00,
    "location": "القاهرة الجديدة، التجمع الخامس، شارع التسعين الجنوبي",
    "latitude": 30.0180,
    "longitude": 31.4750,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/studio-apartment-in-fifth-settlement-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/studio-apartment-in-fifth-settlement-2.webp",
        "is_primary": false
      }
    ],
    "features": ["أثاث كامل", "انترنت", "مكيف"],
    "created_at": "2025-09-04T16:00:00Z",
    "updated_at": "2025-09-04T16:00:00Z"
  },
  {
    "id": 26,
    "title": "فيلا على البحر في العين السخنة",
    "description": "فيلا 350 متر بإطلالة مباشرة على البحر مع مسبح خاص.",
    "price": 8700000.00,
    "discount": 6.00,
    "discounted_price": 8178000.00,
    "type": "sale",
    "bedrooms": 4,
    "bathrooms": 3,
    "living_rooms": 2,
    "area": 350.00,
    "location": "السويس، العين السخنة، منتجع لافيستا",
    "latitude": 29.6000,
    "longitude": 32.3167,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/villa-on-the-sea-in-ain-sokhna-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/villa-on-the-sea-in-ain-sokhna-2.webp",
        "is_primary": false
      }
    ],
    "features": ["مسبح", "شاطئ خاص", "حديقة"],
    "created_at": "2025-09-04T16:10:00Z",
    "updated_at": "2025-09-04T16:10:00Z"
  },
  {
    "id": 27,
    "title": "شقة سكنية في شبرا",
    "description": "شقة 110 متر بسعر مناسب وتشطيب متوسط بالقرب من المترو.",
    "price": 1250000.00,
    "discount": 2.00,
    "discounted_price": 1225000.00,
    "type": "sale",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 110.00,
    "location": "القاهرة، شبرا، شارع الترعة البولاقية",
    "latitude": 30.0720,
    "longitude": 31.2460,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/apartment-in-shubra-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/apartment-in-shubra-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد"],
    "created_at": "2025-09-04T16:20:00Z",
    "updated_at": "2025-09-04T16:20:00Z"
  },
  {
    "id": 28,
    "title": "شقة عائلية في سموحة",
    "description": "شقة 175 متر بتشطيب سوبر لوكس بإطلالة على نادي سموحة.",
    "price": 3200000.00,
    "discount": 5.00,
    "discounted_price": 3040000.00,
    "type": "sale",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 175.00,
    "location": "الإسكندرية، سموحة، شارع فوزي معاذ",
    "latitude": 31.2120,
    "longitude": 29.9420,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/Family-apartment-in-Smouha-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/Family-apartment-in-Smouha-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة", "مصعد", "موقف سيارات"],
    "created_at": "2025-09-04T16:30:00Z",
    "updated_at": "2025-09-04T16:30:00Z"
  },
  {
    "id": 29,
    "title": "شقة اقتصادية في المرج",
    "description": "شقة 80 متر بسعر اقتصادي وتشطيب عادي.",
    "price": 750000.00,
    "discount": 0.00,
    "discounted_price": 750000.00,
    "type": "sale",
    "bedrooms": 2,
    "bathrooms": 1,
    "living_rooms": 1,
    "area": 80.00,
    "location": "القاهرة، المرج، شارع المؤسسة",
    "latitude": 30.1520,
    "longitude": 31.3380,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/economic-apartment-in-marj-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/economic-apartment-in-marj-2.webp",
        "is_primary": false
      }
    ],
    "features": ["شرفة"],
    "created_at": "2025-09-04T16:40:00Z",
    "updated_at": "2025-09-04T16:40:00Z"
  },
  {
    "id": 30,
    "title": "شقة مفروشة في الزمالك",
    "description": "شقة 150 متر مفروشة بالكامل بإطلالة على النيل.",
    "price": 25000.00,
    "discount": 0.00,
    "discounted_price": 25000.00,
    "type": "rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "living_rooms": 1,
    "area": 150.00,
    "location": "القاهرة، الزمالك، شارع الجبلاية",
    "latitude": 30.0600,
    "longitude": 31.2250,
    "status": "available",
    "images": [
      {
        "id": 1,
        "image_url": "/images/data/furnished-apartment-in-zamalek-1.webp",
        "is_primary": true
      },
      {
        "id": 2,
        "image_url": "/images/data/furnished-apartment-in-zamalek-2.webp",
        "is_primary": false
      }
    ],
    "features": ["أثاث كامل", "مكيفات", "شرفة"],
    "created_at": "2025-09-04T16:50:00Z",
    "updated_at": "2025-09-04T16:50:00Z"
  }
]
;

import { useState } from 'react';
import Link from 'next/link';
import SectionName from '@/components/common/SectionName';

const SomeRealStateItems = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sale' | 'rent'>('all');

  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'all') return true;
    return property.type === activeFilter;
  });

  return (
    <section className={styles.section}>
      <div>
        <SectionName title="العقارات المتاحة" />
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            الكل
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'sale' ? styles.active : ''}`}
            onClick={() => setActiveFilter('sale')}
          >
            للبيع
          </button>
          <button 
            className={`${styles.filterButton} ${activeFilter === 'rent' ? styles.active : ''}`}
            onClick={() => setActiveFilter('rent')}
          >
            للايجار
          </button>
        </div>
        
        <div className={styles.grid}>
          {filteredProperties.map((property, index) => (
            <RealEstateCard 
              key={property.id} 
              property={property} 
              index={index % 4} // For staggered animations
            />
          ))}
        </div>
        
        <div className={styles.loadMoreContainer}>
          <Link href="/realstate" className={styles.loadMoreButton}>
            عرض المزيد من العقارات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SomeRealStateItems;


