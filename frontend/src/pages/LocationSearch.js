import React, { useState } from 'react';
import styled from 'styled-components';

const LocationSearch = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [result, setResult] = useState('');

  const searchRestaurants = () => {
    // Simulate an API call for location search
    setResult(`Searching for restaurants within 3km of latitude: ${latitude}, longitude: ${longitude}`);


  return (
    <Container>
      <h3>Search Restaurants by Location</h3>
      <Input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        placeholder="Enter Latitude"
      />
      <Input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        placeholder="Enter Longitude"
      />
      <Button onClick={searchRestaurants}>Search</Button>
      {result && <Result>{result}</Result>}
    </Container>
  );
};

// Styled components for CSS-in-JS
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
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

const Result = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #2c3e50;
`;
}

export default LocationSearch;