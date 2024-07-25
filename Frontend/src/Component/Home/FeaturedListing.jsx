import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const FeaturedListing = () => {

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const navigate = useNavigate();
  useEffect(() => {
   
    const fetchProperties = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch("http://localhost:1000/api/v2/featuredproperty", {
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
  }, []); // Empty dependency array to run only once on mount

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
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 ">
        <h2 className="text-3xl font-bold mb-8">Featured Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <div key={index} className="w-80">
              <img
                src={`http://localhost:1000/${property.image}` }// Use placeholder if image is null
                width={400}
                height={250}
                loading="lazy"
                alt={property.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{property.name}</h3>
                <p className="mb-4">{property.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">₹{property.price.toLocaleString()}</div>
                  <button className="bg-black text-white p-3 rounded-lg" onClick={() => handleViewDetails(property._id)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedListing;
