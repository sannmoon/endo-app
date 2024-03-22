import "./Home.css";
import placeholder from "../assets/placeholder.svg";
import { useState } from "react";

export const Home = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const handleImageChange = (e: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log("called: ", reader);
      setSelectedImage(reader.result);
    };
  };

  const handleResetImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="home-container">
      <h1 className="title">Endo Diet</h1>
      <p className="subtitle">
        The application helps identify products that are or aren't healthy for
        women suffering from endometriosis
      </p>

      <div className="image-wrapper">
        <div className="image-preview">
          <img
            className="image"
            src={selectedImage ?? placeholder}
            alt="Selected Image"
          />
        </div>

        <div className="button-container">
          <label className="custom-file-upload">
            <input
              type="file"
              className="upload-img"
              onChange={handleImageChange}
            />
            Upload Image
          </label>
          <button className="reset-btn" onClick={handleResetImage}>
            Reset
          </button>
        </div>
      </div>
      <div className="process-btn-wrapper">
        <button className="process-btn">Process Image</button>
      </div>
    </div>
  );
};
