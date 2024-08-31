import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap';
import GalleryItem from './GalleryItem';
import './Gallery.css'; // Additional CSS for custom styles and animations

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([
    { id: 1, category: 'nature', src: '/nature1.jpeg', alt: 'Nature 1' },
    { id: 2, category: 'city', src: '/city1.jpeg', alt: 'City 1' },
    { id: 3, category: 'nature', src: '/nature3.jpeg', alt: 'Nature 3' },
    { id: 4, category: 'nature', src: '/nature2.jpeg', alt: 'Nature 2' },
    { id: 5, category: 'city', src: '/city2.jpeg', alt: 'City 2' },
    { id: 6, category: 'city', src: '/city3.jpeg', alt: 'City 3' },
  ]);

  // Load images from localStorage once when the component mounts
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('galleryItems')) || [];
    if (savedItems.length > 0) {
      setItems((prevItems) => {
        const existingIds = new Set(prevItems.map(item => item.id));
        const newItems = savedItems.filter(item => !existingIds.has(item.id));
        return [...prevItems, ...newItems];
      });
    }
  }, []);

  // Save personal images to localStorage whenever items change
  useEffect(() => {
    const personalItems = items.filter(item => item.category === 'personal');
    localStorage.setItem('galleryItems', JSON.stringify(personalItems));
  }, [items]);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newItem = {
        id: Date.now(), // Use timestamp as ID to ensure uniqueness
        category: 'personal',
        src: URL.createObjectURL(file),
        alt: file.name
      };
      setItems(prevItems => [...prevItems, newItem]);
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem('galleryItems');
    setItems(items.filter(item => item.category !== 'personal')); // Clear only personal images from state
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.alt.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="gallery-container">
      <Row className="mb-4">
        <Col>
          <ButtonGroup>
            <Button variant="secondary" onClick={() => handleFilterChange('all')}>All</Button>
            <Button variant="secondary" onClick={() => handleFilterChange('nature')}>Nature</Button>
            <Button variant="secondary" onClick={() => handleFilterChange('city')}>City</Button>
            <Button variant="secondary" onClick={() => handleFilterChange('animals')}>Animals</Button>
            <Button variant="secondary" onClick={() => handleFilterChange('personal')}>Personal</Button>
          </ButtonGroup>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search images..."
            onChange={handleSearchChange}
          />
        </Col>
        <Col>
          {/* Hidden file input and custom upload button */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="btn btn-primary">
              Upload Photo
              <Form.Control
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </Form.Label>
          </Form.Group>
        </Col>
        <Col>
          <Button variant="danger" onClick={handleClearStorage}>
            Clear Personal Images
          </Button>
        </Col>
      </Row>
      <Row className="gallery">
        {filteredItems.map(item => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <GalleryItem src={item.src} alt={item.alt} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
