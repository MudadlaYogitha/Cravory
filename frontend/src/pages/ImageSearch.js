import React, { useState } from 'react';
import styled from 'styled-components';

const ImageSearch = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));  // Display uploaded image
    }
  };

  const handleSearch = () => {
    // Add logic to send image data to Flask API for processing
    console.log('Searching for restaurants with image:', image);
  };

  return (
    <Container>
      <Header>Image Search</Header>
      <UploadInput 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      {image && <ImagePreview src={image} alt="Uploaded" />}
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </Container>
  );
};

// Styled components for CSS-in-JS
const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Header = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const UploadInput = styled.input`
  padding: 10px;
  margin: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ImagePreview = styled.img`
  margin-top: 20px;
  max-width: 100%;
  max-height: 400px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #187bcd;
  }
`;

export default ImageSearch;