import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UpdatePropertyForm = ({ initialData, propertyId }) => {
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
    propertyimg: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPreviewImages(initialData.propertyimg);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
      setPreviewImages(Array.from(files).map(file => URL.createObjectURL(file)));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevState) => {
      const newImages = [...prevState.propertyimg];
      newImages.splice(index, 1);
      return {
        ...prevState,
        propertyimg: newImages,
      };
    });
    setPreviewImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
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
      const response = await axios.put(
        `http://localhost:1000/api/v2/updateproperty/${propertyId}`,
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
      alert("Error updating property");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
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
      {previewImages.length > 0 && (
        <div className="w-96 h-auto grid grid-cols-5 gap-2 mb-4">
          {previewImages.map((element, index) => (
            <div key={index} className="relative h-20 w-20 m-2">
              <img
                src={element}
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
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Update
      </button>
    </form>
  );
};

export default UpdatePropertyForm;
