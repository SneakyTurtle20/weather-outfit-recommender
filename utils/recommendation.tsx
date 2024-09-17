type WeatherCondition = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Drizzle' | 'Mist'

interface OutfitRecommendation {
  top: string[];
  bottom: string[];
  footwear: string[];
  accessories: string[];
}

const baseOutfits: Record<WeatherCondition, OutfitRecommendation> = {
  Clear: {
    top: ['Light t-shirt', 'Tank top'],
    bottom: ['Shorts', 'Light pants'],
    footwear: ['Sandals', 'Sneakers'],
    accessories: ['Sunglasses', 'Sunscreen', 'Hat'],
  },
  Clouds: {
    top: ['Light sweater', 'Long-sleeve shirt'],
    bottom: ['Jeans', 'Chinos'],
    footwear: ['Sneakers', 'Loafers'],
    accessories: ['Light jacket'],
  },
  Rain: {
    top: ['Waterproof jacket', 'Rain coat'],
    bottom: ['Water-resistant pants'],
    footwear: ['Waterproof shoes', 'Rain boots'],
    accessories: ['Umbrella', 'Waterproof bag'],
  },
  Snow: {
    top: ['Heavy coat', 'Thermal undershirt'],
    bottom: ['Insulated pants', 'Thermal leggings'],
    footwear: ['Snow boots', 'Insulated boots'],
    accessories: ['Scarf', 'Gloves', 'Beanie', 'Thick socks'],
  },
  Thunderstorm: {
    top: ['Waterproof jacket'],
    bottom: ['Water-resistant pants'],
    footwear: ['Waterproof shoes'],
    accessories: ['Umbrella', 'Waterproof bag'],
  },
  Drizzle: {
    top: ['Light rain jacket', 'Water-resistant top'],
    bottom: ['Jeans', 'Water-resistant pants'],
    footwear: ['Water-resistant shoes'],
    accessories: ['Small umbrella', 'Light scarf'],
  },
  Mist: {
    top: ['Light jacket', 'Sweater'],
    bottom: ['Jeans', 'Comfortable pants'],
    footwear: ['Closed-toe shoes'],
    accessories: ['Light scarf'],
  },
}

export function getOutfitRecommendation(weatherCondition: string, temperature: number): OutfitRecommendation {
  const condition = weatherCondition as WeatherCondition
  let recommendation = baseOutfits[condition] || baseOutfits.Clear

  // Temperature adjustments
  if (temperature < 0) {
    recommendation = {
      ...recommendation,
      top: [...recommendation.top, 'Heavy winter coat'],
      accessories: [...recommendation.accessories, 'Thermal underwear', 'Hand warmers'],
    }
  } else if (temperature < 10) {
    recommendation = {
      ...recommendation,
      top: [...recommendation.top, 'Warm jacket'],
      accessories: [...recommendation.accessories, 'Light gloves'],
    }
  } else if (temperature > 25) {
    recommendation = {
      ...recommendation,
      top: recommendation.top.filter(item => !item.includes('sweater') && !item.includes('jacket')),
      bottom: ['Shorts', 'Skirt'],
      accessories: [...recommendation.accessories, 'Sunscreen', 'Water bottle'],
    }
  } else if (temperature > 30) {
    recommendation = {
      ...recommendation,
      top: ['Light, breathable shirt', 'Tank top'],
      bottom: ['Light shorts', 'Breathable skirt'],
      footwear: ['Sandals', 'Open-toe shoes'],
      accessories: [...recommendation.accessories, 'Sunscreen', 'Water bottle', 'Cooling towel'],
    }
  }

  return recommendation
}