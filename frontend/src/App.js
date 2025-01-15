import React from "react";
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import Login from "./pages/Login";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
