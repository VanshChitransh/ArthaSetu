import React from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom';
import SeedGeneration from './SeedGeneration';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className='bg-gradient'></div>
    <div className="container">
        <main className="main">

          <div className="hero-section">
            <h1 className="main-title">ArthaSetu</h1>
            <h3 className="tagtitle">Your Bridge to Digital Wealth</h3>
            <div className="blockchain-selector">
              <button className="blockchain-btn" onClick={() => {return (navigate(`/seedGeneration`))}}>
                Solana
              </button>
              <button className="blockchain-btn" onClick={() => {return (navigate(`/seedGeneration`))}}>
                Ethereum
              </button>
            </div>
          </div>

        </main>
      </div>
      </>
  )
}

export default Landing