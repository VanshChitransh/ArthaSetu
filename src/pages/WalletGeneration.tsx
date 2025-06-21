import { useEffect, useState } from "react";
import { Trash, Plus } from "lucide-react";
import type { Wallet, WalletGenerationProps} from '../types/index'
import  WalletCard  from '../components/wallet/WalletCard'
import SecretPhraseSection from "../components/wallet/SecretPhraseSection";
import { useNavigate } from "react-router-dom";


const WalletGeneration = ({ 
  blockchainType = 'solana',
  secretPhrase: initialSecretPhrase,
  wallets: initialWallets 
}: WalletGenerationProps) => {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets || [{id: '101', name: "Wallet 1", publicKey: "random", privateKey: "random", balance: "random"}])
  
  const navigate = useNavigate();

  const [secretPhrase] = useState(initialSecretPhrase || [
    "senior", "main", "rotate", "flock",
    "below", "knee", "metal", "side", 
    "sell", "split", "derive", "enact"
  ]);
  
  const [showSecretPhrase, setShowSecretPhrase] = useState(false);
  
  const addWallet = () => {
    const newWallet: Wallet = {
      id: (wallets.length + 1).toString(),
      name: `Wallet ${wallets.length + 1}`,
      publicKey: `${Math.random().toString(36).substring(2, 15)}...`,
      privateKey: Math.random().toString(36).substring(2, 15),
      balance: blockchainType === 'solana' ? "0.00 SOL" : "0.00 ETH"
    };
    setWallets([...wallets, newWallet]);
    console.log("New wallet created successfully!");
  };
  
  const deleteWallet = (id: string) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };
  
  const clearWallets = () => {
    setWallets([]);
    console.log("All wallets cleared!");
  };
  
  const copySecretPhrase = () => {
    // navigator.clipboard.writeText(secretPhrase.join(" "));
    // console.log("Secret phrase copied to clipboard!");
  };

  useEffect(() => {
    if(wallets.length == 0){
      navigate('/SeedGeneration')
    }
  },[wallets, navigate])

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