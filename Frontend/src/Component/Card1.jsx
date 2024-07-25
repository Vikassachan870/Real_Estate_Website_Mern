import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Card1 = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const navigate = useNavigate();
  useEffect(() => {
   
    const fetchProperties = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch("http://localhost:1000/api/v2/displayallproperty", {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data); 
        setLoading(false);
      } catch (err) {
        setError(err.message); // Set error message
        setLoading(false); // Ensure loading is set to false even in case of error
      }
    };

    fetchProperties();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }
  const handleViewDetails = (id) => {
    navigate(`/details/${id}`); // Navigate to the property details page with ID as a parameter
  };
  return (
    <>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 m-2 pl-10 w-full">
      {properties.map((property, index) => (
            <div key={index} className="w-60 sm:w-80 h-auto">
              <img
                src={`http://localhost:1000/${property.image}` }// Use placeholder if image is null
                width={288}
                height={200}
                loading="lazy"
                alt={property.name}
                className="w-full object-cover rounded-t-lg"
              />
              <button><img src="/images/heart.jpg" alt="" /></button>
              <div className="p-4">
                <h3 className="md:text-xl text-base font-bold mb-2">{property.name}</h3>
                <p className="mb-4 sm:text-xs">{property.location}</p>
                <div className="flex items-center justify-between">
                  <div className=" text-base sm:text-2xl font-bold">₹{property.price.toLocaleString()}</div>
                  <button className="bg-black text-white p-2 rounded-lg" onClick={() => handleViewDetails(property._id)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Card1;
