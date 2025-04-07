import React from 'react';

const sampleBookmarks = [
  { id: 1, name: 'Fashion Fiesta', location: 'Indore' },
  { id: 2, name: 'Tech Bazaar', location: 'Mumbai' }
];

export default function Bookmarks() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Bookmarked Shops</h2>
      <div className="grid gap-4">
        {sampleBookmarks.map(shop => (
          <div key={shop.id} className="bg-white p-4 rounded-2xl shadow hover:bg-gray-100">
            <h3 className="text-lg font-medium">{shop.name}</h3>
            <p className="text-sm text-gray-500">{shop.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
