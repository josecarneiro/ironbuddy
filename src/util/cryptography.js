import { AES, enc as Encoding } from 'crypto-js';

export const encrypt = (message, key) => AES.encrypt(message, key).toString();
export const decrypt = (encrypted, key) => AES.decrypt(encrypted, key).toString(Encoding.Utf8);

const message = "A larger message than the one before";
const key = "Secret Passphrase";

const encrypted = encrypt(message, key);
const decrypted = decrypt(encrypted, key);

console.log(decrypted === message, encrypted);
