import React from 'react';

const categories = [
  { name: 'Clothing', icon: <i class="fa-solid fa-shirt"></i> },
  { name: 'Accessories', icon: <i class="fa-solid fa-keyboard"></i> },
  { name: 'Electronics', icon: <i class="fa-solid fa-plug"></i> },
  { name: 'Footwear', icon: <i class="fa-solid fa-shoe-prints"></i> },
  { name: 'Beauty', icon: <i class="fa-solid fa-spray-can-sparkles"></i>},
  { name: 'Home Decor', icon: <i class="fa-solid fa-leaf"></i> },
  { name: 'Toys', icon: <i class="fa-solid fa-gamepad"></i>},
  { name: 'Books', icon: <i class="fa-solid fa-book"></i> },
  { name: 'Groceries', icon: <i class="fa-solid fa-bag-shopping"></i>}
];

export default function Categories() {
  return (
    <div className="body-area">
      <div className="app-container">
        <h2 className="mb-4">Explore Categories</h2>
        <div className="row row-cols-3 g-3">
          {categories.map((category, idx) => (
            <div key={idx} className="col content-cate">
              <div
                className="bg-white text-dark p-3 text-center d-flex flex-column align-items-center justify-content-center"
                style={{ 
                  height: '150px', 
                  borderRadius: '10px', 
                  boxShadow: '0px 4px 20px rgba(0, 102, 255, 0.3)', 
                  cursor: 'pointer' 
                }}
              >
                <div className="mb-2">{category.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{category.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
