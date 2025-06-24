import nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import bs58 from 'bs58';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

// Bhai Buffer don't on browser... that browser where v8 works... 
// read more about this (Buffer is not defined, error!)

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
        return "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon";
    }
}

const seedSync = async (mnemonic: string) => {
    try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        return seed;
    } catch (error) {
        console.error("Error generating seed:", error);
        throw error;
    }
}

const hmacSha512 = async (key: Uint8Array, data: Uint8Array): Promise<Uint8Array> => {
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    return new Uint8Array(signature);
};


const deriveEd25519Key = async (seed: Uint8Array, path: string): Promise<Uint8Array> => {
    
    const pathArray = path.split('/').slice(1);
    
    let key = seed;
    let chainCode = new Uint8Array(32);
    
 
    for (let i = 0; i < pathArray.length; i++) {
        const indexStr = pathArray[i];
        const hardened = indexStr.endsWith("'");
        const index = parseInt(hardened ? indexStr.slice(0, -1) : indexStr);
        const indexBuffer = new Uint8Array(4);
        
        if (hardened) {
            const hardenedIndex = 0x80000000 + index;
            indexBuffer[0] = (hardenedIndex >>> 24) & 0xff;
            indexBuffer[1] = (hardenedIndex >>> 16) & 0xff;
            indexBuffer[2] = (hardenedIndex >>> 8) & 0xff;
            indexBuffer[3] = hardenedIndex & 0xff;
        } else {
            indexBuffer[0] = (index >>> 24) & 0xff;
            indexBuffer[1] = (index >>> 16) & 0xff;
            indexBuffer[2] = (index >>> 8) & 0xff;
            indexBuffer[3] = index & 0xff;
        }
        
        
        const data = new Uint8Array(1 + key.length + indexBuffer.length);
        data[0] = 0x00;
        data.set(key, 1);
        data.set(indexBuffer, 1 + key.length);
        
        const hmacKey = i === 0 ? seed : chainCode.length > 0 ? chainCode : seed;
        const hmacResult = await hmacSha512(hmacKey, data);
        
        key = hmacResult.slice(0, 32);
        chainCode = hmacResult.slice(32, 64);
    }
    
    return key;
};

const derivedPath = async (mnemonic: string, n: number) => {
    try {
        const solanaPath: string = `m/44'/501'/0'/${n}'`;
        const seed = await seedSync(mnemonic);
        
        const seedArray = new Uint8Array(seed);
        const derivedKey = await deriveEd25519Key(seedArray, solanaPath);
        
        return {
            key: derivedKey,
            chainCode: new Uint8Array(32) 
        };
    } catch (error) {
        console.error("Error deriving path:", error);
        throw error;
    }
}

const getKeyPairFromPrivateKey = (privateKey: Uint8Array) => {
    try {
        const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
        return {
            publicKey: keyPair.publicKey,
            secretKey: keyPair.secretKey
        }
    } catch (error) {
        console.error("Error generating key pair:", error);
        throw error;
    }
}

const getBalanceFromPublicKey = async (key: string) => {
    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        const publicKey = new PublicKey(key);
        const balanceInLamports = await connection.getBalance(publicKey);
        const balance = balanceInLamports / LAMPORTS_PER_SOL;
        return balance;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
}


let currentMnemonic: string | null = null;

const myOwnFunction = async (useNewMnemonic: boolean = false) => {
    try {
        if (!currentMnemonic || useNewMnemonic) {
            currentMnemonic = generateMnemonic();
            walletIndex = 0; 
        }

        const derived = await derivedPath(currentMnemonic, walletIndex);
        const keyPair = getKeyPairFromPrivateKey(derived.key);
        const publicKeyBase58 = bs58.encode(keyPair.publicKey);
        const balance = await getBalanceFromPublicKey(publicKeyBase58);
        
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.secretKey.slice(0, 32); 
        
        walletIndex++;

        return {
            mnemonic: currentMnemonic,
            publicKey: bs58.encode(publicKey),
            privateKey: bs58.encode(privateKey),
            balance: balance
        };
    } catch (error) {
        console.error("Error in myOwnFunction:", error);
        throw error;
    }
};

export const generateNewWalletFromSameMnemonic = () => myOwnFunction(false);
export const generateWalletWithNewMnemonic = () => myOwnFunction(true);
export const getCurrentMnemonic = () => currentMnemonic;

export default myOwnFunction;