import React, { useState } from "react";

const FilterTab = () => {
  const [value, setValue] = useState(1000);
  const [size, setSize] = useState(10);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedOwnershipType, setSelectedOwnershipType] = useState("");
  const [selectedFacingDirection, setSelectedFacingDirection] = useState("");
  const [selectedWidthOfRoad, setSelectedWidthOfRoad] = useState("");

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    document.getElementById("rangevalue").innerHTML = newValue;
  };

  const handleSizeSliderChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    document.getElementById("sizevalue").innerHTML = newSize;
  };

  const propertyTypes = [
    "Residential Apartment",
    "Residential Land",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "Farm House",
    "1 RK/ Studio Apartment",
  ];

  const ownershipTypes = [
    "FreeHold",
    "Co-operative Society",
    "Power of Attorney",
    "LeaseHold",
  ];

  const facingDirections = [
    "East",
    "West",
    "North",
    "South",
    "South-East",
    "South-West",
    "North-East",
    "North-West",
  ];

  const widthOfRoadOptions = ["10ft", "10-20 ft", "20-30 ft", "30-50 ft", "50+ ft"];

  const handlePropertySelect = (type) => {
    setSelectedPropertyType(type);
  };

  const handleOwnershipSelect = (type) => {
    setSelectedOwnershipType(type);
  };

  const handleFacingDirectionSelect = (type) => {
    setSelectedFacingDirection(type);
  };

  const handleWidthOfRoadSelect = (type) => {
    setSelectedWidthOfRoad(type);
  };

  const handleClearPropertyType = () => {
    setSelectedPropertyType("");
  };

  const handleClearOwnershipType = () => {
    setSelectedOwnershipType("");
  };

  const handleClearFacingDirection = () => {
    setSelectedFacingDirection("");
  };

  const handleClearWidthOfRoad = () => {
    setSelectedWidthOfRoad("");
  };

  return (
    <div className="w-fit bg-white h-screen justify-center items-center px-4 pb-14 overflow-y-auto">
      <h1 className="font-bold text-center text-sm ">Apply Filters</h1>
      <br />

      {/* Price slider */}
      <div className="mb-4">
        <label htmlFor="customRange2" className="form-label text-xs">
          Select Budget
        </label>
        <input
          type="range"
          className="form-range w-11/12 border-neutral-800 bg-white"
          min="1000"
          max="100000"
          id="customRange2"
          value={value}
          onChange={handleSliderChange}
        />
        <span id="rangevalue" className="text-xs">{value}</span>
      </div>

      {/* Size slider */}
      <div>
        <label htmlFor="customSizeRange" className="form-label text-xs">
          Select Size
        </label>
        <input
          type="range"
          className="form-range w-11/12 border-neutral-800 bg-white"
          min="10"
          max="1000"
          id="customSizeRange"
          value={size}
          onChange={handleSizeSliderChange}
        />
        <span id="sizevalue" className="text-xs">{size}</span>
      </div>

      {/* Property type selector */}
      <div className="">
        <h2 className="font-bold mb-1 text-sm">Type of property</h2>
        <div
          className="text-blue-600 cursor-pointer mb-4 text-xs"
          onClick={handleClearPropertyType}
        >
          Clear
        </div>
        {propertyTypes.map((type) => (
          <div
            key={type}
            className={`flex items-center p-2 border rounded-full cursor-pointer mb-2 ${
              selectedPropertyType === type
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            onClick={() => handlePropertySelect(type)}
          >
            <span className={`text-xs ${selectedPropertyType === type ? "light-blue" : ""}`}>
              {selectedPropertyType === type ? "✓" : "+"}
            </span>
            <span className="ml-2 text-xs">{type}</span>
          </div>
        ))}
      </div>

      {/* Ownership type selector */}
      <div className="">
        <h2 className="font-bold mb-1 text-sm">Type of Ownership</h2>
        <div
          className="text-blue-600 cursor-pointer mb-4 text-xs"
          onClick={handleClearOwnershipType}
        >
          Clear
        </div>
        {ownershipTypes.map((type) => (
          <div
            key={type}
            className={`flex items-center p-2 border rounded-full cursor-pointer mb-2 ${
              selectedOwnershipType === type
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            onClick={() => handleOwnershipSelect(type)}
          >
            <span className={`text-xs ${selectedOwnershipType === type ? "light-blue" : ""}`}>
              {selectedOwnershipType === type ? "✓" : "+"}
            </span>
            <span className="ml-2 text-xs">{type}</span>
          </div>
        ))}
      </div>

      {/* Facing direction selector */}
      <div className="">
        <h2 className="font-bold mb-1 text-sm">Facing Direction</h2>
        <div
          className="text-blue-600 cursor-pointer mb-4 text-xs"
          onClick={handleClearFacingDirection}
        >
          Clear
        </div>
        {facingDirections.map((type) => (
          <div
            key={type}
            className={`flex items-center p-2 border rounded-full cursor-pointer mb-2 ${
              selectedFacingDirection === type
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            onClick={() => handleFacingDirectionSelect(type)}
          >
            <span className={`text-xs ${selectedFacingDirection === type ? "light-blue" : ""}`}>
              {selectedFacingDirection === type ? "✓" : "+"}
            </span>
            <span className="ml-2 text-xs">{type}</span>
          </div>
        ))}
      </div>

      {/* Width of facing road selector */}
      <div className="">
        <h2 className="font-bold mb-1 text-sm">Width of Facing Road</h2>
        <div
          className="text-blue-600 cursor-pointer mb-4 text-xs"
          onClick={handleClearWidthOfRoad}
        >
          Clear
        </div>
        {widthOfRoadOptions.map((type) => (
          <div
            key={type}
            className={`flex items-center p-2 border rounded-full cursor-pointer mb-2 ${
              selectedWidthOfRoad === type
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300"
            }`}
            onClick={() => handleWidthOfRoadSelect(type)}
          >
            <span className={`text-xs ${selectedWidthOfRoad === type ? "light-blue" : ""}`}>
              {selectedWidthOfRoad === type ? "✓" : "+"}
            </span>
            <span className="ml-2 text-xs">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTab;
