
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockHotels } from '../data/mockData';
import { Star, Calendar, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';

const MyReviews = () => {
  const { user, isAuthenticated } = useAuth();

  // Get all reviews from the user across all hotels
  const userReviews = mockHotels.flatMap(hotel => 
    hotel.reviews
      .filter(review => review.userId === user?.id)
      .map(review => ({
        ...review,
        hotelName: hotel.name,
        hotelId: hotel.id,
        hotelImage: hotel.images[0]
      }))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please log in to view your reviews.</p>
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">
            You have written {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}
          </p>
        </div>

        {userReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring and sharing your experiences with amazing stays.
            </p>
            <Button onClick={() => window.location.href = '/listings'}>
              Browse Listings
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {userReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.hotelImage}
                    alt={review.hotelName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.hotelName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{review.date}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/listing/${review.hotelId}`}
                      >
                        View Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
