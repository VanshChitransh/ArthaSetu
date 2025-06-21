import type{ Wallet } from './Wallet'

export interface WalletCardProps {
  wallet: Wallet;
  onDelete: (id: string) => void;
}