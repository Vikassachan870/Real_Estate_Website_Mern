import { useState, useEffect } from "react";
import style from "./Details.module.css";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [allimage, setAllImage] = useState([]);
  const [currimage, setcurrimage] = useState(null);
  const [newdata, setnewdata] = useState(null);

  useEffect(() => {
    const details = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v2/getoneproperty/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setnewdata(response.data);
        setAllImage(response.data.images);
        setcurrimage(`http://localhost:1000/${response.data.images[0]}`);
      } catch (err) {
        console.error(err);
        alert("Error getting property");
      }
    };

    details();
  }, []);

  const handleImageClick = (src) => {
    setcurrimage(`http://localhost:1000/${src}`);
  };

  if (!newdata) {
    return <div>Loading...</div>;
  }

  return (
    <>
     
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Display image & Selected images */}
        <div className="m-4">
          <div className="h-80 sm:w-[560px] bg-slate-200 mx-8 flex justify-center items-center p- border-solid">
            {currimage && (
              <img
                src={currimage}
                alt="Selected"
                className=" h-80 sm:w-[560px] "
              />
            )}
          </div>
          <div className={`${style.wrapper} flex h-20 sm:w-[560px] mx-8 my-4`}>
            {allimage.map((src, index) => (
              <img
                key={index}
                className="min-h-16 min-w-20 mr-2 cursor-pointer"
                src={`http://localhost:1000/${src}`}
                loading="lazy"
                alt={`image-${index + 1}`}
                onClick={() => handleImageClick(src)}
              />
            ))}
          </div>
        </div>
        {/* Property details */}
        <div className=" bg-zinc-50  m-8 border-solid-black rounded-2xl p-3">
          <h1 className="text-center text-2xl font-bold pb-2">
            Property Details
          </h1>
          <div className=" grid grid-cols-2">
            <div>
              <h2 className="text-slate-700">Dimensions</h2>
              <p className="font-bold">
                Plot area: {newdata.propertyArea}
              </p>
              <p>
                Length x Breadth: {newdata.dimensions}
              </p>
            </div>

            <div className="">
              <h2 className="text-slate-700">Price</h2>
              <p>{newdata.price}</p>
            </div>
          </div>
          <br />

          <div className=" grid grid-cols-2 pb-2">
            <div className="">
              <h2 className="text-slate-700">Address</h2>
              <p>{newdata.location}</p>
            </div>

            <div className="">
              <h2 className="text-slate-700">Facing</h2>
              <p>{newdata.propertyface}</p>
            </div>
          </div>
          <br />
          <div className="grid grid-cols-2">
            <div className="property-section">
              <h2 className="text-slate-700">Type of Ownership</h2>
              <p>{newdata.typeofownership}</p>
            </div>

            <div className="property-section">
              <h2 className="text-slate-700">Construction Status</h2>
              <p>{newdata.constructionstatus}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 pt-3">
            <div className="property-section">
              <h2 className="text-slate-700">Road Width</h2>
              <p>{newdata.roadwidth}</p>
            </div>

            <div className="property-section">
              <h2 className="text-slate-700">Booking Amount</h2>
              <p>{newdata.bookingamount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 mb-4">
        <div className="pt-2 ml-12 ">
          <h2 className="text-2xl font-bold">Property Description</h2>
          <p className="mt-4 text-muted-foreground">
            {newdata.detaileddescrip}
          </p>
        </div>
        <iframe
          className="w-[400px] h-[300px] sm:h-[350px] sm:w-[600px] sm:pl-8  rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d223.26979765152907!2d80.33813116751219!3d26.44551655547262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721411350652!5m2!1sen!2sin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Details;
