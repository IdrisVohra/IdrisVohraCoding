import "../src/dist/styles.css";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
// import Models from "./Pages/Models";
import Team from "./Pages/Team";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="team" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;
