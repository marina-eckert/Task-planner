import Sign_in from "./pages/Sign_in";
import Sign_up from "./pages/Sign_up";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Sign_in />} />
        <Route path="/sign_up" element={<Sign_up />} />
      </Routes>
    </Router>
  );
}

export default App;
