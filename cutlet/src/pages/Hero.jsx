import React, { useEffect, useState, useContext } from "react";
import myContext from "../context/contextGlobals";

export const Hero = () => {
  const [imageData, setImageData] = useState([]);
  const {globalData,setGlobalData} = useContext(myContext)
  console.log(globalData)
  useEffect(() => {
    const fetchImages = async () => {
      const name = "profile.jpg";
      const response = await fetch(`http://localhost:200/api/hero?email=${name}`);
        // console.log(response)
      if (response.status === 200) {
        const data = await response.json(); // Assuming the response is JSON
        console.log(data[0].data)
        setImageData(data); // Assuming data.images is an array of image URLs
      } else if (response.status === 404) {
        console.log("Images not found: 404");
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-10 bg-primary">
      <h1>Image App</h1>
      {imageData && imageData.map((image, index) => (
        <img className="w-1/2" key={index} src={`data:${image.contentType};base64,${image.data}`} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};
