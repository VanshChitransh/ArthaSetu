// import React from 'react'
// import '../styles/style.css'
// const SeedGeneration = () => {
//   return (
//     <>
//         <div className='bg-gradient'></div>
//         <div className='container hero-section'>
//             <h1 className=''>Secret Recovery Phase</h1>
//             <p className='tagtitle'> Save these words in a safe place. </p>
//             <input placeholder='Enter your seed phrase here'></input>
//             <button className='blockchain-btn'>Generate Wallet</button>
//         </div>
//     </>
//   )
// }

// export default SeedGeneration

import React from 'react'
import '../styles/style.css'

const SeedGeneration = () => {
  return (
    <>
      <div className='bg-gradient'></div>
      <div className='seed-container'>
        <h1 className='seed-title'>Secret Recovery Phrase</h1>
        <p className='seed-subtitle'>Save these words in a safe place.</p>
        <div className='seed-input-container'>
          <input 
            className='seed-input' 
            placeholder='Enter your secret phrase (or leave blank to generate)'
          />
        </div>
        <button className='blockchain-btn'>Generate Wallet</button>
      </div>
    </>
  )
}

export default SeedGeneration