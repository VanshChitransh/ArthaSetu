import type{ SecretPhraseSectionProps } from "../../types";
import { Eye, EyeOff, Copy, Trash, Plus } from "lucide-react";

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

export default SecretPhraseSection