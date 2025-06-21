export interface Wallet {
  id: string;
  name: string;
  publicKey: string;
  privateKey: string;
  balance?: string;
}