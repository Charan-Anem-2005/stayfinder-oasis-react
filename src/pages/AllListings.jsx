
import React, { useState } from 'react';
import ListingCard from '../components/ListingCard';
import { mockHotels } from '../data/mockData';
import { Search, Filter } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AllListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(mockHotels);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = mockHotels.filter(hotel =>
      hotel.name.toLowerCase().includes(term.toLowerCase()) ||
      hotel.location.toLowerCase().includes(term.toLowerCase()) ||
      hotel.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Discover Amazing Stays
          </h1>
          <p className="text-xl text-center text-blue-100 mb-8">
            Find the perfect place for your next adventure
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search hotels, locations, or amenities..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredHotels.length} {filteredHotels.length === 1 ? 'Stay' : 'Stays'} Available
            </h2>
            {searchTerm && (
              <p className="text-gray-600 mt-1">
                Showing results for "{searchTerm}"
              </p>
            )}
          </div>
          
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Listings Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <ListingCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No stays found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all available stays.
            </p>
            <Button 
              onClick={() => handleSearch('')}
              className="mt-4"
            >
              Show All Stays
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;
