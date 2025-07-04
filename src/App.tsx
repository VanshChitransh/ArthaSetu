import { useState } from 'react'
import './styles/style.css'
import Headers from './pages/Headers'
import Footers from './pages/Footers';
import Landing from './pages/Landing';
import SeedGeneration from './pages/SeedGeneration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletGeneration from './pages/WalletGeneration';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <>
    <Router>
      <div className="container">
        <Headers toggleTheme={toggleTheme}/>
        {/* <Landing/> */}
        {/* <WalletGeneration/> */}
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/seedGeneration' element={<SeedGeneration/>}/>
          <Route path='/walletGeneration' element={<WalletGeneration/>}/>
        </Routes>
        <Footers/>
      </div>
      </Router>
    </>
  )
}

export default App