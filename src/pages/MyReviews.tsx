
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockHotels } from '@/data/mockData';
import { Star, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MyReviews = () => {
  const { user, isAuthenticated } = useAuth();

  // Find reviews by current user (mock data)
  const userReviews = mockHotels.flatMap(hotel => 
    hotel.reviews
      .filter(review => user && review.userName === user.username)
      .map(review => ({
        ...review,
        hotelName: hotel.name,
        hotelId: hotel.id,
        hotelImage: hotel.images[0],
        hotelLocation: hotel.location
      }))
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your reviews</h1>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">
            Welcome back, {user?.username}! Here are all your reviews.
          </p>
        </div>

        {/* Reviews List */}
        {userReviews.length > 0 ? (
          <div className="space-y-6">
            {userReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  {/* Hotel Info */}
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={review.hotelImage}
                      alt={review.hotelName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link 
                        to={`/listing/${review.hotelId}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {review.hotelName}
                      </Link>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{review.hotelLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Details */}
                  <div className="space-y-3">
                    {/* Rating and Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="font-semibold text-gray-900">{review.rating}/5</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring and stay at amazing places to leave your first review!
            </p>
            <Link to="/listings">
              <Button>Browse Listings</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
