import nacl from 'tweetnacl';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

const generateMnemonic = () => {
    // const mnemonic: string = bip39.generateMnemonic();
    const mnemonic = "phrase  pretty kite team thank equal verb reunion flock real insect inmate stadium";
    return mnemonic;
}

// console.log(generateMnemonic());

const seedSync = async (mnemonic:string) => {
    // the generateMnemonic function returns a string of 12 words combine, not an array of 12 words
    const seed:Buffer = await bip39.mnemonicToSeed(mnemonic);
    // console.log("Hi")
    return seed;
}

const derivedPath = async (mnemonic: string ,n:number) => {
    const solanaPath:string = `m/44'/501'/0'/${n}'`;
    const seed = await seedSync(mnemonic);
    const derived = derivePath(solanaPath, seed.toString('hex'));
    return derived;
}

const getKeyPairFromPrivateKey = (privateKey: Buffer) => {
    const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
    return{
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey)
    }
}

const getBalanceFromPublicKey = async(key: string) => {
    const a: number = 32;
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const publicKey = new PublicKey(key);
    const balanceInLamports = await connection.getBalance(publicKey);
    const balance = balanceInLamports/LAMPORTS_PER_SOL;
    return balance;

}


(async () => {
    const a = generateMnemonic();
    const b = await seedSync(a);
    const c = await derivedPath(a,1);
    const d = getKeyPairFromPrivateKey(c.key);
    // const e = getBalanceFromPublicKey();
    console.log("Mnemonic phrase ", a);
    console.log("Seed -> ", b.toString('hex'));
    console.log("Derived key(private key) -> ", c.key.toString('hex'));
    console.log("This is chain code -> ", c.chainCode.toString('hex'));
    console.log("Private Key -> ", d.secretKey.slice(0,32));
    console.log("public key direct -> ", d.publicKey);
    console.log("Public key derived -> ", d.secretKey.slice(32,64));
    console.log("Balance -> ", await getBalanceFromPublicKey(bs58.encode(Buffer.from(d.publicKey))));
})();



// Still have to look why ed25519 is not compatible with browser...