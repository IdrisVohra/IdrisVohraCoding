import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/product.js'; // Assuming you have a Products component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;