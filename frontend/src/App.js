import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import RestaurantListPage from "./pages/RestaurantListPage";  
import RestaurantDetailPage from "./pages/RestaurantDetailPage";  
import LocationSearch from "./pages/LocationSearch";  
import ImageSearch from "./pages/ImageSearch";  

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Corrected routes with 'element' instead of 'component' */}
          <Route path="/" element={<RestaurantListPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/location-search" element={<LocationSearch />} />
          <Route path="/image-search" element={<ImageSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;