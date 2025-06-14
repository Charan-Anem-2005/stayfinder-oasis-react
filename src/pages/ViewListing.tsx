
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockHotels } from '@/data/mockData';
import ReviewSection from '@/components/ReviewSection';
import { Heart, Star, MapPin, ArrowLeft, Wifi, Car, Coffee, Utensils, Waves, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ViewListing = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hotel = mockHotels.find(h => h.id === id);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h1>
          <Link to="/listings">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Pool': <Waves className="h-5 w-5" />,
    'Spa': <Coffee className="h-5 w-5" />,
    'Restaurant': <Utensils className="h-5 w-5" />,
    'Gym': <Dumbbell className="h-5 w-5" />,
    'Valet Parking': <Car className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/listings" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hotel Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          {/* Image Gallery */}
          <div className="relative h-64 sm:h-80 lg:h-96">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Heart 
                className={cn(
                  "h-6 w-6 transition-colors duration-200",
                  isFavorited 
                    ? "fill-red-500 text-red-500" 
                    : "text-gray-600 hover:text-red-500"
                )}
              />
            </button>

            {/* Image Navigation */}
            {hotel.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {hotel.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-200",
                      index === currentImageIndex 
                        ? "bg-white" 
                        : "bg-white bg-opacity-50 hover:bg-opacity-75"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hotel Info */}
          <div className="p-6 lg:p-8">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {hotel.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < Math.round(hotel.rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{hotel.rating}</span>
                  </div>
                  <span className="text-gray-600">
                    ({hotel.reviews.length} review{hotel.reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              {/* Price and Booking */}
              <div className="lg:ml-8 bg-gray-50 rounded-lg p-6 min-w-[280px]">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                    <span className="text-gray-600 ml-2">/ night</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  Book Now
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  You won't be charged yet
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About this place</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-blue-600">
                      {amenityIcons[amenity] || <Coffee className="h-5 w-5" />}
                    </div>
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection reviews={hotel.reviews} averageRating={hotel.rating} />
      </div>
    </div>
  );
};

export default ViewListing;
