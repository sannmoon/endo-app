import "./AnalysisList.css";
import { Card } from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContent } from "../../App";

const MAX_LENGTH = 300;

export const AnalysisList = () => {
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const { isLoggedIn } = useContext(AppContent);

  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const fetchData = async () => {
    try {
      const res = await Axios.get(`${import.meta.env.API_URL}/analyses`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setAnalysisResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    //cannot use async/await in useEffect
    fetchData();
  }, []); // need to put [] to stop rendering over and over again

  return (
    <div className="analysis-result-container">
      {analysisResults.length === 0 && (
        <div className="no-data">No analysis found</div>
      )}
      {analysisResults.map((analysisResult, index) => {
        const description = analysisResult.analyzed_results;
        return (
          <Card
            imageUrl={analysisResult.image_url}
            title={`Analysis ${index + 1} (ID: ${analysisResult.id})`}
            description={
              description.length > MAX_LENGTH
                ? `${description.substring(0, MAX_LENGTH)}...`
                : description
            }
            onClick={() => {
              navigate(`/analysis-results/${analysisResult.id}`);
            }}
          />
        );
      })}
    </div>
  );
};
