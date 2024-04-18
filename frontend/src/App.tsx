import "./App.css";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { AnalysisList } from "./pages/AnalysisList/AnalysisList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { useState, createContext, useEffect } from "react";
import { AnalysisDetails } from "./pages/AnalysisDetails/AnalysisDetails";

export const AppContent = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AppContent.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/analysis-results" element={<AnalysisList />} />
          <Route path="/analysis-results/:id" element={<AnalysisDetails />} />
        </Routes>
      </Router>
    </AppContent.Provider>
  );
}

export default App;
