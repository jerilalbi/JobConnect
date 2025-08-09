import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
