import type{Wallet} from './Wallet'

export interface WalletGenerationProps {
  blockchainType?: 'solana' | 'ethereum';
  secretPhrase?: string[];
  wallets?: Wallet[];
}