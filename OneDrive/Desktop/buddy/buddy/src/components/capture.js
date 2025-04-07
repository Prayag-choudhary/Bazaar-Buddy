import React, { useState } from 'react';

function Capture() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrediction = () => {
    // Simulate prediction
    setPrediction('Shirt - Blue');
  };

  return (
    <div className="body-area">
      <div className="app-container">
        <div className="row g-4">

          {/* Image Upload Block */}
          <div className="col-12">
            <div style={{
              boxShadow: '0px 4px 20px rgba(0, 102, 255, 0.4)',
              borderRadius: '20px',
              padding: '1.5rem',
              backgroundColor: 'white',
              color: '#213555',
              textAlign: 'center'
            }}>
              <h5>Upload an Image</h5>
              <input type="file" accept="image/*" className="form-control mb-3" onChange={handleImageChange} />
              {image && <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: '12px' }} />}
            </div>
          </div>

          {/* Prediction Block */}
          <div className="col-12">
            <div style={{
              boxShadow: '0px 4px 20px rgba(0, 102, 255, 0.4)',
              borderRadius: '20px',
              padding: '1.5rem',
              backgroundColor: 'white',
              color: '#213555',
              textAlign: 'center'
            }}>
              <h5>Prediction Result</h5>
              <button className="btn btn-custom" onClick={handlePrediction}>Predict</button>
              {prediction && <p className="mt-3">{prediction}</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Capture;

