import { useParams } from "react-router-dom";
import "./AnalysisDetails.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "../../components/Card/Card";
import placeholder from "../../assets/placeholder.svg";

export const AnalysisDetails = () => {
  const { id } = useParams();
  const [analysisDetails, setAnalysisDetails] = useState<any>();

  const fetchDetails = async () => {
    try {
      const res = await Axios.get(
        `${import.meta.env.VITE_API_URL}/analysis/${id}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAnalysisDetails(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="analysis-details-container">
      <Card
        imageUrl={analysisDetails?.image_url || placeholder}
        title={analysisDetails ? `Analysis Details` : "Analysis not found"}
        description={
          analysisDetails?.analyzed_results || "Please check your request"
        }
      />
    </div>
  );
};
