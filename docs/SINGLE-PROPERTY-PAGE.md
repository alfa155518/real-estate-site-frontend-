# Single Property Page Implementation

This document provides an overview of the single property page implementation, including its features, components, and setup instructions.

## Features

1. **Image Gallery**
   - High-quality property images with slider navigation
   - Thumbnail navigation
   - Smooth transitions between images

2. **Property Details**
   - Title and location with map pin icon
   - Price display with original and discounted prices (if applicable)
   - Key features (bedrooms, bathrooms, area)
   - Detailed description
   - Property features list

3. **Contact Form**
   - Contact property owner/agent
   - Quick action buttons (call, email)
   - Safety tips for buyers/renters

4. **Interactive Map**
   - Property location on an interactive map
   - Marker with property title
   - Zoom and scale controls

5. **Reviews & Ratings**
   - Average rating display
   - User reviews with ratings and comments
   - Form to add new reviews

## Components

1. **PropertyMap**
   - Location: `components/ui/PropertyMap.tsx`
   - Uses Leaflet for interactive maps
   - Displays property location with a marker
   - Responsive design

2. **Single Property Page**
   - Location: `app/(pages)/realstate/[...single]/page.tsx`
   - Main container for the single property view
   - Integrates all sub-components
   - Handles state and data fetching

## Styling

- **SCSS Module**: `sass/pages/real-estate/singleRealEstate.module.scss`
- Responsive design with mobile-first approach
- Animation using Framer Motion
- RTL support for Arabic language

## Dependencies

- `next`: ^13.4.0
- `react`: ^18.2.0
- `framer-motion`: ^10.12.0
- `leaflet`: ^1.9.4
- `lucide-react`: ^0.250.0
- `@types/leaflet`: ^1.9.8

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install leaflet @types/leaflet framer-motion lucide-react
   ```

2. Add Leaflet CSS to your global CSS file:
   ```css
   @import '~leaflet/dist/leaflet.css';
   ```

3. Make sure to have the following marker images in your public directory:
   - `/public/images/marker-icon.png`
   - `/public/images/marker-icon-2x.png`
   - `/public/images/marker-shadow.png`

## Data Structure

The page expects a property object with the following structure:

```typescript
interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

interface RealEstate {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  discounted_price: number;
  type: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  living_rooms: number;
  area: number;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  images: PropertyImage[];
  features: string[];
  created_at: string;
  updated_at: string;
}
```

## Customization

### Styling
- Update colors in the SCSS variables
- Modify breakpoints for responsive design
- Adjust animation timings and easings

### Functionality
- Connect to your real estate API
- Implement form submission handlers
- Add authentication for review submission

## Notes

- The page is RTL by default for Arabic language support
- All text is in Arabic but can be easily internationalized
- The component includes mock data that should be replaced with real API calls in production
