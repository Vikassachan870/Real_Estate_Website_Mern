import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    propertytype: "",
    location: "",
    propertyArea: "",
    nearbylocations: "",
    dimensions: "",
    constructionstatus: "",
    roadwidth: "",
    propertyface: "",
    price: "",
    negotiable: false,
    typeofownership: "",
    bookingamount: "",
    noofbathroom: "",
    noofbedroom: "",
    detaileddescrip: "",
    propertyimg: [], // Correct key name
  });

  const handleRemoveImage = (index) => {
    setFormData((prevState) => {
      const newImages = [...prevState.propertyimg];
      newImages.splice(index, 1);
      return {
        ...prevState,
        propertyimg: newImages,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: Array.from(files), // Convert FileList to array
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "propertyimg") {
        for (let i = 0; i < formData.propertyimg.length; i++) {
          data.append("propertyimg", formData.propertyimg[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    }
    const token = Cookies.get("token");

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v2/addproperty",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Error uploading property");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="propertytype"
        placeholder="Property Type"
        value={formData.propertytype}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="propertyArea"
        placeholder="Property Area"
        value={formData.propertyArea}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="nearbylocations"
        placeholder="Nearby Locations (comma separated)"
        value={formData.nearbylocations}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="dimensions"
        placeholder="Dimensions"
        value={formData.dimensions}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="constructionstatus"
        placeholder="Construction Status"
        value={formData.constructionstatus}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="roadwidth"
        placeholder="Road Width"
        value={formData.roadwidth}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="text"
        name="propertyface"
        placeholder="Property Face"
        value={formData.propertyface}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="negotiable"
          checked={formData.negotiable}
          onChange={handleChange}
          className="mr-2"
        />
        Negotiable
      </label>
      <input
        type="text"
        name="typeofownership"
        placeholder="Type of Ownership"
        value={formData.typeofownership}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        name="bookingamount"
        placeholder="Booking Amount"
        value={formData.bookingamount}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        name="noofbathroom"
        placeholder="Number of Bathrooms"
        value={formData.noofbathroom}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="number"
        name="noofbedroom"
        placeholder="Number of Bedrooms"
        value={formData.noofbedroom}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        name="detaileddescrip"
        placeholder="Detailed Description"
        value={formData.detaileddescrip}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      ></textarea>
      {formData.propertyimg.length > 0 && (
        <div className="w-96 h-auto grid grid-cols-3 gap-8 ">
          {formData.propertyimg.map((element, index) => (
            <div key={index} className="relative h-20 w-32">
              <img
                src={URL.createObjectURL(element)}
                alt={`property-${index}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        name="propertyimg"
        multiple
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
