
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockHotels } from '../data/mockData';
import { Star, MapPin, Heart, ArrowLeft, Users, Wifi, Car, Coffee } from 'lucide-react';
import ReviewSection from '../components/ReviewSection';
import Button from '../components/ui/Button';

const ViewListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hotel = mockHotels.find(h => h.id === parseInt(id));

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h2>
          <Button onClick={() => navigate('/listings')}>
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Parking': Car,
    'Breakfast': Coffee,
    'Room Service': Users
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const calculateAverageRating = () => {
    if (hotel.reviews.length === 0) return 0;
    const sum = hotel.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / hotel.reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            
            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
            >
              <Heart 
                className={`h-6 w-6 transition-colors duration-200 ${
                  isFavorited 
                    ? "fill-red-500 text-red-500" 
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>

            {/* Image Navigation */}
            {hotel.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {hotel.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'bg-white' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {hotel.images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {hotel.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    currentImageIndex === index 
                      ? 'border-blue-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${hotel.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Header */}
            <div className="mb-6">
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{calculateAverageRating()}</span>
                  <span className="text-gray-600">({hotel.reviews.length} reviews)</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Users;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection hotel={hotel} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                    <span className="text-gray-600 ml-1">/ night</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{calculateAverageRating()}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
                  Reserve Now
                </Button>

                <p className="text-center text-sm text-gray-600">
                  You won't be charged yet
                </p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">${hotel.price} × 5 nights</span>
                    <span className="text-gray-900">${hotel.price * 5}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">$50</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$30</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900">${hotel.price * 5 + 80}</span>
                    </div>
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
