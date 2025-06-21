export interface SecretPhraseSectionProps {
  secretPhrase: string[];
  showSecretPhrase: boolean;
  setShowSecretPhrase: (show: boolean) => void;
  onCopy: () => void;
}
