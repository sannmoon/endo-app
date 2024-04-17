import "./App.css";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { AnalysisResults } from "./pages/OverviewResults/AnalysisResults";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { useState, createContext } from "react";

export const AppContent = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <AppContent.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/analysis-results" element={<AnalysisResults />} />
        </Routes>
      </Router>
    </AppContent.Provider>
  );
}

export default App;
