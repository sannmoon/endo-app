import "./Home.css";
import placeholder from "../assets/placeholder.svg";

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Endo Diet</h1>
      <p className="subtitle">
        The application helps identify products that are or aren't healthy for
        women suffering from endometriosis
      </p>

      <div className="image-wrapper">
        <div className="image-preview">
          <img className="image" src={placeholder} alt="Image not found" />
        </div>

        <div className="button-container">
          <label className="custom-file-upload">
            <input type="file" className="upload-img" />
            Upload Image
          </label>
          <button className="reset-btn">Reset</button>
        </div>
      </div>
      <div className="process-btn-wrapper">
        <button className="process-btn">Process Image</button>
      </div>
    </div>
  );
};
