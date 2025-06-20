import { useState } from 'react'
import './styles/style.css'
import Headers from './pages/Headers'
import Footers from './pages/Footers';
import Landing from './pages/landing';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <>
      <div className="container">
        <Headers toggleTheme={toggleTheme}/>
        <Landing/>
        <Footers/>
      </div>
    </>
  )
}

export default App