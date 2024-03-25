import "./Home.css";
import placeholder from "../assets/placeholder.svg";
import { useState } from "react";
import Axios from "axios";

export const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setGeneratedResults(null);
  };

  const [generatedResult, setGeneratedResults] = useState<string | null>();

  const handleAnalyzeImage = () => {
    Axios.post(`http://localhost:3000/analyze-image`, {
      image: selectedImage,
    }).then((res) => setGeneratedResults(res.data.result));
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
        <button className="process-btn" onClick={handleAnalyzeImage}>
          Process Image
        </button>
      </div>
      {generatedResult && (
        <p
          dangerouslySetInnerHTML={{ __html: generatedResult }}
          className="generated-data"
        ></p>
      )}
    </div>
  );
};
