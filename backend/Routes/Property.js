const express = require("express");
const router = express.Router();
const Property = require("../Modals/Property");
const { authenticateToken } = require("../Routes/userauth");
const multerimgupload = require("../Controller/Multerconfig");

//add the new property
router.post(
  "/addproperty",
  multerimgupload.array("propertyimg"),
  authenticateToken,
  async (req, res) => {
    try {
      const {
        name,
        propertytype,
        location,
        propertyArea,
        nearbylocations,
        dimensions,
        constructionstatus,
        roadwidth,
        propertyface,
        price,
        negotiable,
        typeofownership,
        bookingamount,
        noofbathroom,
        noofbedroom,
        detaileddescrip,
      } = req.body;

      const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/")); // Ensure paths are using forward slashes

      const newProperty = new Property({
        name,
        propertytype,
        location,
        propertyArea,
        nearbylocations,
        dimensions,
        constructionstatus,
        roadwidth,
        propertyface,
        price,
        negotiable,
        typeofownership,
        bookingamount,
        noofbathroom,
        noofbedroom,
        detaileddescrip,
        images: imagePaths, // Add the images field to store file paths
      });

      await newProperty.save();
      return res.status(200).json({ message: "Property Added Successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

//fetch all the properties
router.get("/allproperties", authenticateToken, async (req, res) => {
  try {
    const allproperties = await Property.find();
    res.status(200).json(allproperties);
  } catch (err) {
    console.error("Error occurred during fetching Properties:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//delete the property
router.delete("/deleteproperty/:id", authenticateToken, async (req, res) => {
  try {
    const ID = req.params.id;
    const deleteproperty = await Property.findByIdAndDelete(ID);

    if (!deleteproperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//find the property by id
router.get("/getoneproperty/:id", authenticateToken, async (req, res) => {
  try {
    const existingProperty = await Property.findById(req.params.id);
    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found." });
    }
    res.status(200).json(existingProperty);
   } catch (err) {
      console.error("Error occurred during fetching Properties:", err);
      res.status(500).json({ message: "Internal server error." });
    }
});

//update the property
router.put(
  "/updateproperty/:id",
  authenticateToken,
  multerimgupload.array("propertyimg"),
  async (req, res) => {
    try {
      const existingProperty = await Property.findById(req.params.id);
      if (!existingProperty) {
        return res.status(404).json({ message: "Property not found." });
      }
      existingProperty.name = req.body.name;
      existingProperty.propertytype = req.body.propertytype;
      existingProperty.location = req.body.location;
      existingProperty.propertyArea = req.body.propertyArea;
      existingProperty.nearbylocations = req.body.nearbylocations;
      existingProperty.dimensions = req.body.dimensions;
      existingProperty.constructionstatus = req.body.constructionstatus;
      existingProperty.roadwidth = req.body.roadwidth;
      existingProperty.propertyface = req.body.propertyface;
      existingProperty.price = req.body.price;
      existingProperty.negotiable = req.body.negotiable;
      existingProperty.typeofownership = req.body.typeofownership;
      existingProperty.bookingamount = req.body.bookingamount;
      existingProperty.noofbathroom = req.body.noofbathroom;
      existingProperty.noofbedroom = req.body.noofbedroom;
      existingProperty.detaileddescrip = req.body.detaileddescrip;

      // Handle file uploads
      if (req.files && req.files.length > 0) {
        const propertyImages = req.files.map((file) => file.path);
        existingProperty.propertyimg = propertyImages;
      }

      await existingProperty.save();
      return res.status(200).json({ message: "Update successful." });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

//properties for display 
router.get("/displayallproperty", async (req, res) => {
  try {
    // Fetch all properties, selecting only the necessary fields
    const properties = await Property.find({}, {
      name: 1,
      price: 1,
      location: 1,
      images: { $slice: 1 },
    });

    // Map the fetched properties to the desired format
    const propertyInfoList = properties.map(property => ({
      _id:property._id,
      name: property.name,
      price: property.price,
      location: property.location,
      image: property.images[0] || null, // Handle case where images might be empty
    }));

    return res.status(200).json(propertyInfoList);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//latest properties

router.get("/latestproperty", async (req, res) => {
  try {
    const properties = await Property.find({}, {
      name: 1,
      price: 1,
      location: 1,
      images: { $slice: 1 }, 
    })
      .sort({ createdAt: -1 }) 
      .limit(10); 

   
    const propertyInfoList = properties.map(property => ({
      _id:property._id,
      name: property.name,
      price: property.price,
      location: property.location,
      image: property.images[0] || null, // Handle case where images might be empty
    }));

    return res.status(200).json(propertyInfoList);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//featured properties
router.get("/featuredproperty", async (req, res) => {
  try {
    const properties = await Property.find({}, {
      name: 1,
      price: 1,
      location: 1,
      images: { $slice: 1 }, 
    })
      .sort({ price:-1 }) 
      .limit(10); 

   
    const propertyInfoList = properties.map(property => ({
      _id:property._id,
      name: property.name,
      price: property.price,
      location: property.location,
      image: property.images[0] || null, // Handle case where images might be empty
    }));

    return res.status(200).json(propertyInfoList);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;
