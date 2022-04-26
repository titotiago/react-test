import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FakerApi from './api/FakeApiJs/fakerApi';

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  const auth = window.localStorage.auth;
  return (
    <ChakraProvider>
      <Router>
        {auth ? 
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes> :
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        }
      </Router>
    </ChakraProvider>
  );
}

export default App;
