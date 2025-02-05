import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await fetch(`http://127.0.0.1:5000/restaurant/${id}`);
      const data = await response.json();
      setRestaurant(data);
    };

    fetchRestaurant();
  }, [id]);

  return restaurant ? (
    <Container>
      <Header>
        <Logo src="/logocravory.png" alt="Cravory Logo" />
        <h1>{restaurant.name}</h1>
      </Header>
      <DetailCard>
        <DetailItem>
          <strong>Address:</strong> {restaurant.address}
        </DetailItem>
        <DetailItem>
          <strong>Cuisine:</strong> {restaurant.cuisines}
        </DetailItem>
        <DetailItem>
          <strong>Average Cost for Two:</strong> ${restaurant.average_cost}
        </DetailItem>
        <DetailItem>
          <strong>Rating:</strong> {restaurant.aggregate_rating}/5
        </DetailItem>
      </DetailCard>
    </Container>
  ) : (
    <LoadingMessage>Loading...</LoadingMessage>
  );
};

// Styled Components for consistency
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: rgb(240, 243, 255);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 3rem;
  color: #ff6347;
  margin-bottom: 30px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const DetailCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const DetailItem = styled.div`
  margin: 10px 0;
  font-size: 1.1rem;
  color: #555;
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #ff6347;
`;

export default RestaurantDetailPage;
