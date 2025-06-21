import { useState } from "react";
import { Eye, EyeOff, Copy, Trash, Plus } from "lucide-react";

// Interfaces
interface Wallet {
  id: string;
  name: string;
  publicKey: string;
  privateKey: string;
  balance?: string;
}

interface WalletCardProps {
  wallet: Wallet;
  onDelete: (id: string) => void;
}

interface SecretPhraseSectionProps {
  secretPhrase: string[];
  showSecretPhrase: boolean;
  setShowSecretPhrase: (show: boolean) => void;
  onCopy: () => void;
}

// Wallet Card Component
const WalletCard = ({ wallet, onDelete }: WalletCardProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    // You can add toast notification here if needed
    console.log(`${type} copied to clipboard!`);
  };

  const handleDelete = () => {
    onDelete(wallet.id);
    console.log(`${wallet.name} deleted!`);
  };

  return (
    <div className="glass-strong rounded-2xl p-6 shadow-2xl hover:border-accent transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary">{wallet.name}</h3>
        <button
          onClick={handleDelete}
          className="p-2 text-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Balance */}
      {wallet.balance && (
        <div className="mb-6">
          <p className="text-secondary text-sm mb-1">Balance</p>
          <p className="text-2xl font-bold text-accent">{wallet.balance}</p>
        </div>
      )}

      {/* Public Key */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-secondary text-sm">Public Key</p>
          <button
            onClick={() => copyToClipboard(wallet.publicKey, "Public key")}
            className="p-1 text-secondary hover:text-primary transition-all duration-300"
          >
            <Copy size={14} />
          </button>
        </div>
        <div className="glass rounded-lg p-3">
          <p className="text-primary font-mono text-sm break-all">{wallet.publicKey}</p>
        </div>
      </div>

      {/* Private Key */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-secondary text-sm">Private Key</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(wallet.privateKey, "Private key")}
              className="p-1 text-secondary hover:text-primary transition-all duration-300"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="p-1 text-secondary hover:text-primary transition-all duration-300"
            >
              {showPrivateKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div className="glass rounded-lg p-3">
          <p className="text-primary font-mono text-sm break-all">
            {showPrivateKey ? wallet.privateKey : "•".repeat(64)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Secret Phrase Section Component
const SecretPhraseSection = ({ 
  secretPhrase, 
  showSecretPhrase, 
  setShowSecretPhrase, 
  onCopy 
}: SecretPhraseSectionProps) => {
  return (
    <div className="glass-strong rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Secret Phrase</h2>
        <button
          onClick={() => setShowSecretPhrase(!showSecretPhrase)}
          className="p-2 glass rounded-lg text-primary hover:border-accent transition-all duration-300"
        >
          {showSecretPhrase ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      {showSecretPhrase ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {secretPhrase.map((word, index) => (
              <div
                key={index}
                className="glass rounded-lg px-4 py-3 text-primary font-medium text-center hover:border-accent transition-all duration-300"
              >
                {word}
              </div>
            ))}
          </div>
          
          <button
            onClick={onCopy}
            className="w-full py-3 btn-primary font-medium rounded-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <Copy size={20} />
            Click Anywhere To Copy
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 glass rounded-full flex items-center justify-center mx-auto mb-4">
            <EyeOff size={24} className="text-secondary" />
          </div>
          <p className="text-secondary">Click the eye icon to reveal your secret phrase</p>
        </div>
      )}
    </div>
  );
};

// Main Wallet Generation Component
interface WalletGenerationProps {
  blockchainType?: 'solana' | 'ethereum';
  secretPhrase?: string[];
  wallets?: Wallet[];
}

const WalletGeneration = ({ 
  blockchainType = 'solana',
  secretPhrase: initialSecretPhrase,
  wallets: initialWallets 
}: WalletGenerationProps) => {
  const [wallets, setWallets] = useState<Wallet[]>(initialWallets || [
    {
      id: "1",
      name: "Wallet 1",
      publicKey: "7ZTx2LyJRLutBYjZvkbLuqgXftYRcv1aYBX8ZMKbKZS9",
      privateKey: "5J8rJ9mKpQs6YhGkLm2pNfRtU3xVzW9nEbDcFqHgTyRx",
      balance: blockchainType === 'solana' ? "2.45 SOL" : "0.00 ETH"
    }
  ]);
  
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
    navigator.clipboard.writeText(secretPhrase.join(" "));
    console.log("Secret phrase copied to clipboard!");
  };

  return (
    <>
    <div className="bg-gradient"></div>
    <div className="bg-gradient"></div>
    <div className="container-scrollable mx-auto px-6 py-8">
      {/* Secret Phrase Section */}
      <SecretPhraseSection 
        secretPhrase={secretPhrase}
        showSecretPhrase={showSecretPhrase}
        setShowSecretPhrase={setShowSecretPhrase}
        onCopy={copySecretPhrase}
      />

      {/* Wallet Section */}
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

        {/* Wallets Grid */}
        {wallets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {wallets.map((wallet) => (
              <WalletCard key={wallet.id} wallet={wallet} onDelete={deleteWallet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 glass rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus size={32} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">No wallets yet</h3>
            <p className="text-secondary mb-6">Create your first wallet to get started</p>
            <button
              onClick={addWallet}
              className="px-8 py-3 btn-primary font-medium rounded-lg shadow-lg"
            >
              Create Wallet
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default WalletGeneration;