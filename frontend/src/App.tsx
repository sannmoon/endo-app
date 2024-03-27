import "./App.css";
import { Home } from "./pages/Home";
import { Form } from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
