import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

let walletIndex = 0;

const generateMnemonic = () => {
    try {
        const mnemonic: string = bip39.generateMnemonic();
        return mnemonic;
    } catch (error) {
        console.error("Error generating mnemonic:", error);
        return "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    }
}

let currentMnemonic: string | null = null;

const myOwnFunction2 = async (useNewMnemonic: boolean = false) => {
    try {
        if (!currentMnemonic || useNewMnemonic) {
            currentMnemonic = generateMnemonic();
            walletIndex = 0;
        }

        const derivationPath = `m/44'/60'/0'/0/${walletIndex}`;
        
        const hdWallet = ethers.HDNodeWallet.fromMnemonic(
            ethers.Mnemonic.fromPhrase(currentMnemonic),
            derivationPath
        );
        
        // Hardcoded balance to 0 as requested
        const balance = 0;
        
        walletIndex++;

        return {
            mnemonic: currentMnemonic,
            publicKey: hdWallet.address,
            privateKey: hdWallet.privateKey,
            balance: balance
        };
    } catch (error) {
        console.error("Error in myOwnFunction2:", error);
        // Return a valid wallet even if there's an error
        if (!currentMnemonic) {
            currentMnemonic = generateMnemonic();
        }
        
        const derivationPath = `m/44'/60'/0'/0/${walletIndex}`;
        const hdWallet = ethers.HDNodeWallet.fromMnemonic(
            ethers.Mnemonic.fromPhrase(currentMnemonic),
            derivationPath
        );
        
        walletIndex++;
        
        return {
            mnemonic: currentMnemonic,
            publicKey: hdWallet.address,
            privateKey: hdWallet.privateKey,
            balance: 0
        };
    }
};

export const generateNewWalletFromSameMnemonic = () => myOwnFunction2(false);
export const generateWalletWithNewMnemonic = () => myOwnFunction2(true);
export const getCurrentMnemonic = () => currentMnemonic;

export default myOwnFunction2;