import { useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";
import type { Wallet, WalletGenerationProps} from '../types/index'
import  WalletCard  from '../components/wallet/WalletCard'
import SecretPhraseSection from "../components/wallet/SecretPhraseSection";
import myOwnFunction from "../utils/solana";
import myOwnFunction2 from "../utils/ethereum"; // Import the Ethereum function
import Loader from "../components/common/Loader";
import { useNavigate, useLocation } from "react-router-dom";

const WalletGeneration = ({ 
  blockchainType: propBlockchainType,
  secretPhrase: initialSecretPhrase,
  wallets: initialWallets 
}: WalletGenerationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get blockchain type from navigation state or props
  const { cryptoChain } = location.state || {};
  const blockchainType = cryptoChain || propBlockchainType || 'solana';
  
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets || []);
  const [secretPhrase, setSecretPhrase] = useState<string[]>(initialSecretPhrase || []);
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])

  // Function to get the appropriate wallet generation function
  const getWalletFunction = () => {
    return blockchainType === 'ethereum' ? myOwnFunction2 : myOwnFunction;
  };

  useEffect(() => {
    if(!initialWallets || initialWallets.length == 0){
      const generateInitialWallet = async() => {
        try {
          const walletFunction = getWalletFunction();
          const data = await walletFunction();
          
          const newWallet: Wallet = {
                id: (wallets.length + 1).toString(),
                name: `Wallet ${wallets.length + 1}`,
                publicKey: `${data.publicKey}`,
                privateKey: `${data.privateKey}`,
                balance: blockchainType === 'ethereum' 
                  ? `${data.balance.toFixed(4)} ETH` 
                  : blockchainType === 'solana' 
                    ? `${data.balance || 0} SOL` 
                    : "0.00 ETH"
          };
          
          setWallets([newWallet]);
          setSecretPhrase(data.mnemonic.split(' '));
          console.log(wallets.length, "<- This is the length of the wallet ");
        } catch (error) {
          console.error("Error generating initial wallet:", error);
        }
      };
      generateInitialWallet();
    } else {
      setWallets(initialWallets);
    }
  }, [initialWallets, blockchainType]);
  
  const addWallet = async () => {
    try{
        const walletFunction = getWalletFunction();
        const data = await walletFunction();
        
        const newWallet: Wallet = {
            id: (wallets.length + 1).toString(),
            name: `Wallet ${wallets.length + 1}`,
            publicKey: data.publicKey,
            privateKey: data.privateKey,
            balance: blockchainType === 'ethereum' 
              ? `${data.balance.toFixed(4)} ETH` 
              : blockchainType === 'solana' 
                ? `${data.balance || 0} SOL` 
                : '0.00 ETH'
        };
        
        setWallets(prevWallet => [...prevWallet, newWallet]);
        console.log("Wallet added...");
        console.log("This is the wallet's length ->", wallets.length)
    } catch (error){
        console.log("Error while creating wallet!! Better you don't create it :( : ", error);
    }
  };
  
  const deleteWallet = (id: string) => {
    setWallets(prevWallets => {
      const filteredWallets = prevWallets.filter(wallet => wallet.id !== id);
      const updateWallets = filteredWallets.map((wallet, index) => ({
            ...wallet,
            id: (index + 1).toString(),
            name: `Wallet ${index + 1}`
      }));
      return updateWallets;
    });
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

  if(loader){
    return <Loader/>
  }

  useEffect(() => {
    if(wallets.length == 0){
          navigate('/SeedGeneration')
    }
  }, [wallets, loader])

//   useEffect(() => {
//   if (wallets.length === 0 && !loader) {
//     navigate('/SeedGeneration');
//   }
// }, [wallets, loader]);

  return (
    <div>
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
                className="px-6 py-3 btn-secondary rounded-lg font-medium flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Plus size={20} />
                Add Wallet
              </button>
              <button
                onClick={clearWallets}
                className="px-6 py-3 glass rounded-lg text-red-400 font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
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
    </div>
  );
};

export default WalletGeneration;