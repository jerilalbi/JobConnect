import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import JobSearch from './pages/JobSearch';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute> <JobSearch /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
