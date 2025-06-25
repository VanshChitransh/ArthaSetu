import React, { useState } from 'react'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom';
import SeedGeneration from './SeedGeneration';

const Landing = () => {
  const navigate = useNavigate();
  const[cryptoChain, setCryptoChain] = useState('solana');
  return (
    <>
    <div className='bg-gradient'></div>
    <div className="container">
        <main className="main">

          <div className="hero-section">
            <h1 className="main-title">ArthaSetu</h1>
            <h3 className="tagtitle">Your Bridge to Digital Wealth</h3>
            <div className="blockchain-selector">
              <button className="blockchain-btn" onClick={() => navigate(`/seedGeneration`, {state : {cryptoChain: 'solana'}})}>
                Solana
              </button>
              <button className="blockchain-btn" onClick={() => navigate(`/seedGeneration`, {state: {cryptoChain: 'ethereum'}})}>
                Ethereum
              </button>
            </div>
          </div>
          {/* <button onClick={() => {
            setCryptoChain('solana');
            return navigate('')
          }}>

          </button> */}
        </main>
      </div>
      </>
  )
}

export default Landing