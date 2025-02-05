import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  const [averageSpend, setAverageSpend] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/restaurants');
      const data = await response.json();
      if (Array.isArray(data) && JSON.stringify(data) !== JSON.stringify(restaurants)) {
        setRestaurants(data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
  

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (averageSpend) params.append('average_spend', averageSpend);
      if (cuisine) params.append('cuisine', cuisine);
      if (searchQuery) params.append('search_query', searchQuery);
      if (latitude) params.append('latitude', latitude);
      if (longitude) params.append('longitude', longitude);
      
      const response = await fetch(`http://127.0.0.1:5000/search-restaurants?${params.toString()}`);
      const data = await response.json();
      if (Array.isArray(data)) setRestaurants(data);
    } catch (error) {
      console.error("Error searching restaurants:", error);
    }
  };

  return (
    <Container>
      <Header>
        <Logo src="/logocravory.png" alt="Cravory Logo" />
        Cravory
      </Header>
      <SearchBar>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
        />
        <SearchIcon onClick={handleSearch} />
      </SearchBar>

      <Filters>
        <FilterInput
          type="text"
          value={averageSpend}
          onChange={(e) => setAverageSpend(e.target.value)}
          placeholder="Average Spend for Two"
        />
        <FilterInput
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Filter by Cuisine"
        />
        <FilterInput
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter Latitude"
        />
        <FilterInput
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter Longitude"
        />
        <ApplyButton onClick={handleSearch}>Apply Filters</ApplyButton>
      </Filters>

      <RestaurantGrid>
        {restaurants.length === 0 && <p>No results found.</p>}
        {restaurants.map((restaurant) => (
          <Card key={restaurant.restaurant_id}>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisines} | ${restaurant.average_cost} for two</p>
            <a href={`/restaurant/${restaurant.restaurant_id}`} className="link">View Details</a>
          </Card>
        ))}
      </RestaurantGrid>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;
  background-color:rgb(240, 243, 255);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #ff6347;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 15px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ff6347;
  border-radius: 25px;
  padding: 8px 15px;
  width: 350px;
  margin: auto;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 10px;
  font-size: 16px;
`;

const SearchIcon = styled(FaSearch)`
  color: #ff6347;
  cursor: pointer;
  font-size: 20px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const FilterInput = styled.input`
  padding: 10px;
  width: 220px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ApplyButton = styled.button`
  padding: 10px 15px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e5533d;
  }
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
  h3 {
    font-size: 1.3rem;
    color: #333;
  }
  p {
    color: #777;
    margin-bottom: 10px;
  }
  .link {
    color: #ff6347;
    font-weight: bold;
    text-decoration: none;
  }
  .link:hover {
    text-decoration: underline;
  }
`;

export default RestaurantListPage;
