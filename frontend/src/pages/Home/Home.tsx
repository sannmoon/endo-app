import "./Home.css";
import placeholder from "../../assets/placeholder.svg";
import { useContext, useState } from "react";
import Axios from "axios";
import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { Navigate } from "react-router-dom";
import { AppContent } from "../../App";

export const Home = () => {
  const { isLoggedIn } = useContext(AppContent);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setSelectedImage(reader.result as string);
      e.target.value = "";
    };
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setGeneratedResults(null);
  };

  const [generatedResult, setGeneratedResults] = useState<string | null>();

  const [loading, setLoading] = useState(false);

  const handleAnalyzeImage = async () => {
    setLoading(true);

    try {
      const res = await Axios.post(
        `http://localhost:3000/analyze-image`,
        {
          image: selectedImage,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setGeneratedResults(res.data.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <Header
        title="Endo Diet"
        subtitle="The application helps identify products that are or aren't healthy for
        women suffering from endometriosis"
      />

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
          <Button
            label="Reset"
            onClick={handleResetImage}
            variation="outlined"
          />
        </div>
      </div>
      <div className="process-btn-wrapper">
        <Button
          label={loading ? <> Analyzing.. </> : <>Process Image</>}
          onClick={handleAnalyzeImage}
          color="green"
        />
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
