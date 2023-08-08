import React, { useState } from 'react';
import './App.css';
import './Gallery.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleSearch = (folder) => {
    setShowGallery(true);
    setFolderName(folder);
  };

  const imagesByFolder = {
    animals: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
    food: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
    models: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'],
  };


  const getImageUrls = (folder) => {
    return imagesByFolder[folder].map(image => `/${folder}/${image}`);
  };

  const filteredImages = folderName
    ? getImageUrls(folderName)
    : [];

  const openLightbox = index => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleBackToHome = () => {
    setShowGallery(false);
    setFolderName('');
  };

  let heading = 'Image Gallery';
  if (folderName) {
    heading = folderName.charAt(0).toUpperCase() + folderName.slice(1);
  }

  return (
    <div className="App">
      <h1>{heading}</h1>
      {!showGallery ? (
        <div className="home-content">
          <p>Welcome to our Image Gallery App!</p>
          <p>Discover a stunning collection of images.</p>
          <div className="button-container">
            <button onClick={() => handleSearch('animals')}>Explore Animals</button>
            <button onClick={() => handleSearch('food')}>Explore Food</button>
            <button onClick={() => handleSearch('models')}>Explore Models</button>
          </div>
        </div>
      ) : (
        <div>
          <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
          <div className="image-grid">
            {filteredImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
          {lightboxOpen && (
            <Lightbox
              mainSrc={filteredImages[lightboxIndex]}
              nextSrc={filteredImages[(lightboxIndex + 1) % filteredImages.length]}
              prevSrc={filteredImages[(lightboxIndex + filteredImages.length - 1) % filteredImages.length]}
              onCloseRequest={() => setLightboxOpen(false)}
              onMovePrevRequest={() => setLightboxIndex((lightboxIndex + filteredImages.length - 1) % filteredImages.length)}
              onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
