import CryptoJS from 'crypto-js';

// The ephemeral "Master Key" (In memory only)
let masterKey = 'user_defined_secure_key_123';

export const setMasterKey = (key: string) => {
  masterKey = key;
};

export const encryptSecret = (secret: string): string => {
  return CryptoJS.AES.encrypt(secret, masterKey).toString();
};

export const decryptSecret = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, masterKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export interface VaultItem {
  id: string;
  name: string;
  cipherText: string;
}

// In-memory mock database
export const mockDb = {
  balances: [
    { bank: 'SBI', type: 'Checking', amount: 15400.5 },
    { bank: 'HDFC', type: 'Savings', amount: 48200.0 },
    { bank: 'Groww', type: 'Investment', amount: 125000.0 },
  ],
  vault: [] as VaultItem[],
};
