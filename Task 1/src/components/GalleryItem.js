import React from 'react';
import './Gallery.css'; // Ensure this path is correct

const GalleryItem = ({ src, alt }) => (
  <img src={src} alt={alt} className="gallery-item" />
);

export default GalleryItem;
