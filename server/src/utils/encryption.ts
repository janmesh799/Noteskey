import crypto from "crypto";
import {
  secret_key,
  secret_iv,
  encryption_method,
} from "../../src/config/config";

// Ensure the encryption method, key, and IV are set
if (!secret_key || !secret_iv || !encryption_method) {
  throw new Error("secret_key, secret_iv, and encryption_method are required");
}

// Convert secret key and IV to Buffer objects
const key = Buffer.from(secret_key, "hex");
const iv = Buffer.from(secret_iv, "hex");

// Encrypt data
export function encryptData(data: string): string {
  try {
    if (!encryption_method) throw new Error("encryption method not defined");
    const cipher = crypto.createCipheriv(encryption_method, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(data, "utf8"),
      cipher.final(),
    ]);
    return encrypted.toString("base64");
  } catch (err: any) {
    console.log(err.message);
    throw new Error(`Error encrypting data: ${err.message}`);
  }
}

// Decrypt data
export function decryptData(encryptedData: string): string {
  try {
    if (!encryption_method) throw new Error("encryption method not defined");

    const buff = Buffer.from(encryptedData, "base64");
    const decipher = crypto.createDecipheriv(encryption_method, key, iv);
    const decrypted = Buffer.concat([decipher.update(buff), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err: any) {
    console.log(err.message);
    throw new Error(`Error decrypting data: ${err.message}`);
  }
}
