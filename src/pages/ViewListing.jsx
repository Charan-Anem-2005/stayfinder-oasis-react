
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockHotels } from '../data/mockData';
import ReviewSection from '../components/ReviewSection';
import { Heart, Star, MapPin, Wifi, Car, Coffee, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const ViewListing = () => {
  const { id } = useParams();
  const hotel = mockHotels.find(h => h.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Hotel not found</h1>
          <p className="text-gray-600 mt-2">The hotel you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const averageRating = hotel.reviews.length > 0 
    ? hotel.reviews.reduce((acc, review) => acc + review.rating, 0) / hotel.reviews.length
    : 0;

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Pool': Users,
    'Parking': Car,
    'Restaurant': Coffee,
    'Spa': Star,
    'Beach Access': Star,
    'Room Service': Coffee,
    'Fireplace': Star,
    'Mountain Views': Star,
    'Hiking Trails': Star,
    'Ski Access': Star,
    'Fitness Center': Users,
    'Business Center': Wifi,
    'Concierge': Users,
    'City Views': Star,
    'Garden': Star,
    'Wine Tasting': Coffee,
    'Cooking Classes': Coffee,
    'Bicycle Rental': Car
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          
          {/* Image Navigation */}
          {hotel.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`h-6 w-6 transition-colors ${
                isFavorite 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Image Indicators */}
          {hotel.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {hotel.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
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
                  <span className="font-semibold text-gray-900">{hotel.rating}</span>
                  <span className="text-gray-600">({hotel.reviews.length} reviews)</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Star;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-800">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <ReviewSection reviews={hotel.reviews} averageRating={averageRating} />
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-baseline justify-between mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                  <span className="text-gray-600 ml-2">/ night</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{hotel.rating}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5+ guests</option>
                  </select>
                </div>
              </div>

              <Button className="w-full text-lg py-3 mb-4">
                Reserve
              </Button>

              <p className="text-center text-sm text-gray-600">
                You won't be charged yet
              </p>

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">${hotel.price} × 5 nights</span>
                  <span className="text-gray-700">${hotel.price * 5}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Cleaning fee</span>
                  <span className="text-gray-700">$50</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Service fee</span>
                  <span className="text-gray-700">$75</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">${hotel.price * 5 + 125}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewListing;
