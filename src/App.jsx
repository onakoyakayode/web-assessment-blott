import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
