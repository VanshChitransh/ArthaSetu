import React from 'react'
import '../styles/style.css'

const Landing = () => {
  return (
    <div className="container">
        <main className="main">
          <div className="hero-section">
            <h1 className="main-title">ArthaSetu</h1>
            <h3 className="tagtitle">Your Bridge to Digital Wealth</h3>
            <div className="blockchain-selector">
              <button className="blockchain-btn">
                Solana
              </button>
              <button className="blockchain-btn">
                
                Ethereum
              </button>
            </div>
          </div>
        </main>
      </div>
  )
}

export default Landing