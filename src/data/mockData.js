
export const mockHotels = [
  {
    id: '1',
    name: 'Ocean View Resort',
    description: 'A luxurious beachfront resort with stunning ocean views, world-class amenities, and exceptional service. Perfect for romantic getaways or family vacations.',
    price: 299,
    location: 'Miami Beach, FL',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Gym'],
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'Sarah Johnson',
        rating: 5,
        comment: 'Amazing stay! The ocean view was breathtaking and the service was exceptional.',
        date: '2024-01-15'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Mike Chen',
        rating: 4,
        comment: 'Great location and beautiful rooms. The pool area could use some improvement.',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Mountain Lodge Retreat',
    description: 'Escape to the mountains in this cozy lodge surrounded by pristine wilderness. Features rustic charm with modern comforts.',
    price: 189,
    location: 'Aspen, CO',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.6,
    amenities: ['WiFi', 'Fireplace', 'Hiking Trails', 'Restaurant', 'Ski Access'],
    reviews: [
      {
        id: '3',
        userId: '3',
        userName: 'Emily Davis',
        rating: 5,
        comment: 'Perfect mountain getaway! The fireplace and mountain views made it so cozy.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: '3',
    name: 'Urban Boutique Hotel',
    description: 'Stylish boutique hotel in the heart of downtown. Modern design meets comfort with rooftop bar and city skyline views.',
    price: 249,
    location: 'New York, NY',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.4,
    amenities: ['WiFi', 'Rooftop Bar', 'Gym', 'Business Center', 'Concierge'],
    reviews: [
      {
        id: '4',
        userId: '4',
        userName: 'David Wilson',
        rating: 4,
        comment: 'Great location in the city center. The rooftop bar has amazing views!',
        date: '2024-01-12'
      },
      {
        id: '5',
        userId: '5',
        userName: 'Lisa Brown',
        rating: 5,
        comment: 'Loved the modern design and the staff was incredibly helpful.',
        date: '2024-01-08'
      }
    ]
  },
  {
    id: '4',
    name: 'Historic Grand Hotel',
    description: 'Step back in time at this beautifully restored historic hotel. Classic elegance with modern amenities in a prime location.',
    price: 329,
    location: 'Charleston, SC',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.7,
    amenities: ['WiFi', 'Historic Tours', 'Fine Dining', 'Valet Parking', 'Spa'],
    reviews: [
      {
        id: '6',
        userId: '6',
        userName: 'Robert Taylor',
        rating: 5,
        comment: 'Beautiful historic charm with excellent service. The dining was exceptional.',
        date: '2024-01-18'
      }
    ]
  },
  {
    id: '5',
    name: 'Desert Oasis Resort',
    description: 'Luxurious desert resort offering tranquility and stunning sunset views. Features world-class spa and golf course.',
    price: 399,
    location: 'Scottsdale, AZ',
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    amenities: ['WiFi', 'Golf Course', 'Spa', 'Multiple Pools', 'Desert Tours', 'Fine Dining'],
    reviews: [
      {
        id: '7',
        userId: '7',
        userName: 'Jennifer Martinez',
        rating: 5,
        comment: 'Absolutely stunning resort! The spa treatments were incredible and the sunset views are unforgettable.',
        date: '2024-01-22'
      },
      {
        id: '8',
        userId: '8',
        userName: 'Thomas Anderson',
        rating: 5,
        comment: 'Perfect golf getaway. The course is challenging and the amenities are top-notch.',
        date: '2024-01-14'
      }
    ]
  },
  {
    id: '6',
    name: 'Lakeside Cabin Retreat',
    description: 'Peaceful lakeside cabins perfect for a quiet getaway. Enjoy fishing, kayaking, and stunning lake views.',
    price: 159,
    location: 'Lake Tahoe, CA',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    amenities: ['WiFi', 'Lake Access', 'Fishing', 'Kayak Rental', 'Fire Pit', 'Hiking Trails'],
    reviews: [
      {
        id: '9',
        userId: '9',
        userName: 'Amanda White',
        rating: 4,
        comment: 'So peaceful and relaxing. The lake view from our cabin was perfect.',
        date: '2024-01-16'
      }
    ]
  }
];
