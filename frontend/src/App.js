import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import JobSearch from './pages/JobSearch';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<JobSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
