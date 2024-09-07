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
        `${import.meta.env.VITE_API_URL}/analyze-image`,
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
    <div className="bg-white h-auto w-[600px] rounded-lg p-9 mt-[20%] mb-7">
      <Header
        title="Endo Diet"
        subtitle="The application helps identify products that are or aren't healthy for
        women suffering from endometriosis"
      />

      <div className="mt-[100px] mx-[50px] mb-[50px]">
        <div className="bg-[#eaeaea] w-[500px] h-[500px] rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={selectedImage ?? placeholder}
            alt="Selected Image"
          />
        </div>

        <div className="flex justify-center mt-5 mx-auto">
          <label className="p-4 px-5 border border-[#ccc] rounded-md bg-[#3b83f6] text-white cursor-pointer mr-5 w-full text-[19px] flex justify-center hover:brightness-90">
            <input
              type="file"
              className="hidden"
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
      <div className="flex items-center justify-center">
        <Button
          label={loading ? <> Analyzing.. </> : <>Process Image</>}
          onClick={handleAnalyzeImage}
          color="green"
        />
      </div>
      {generatedResult && (
        <p
          dangerouslySetInnerHTML={{ __html: generatedResult }}
          className="text-[19px] mx-6 pt-5 text-justify whitespace-pre-line"
        ></p>
      )}
    </div>
  );
};
