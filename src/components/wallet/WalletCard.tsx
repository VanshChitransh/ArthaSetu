import { useState } from 'react';
import type{ WalletCardProps } from '../../types';
import { Eye, EyeOff, Copy, Trash, Plus } from "lucide-react";

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

export default WalletCard