
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';

const ListingCard = ({ hotel }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link to={`/listing/${hotel.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-200 ${
                isFavorited 
                  ? "fill-red-500 text-red-500" 
                  : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 rounded-lg px-2 py-1 flex items-center space-x-1 shadow-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.location}</span>
          </div>

          {/* Hotel Name */}
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {hotel.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {hotel.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">${hotel.price}</span>
              <span className="text-gray-600 text-sm ml-1">/ night</span>
            </div>
            
            {/* Reviews count */}
            <div className="text-sm text-gray-600">
              {hotel.reviews.length} review{hotel.reviews.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
