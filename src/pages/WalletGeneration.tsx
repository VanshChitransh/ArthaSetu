import { useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";
import type { Wallet, WalletGenerationProps} from '../types/index'
import  WalletCard  from '../components/wallet/WalletCard'
import SecretPhraseSection from "../components/wallet/SecretPhraseSection";
// import { useNavigate } from "react-router-dom";
import myOwnFunction from "../utils/solana";


const WalletGeneration = ({ 
  blockchainType = 'solana',
  secretPhrase: initialSecretPhrase,
  wallets: initialWallets 
}: WalletGenerationProps) => {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets || []);
  const [secretPhrase, setSecretPhrase] = useState<string[]>(initialSecretPhrase || []);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  
  const addWallet = async () => {
    try{
        const data = await myOwnFunction();
        const newWallet: Wallet = {
            id: (wallets.length + 1).toString(),
            name: `Wallet ${wallets.length + 1}`,
            publicKey: data.publicKey,
            privateKey: data.privateKey,
            balance: blockchainType === 'solana' ? `${data.balance} SOL` : '0.00 ETH'
        };
        setWallets(prevWallet => [...prevWallet, newWallet]);
        console.log("Wallet added...");
    } catch (error){
        console.log("Error while creating wallet!! Better you don't create it :( : ", error);
    }
  };
  
  const deleteWallet = (id: string) => {
    setWallets(prevWallets => prevWallets.filter(wallet => wallet.id !== id))
  };
  
  const clearWallets = () => {
    setWallets([]);
    setSecretPhrase([]);
    console.log("All wallets cleared!");
  };

  const copySecretPhrase = () => {
    const phraseString = secretPhrase.join(' ');
    navigator.clipboard.writeText(phraseString).then(() => {
        console.log("Secret phrase copied to clipboard")
    }).catch(err => {
        console.error("Failed to copy secret phrase: ", err);
    });
  };


  useEffect(() => {
    if(!initialWallets || initialWallets.length == 0){
      const generateInitialWallet = async() => {
        const data = await myOwnFunction();
        const newWallet: Wallet = {
              id: (wallets.length + 1).toString(),
              name: `Wallet ${wallets.length + 1}`,
              publicKey: `${data.publicKey}`,
              privateKey: `${data.privateKey}`,
              balance: blockchainType === 'solana' ? "0.00 SOL" : "0.00 ETH"
        };
        setWallets([newWallet]);
        // [secretPhrase] = data.mnemonic
        setSecretPhrase(data.mnemonic.split(' '));
      };
      generateInitialWallet();
    } else {
      setWallets(initialWallets);
    }
  }, [initialWallets]);
  

  return (
    <>
    <div className="bg-gradient"></div>
    <div className="bg-gradient"></div>
    <div className="container-scrollable mx-auto px-6 py-8">
      
      <SecretPhraseSection 
        secretPhrase={secretPhrase}
        showSecretPhrase={showSecretPhrase}
        setShowSecretPhrase={setShowSecretPhrase}
        onCopy={copySecretPhrase}
      />

      
      <div className="mt-12 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {blockchainType === 'solana' ? 'Solana' : 'Ethereum'} Wallet
            </h2>
            <p className="text-secondary">Manage your crypto wallets securely</p>
          </div>
          {wallets.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={addWallet}
                className="px-6 py-3 btn-secondary rounded-lg font-medium flex items-center gap-2 shadow-lg"
              >
                <Plus size={20} />
                Add Wallet
              </button>
              <button
                onClick={clearWallets}
                className="px-6 py-3 glass rounded-lg text-red-400 font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Trash size={20} />
                Clear Wallets
              </button>
            </div>
          )}
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {wallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={wallet} onDelete={deleteWallet} />
            ))}
          </div>
      </div>
    </div>
    </>
  );
};

export default WalletGeneration;

// import { useEffect, useState } from "react";
// import { Trash, Plus } from "lucide-react";
// import type { Wallet, WalletGenerationProps} from '../types/index'
// import  WalletCard  from '../components/wallet/WalletCard'
// import SecretPhraseSection from "../components/wallet/SecretPhraseSection";
// import myOwnFunction from "../utils/solana";

// const WalletGeneration = ({ 
//   blockchainType = 'solana',
//   secretPhrase: initialSecretPhrase,
//   wallets: initialWallets 
// }: WalletGenerationProps) => {
//   const [wallets, setWallets] = useState<Wallet[]>(initialWallets || []);
  
//   // Fix 1: Properly manage secretPhrase state
//   const [secretPhrase, setSecretPhrase] = useState<string[]>(
//     initialSecretPhrase || []
//   );
  
//   const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  
//   // Fix 2: Implement addWallet function
//   const addWallet = async () => {
//     try {
//       const data = await myOwnFunction();
//       const newWallet: Wallet = {
//         id: (wallets.length + 1).toString(),
//         name: `Wallet ${wallets.length + 1}`,
//         publicKey: data.publicKey,
//         privateKey: data.privateKey,
//         balance: blockchainType === 'solana' ? `${data.balance} SOL` : "0.00 ETH"
//       };
//       setWallets(prevWallets => [...prevWallets, newWallet]);
//       console.log("New wallet created successfully!");
//     } catch (error) {
//       console.error("Error creating wallet:", error);
//     }
//   };
  
//   const deleteWallet = (id: string) => {
//     setWallets(prevWallets => prevWallets.filter(wallet => wallet.id !== id));
//   };
  
//   const clearWallets = () => {
//     setWallets([]);
//     setSecretPhrase([]); // Also clear the secret phrase
//     console.log("All wallets cleared!");
//   };

//   // Fix 3: Implement proper copy function
//   const copySecretPhrase = () => {
//     const phraseString = secretPhrase.join(' ');
//     navigator.clipboard.writeText(phraseString).then(() => {
//       console.log("Secret phrase copied to clipboard!");
//     }).catch(err => {
//       console.error("Failed to copy secret phrase:", err);
//     });
//   };

//   useEffect(() => {
//     if(!initialWallets || initialWallets.length === 0){
//       const generateInitialWallet = async() => {
//         try {
//           const data = await myOwnFunction();
//           const newWallet: Wallet = {
//             id: "1",
//             name: "Wallet 1",
//             publicKey: data.publicKey,
//             privateKey: data.privateKey,
//             balance: blockchainType === 'solana' ? `${data.balance} SOL` : "0.00 ETH"
//           };
//           setWallets([newWallet]);
          
//           // Fix 4: Properly set secret phrase as array
//           setSecretPhrase(data.mnemonic.split(' '));
//         } catch (error) {
//           console.error("Error generating initial wallet:", error);
//         }
//       };
//       generateInitialWallet();
//     } else {
//       setWallets(initialWallets);
//     }
//   }, [initialWallets, blockchainType]);
  
//   return (
//     <>
//       <div className="bg-gradient"></div>
//       <div className="bg-gradient"></div>
//       <div className="container-scrollable mx-auto px-6 py-8">
        
//         <SecretPhraseSection 
//           secretPhrase={secretPhrase}
//           showSecretPhrase={showSecretPhrase}
//           setShowSecretPhrase={setShowSecretPhrase}
//           onCopy={copySecretPhrase}
//         />

//         <div className="mt-12 mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-3xl font-bold text-gradient mb-2">
//                 {blockchainType === 'solana' ? 'Solana' : 'Ethereum'} Wallet
//               </h2>
//               <p className="text-secondary">Manage your crypto wallets securely</p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={addWallet}
//                 className="px-6 py-3 btn-secondary rounded-lg font-medium flex items-center gap-2 shadow-lg"
//               >
//                 <Plus size={20} />
//                 Add Wallet
//               </button>
//               {wallets.length > 0 && (
//                 <button
//                   onClick={clearWallets}
//                   className="px-6 py-3 glass rounded-lg text-red-400 font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2 shadow-lg"
//                 >
//                   <Trash size={20} />
//                   Clear Wallets
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
//             {wallets.map((wallet) => (
//               <WalletCard key={wallet.id} wallet={wallet} onDelete={deleteWallet} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WalletGeneration;