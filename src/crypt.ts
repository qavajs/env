import crypto from 'crypto';
import {writeFileSync, readFileSync} from "node:fs";
import chalk from "chalk";

const ALGORITHM = 'aes256';
const SALT = 'salt';
const ENC_EXTENSION = '.enc';
const ZERO = 0;
const IV_LENGTH = 16;
const KEY_LENGTH = 32;
const CHECKMARK = ' ✅️';
const success = chalk.black.bgGreenBright.bold;

/**
 * Encrypts the contents of a specified input file and writes the encrypted data to a new file.
 *
 * @param options - An object containing the input file path and the password for encryption.
 * @param options.inputFilePath - The path to the input file to be encrypted. Defaults to '.env' if not provided.
 * @param options.password - The password used to generate the encryption key.
 * @throws Will throw an error if reading the input file or writing the output file fails.
 * @example
 * ```typescript
 * encryptAndWrite({ inputFilePath: 'config.env', password: 'mySecretPassword' });
 * ```
 */
function encryptAndWrite(options: { inputFilePath?: string, password: string }): void {
    const inputFilePath = options.inputFilePath ?? '.env';
    const outputFilePath = inputFilePath + ENC_EXTENSION;
    const key = crypto.scryptSync(options.password, SALT, KEY_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const input = readFileSync(inputFilePath);
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);
    writeFileSync(outputFilePath, Buffer.concat([iv, encrypted]));
    console.log(CHECKMARK, success(`The Environment file "${inputFilePath}" has been encrypted to "${outputFilePath}".`));
    console.log(success(`Make sure to delete "${inputFilePath}" file for production use.`));
}

/**
 * Decrypts the contents of a specified encrypted input file using the provided password.
 *
 * @param options - An object containing the input file path and the password for decryption.
 * @param options.inputFilePath - The path to the encrypted input file to be decrypted.
 * @param options.password - The password used to generate the decryption key.
 * @returns A Buffer containing the decrypted data.
 * @throws Will throw an error if reading the input file or the decryption process fails.
 * @example
 * ```typescript
 * const decryptedData = decrypt({ inputFilePath: 'config.env.enc', password: 'mySecretPassword' });
 * console.log(decryptedData.toString());
 * ```
 */
function decrypt(options: { inputFilePath: string, password: string }): Buffer {
    const input = readFileSync(options.inputFilePath);
    const iv = input.subarray(ZERO, IV_LENGTH);
    const encryptedText = input.subarray(IV_LENGTH);
    const key = crypto.scryptSync(options.password, SALT, KEY_LENGTH);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    return Buffer.concat([decipher.update(encryptedText), decipher.final()]);
}

/**
 * Decrypts the contents of a specified encrypted input file and writes the decrypted data to a new file.
 *
 * @param options - An object containing the input file path and the password for decryption.
 * @param options.inputFilePath - The path to the encrypted input file to be decrypted.
 * @param options.password - The password used to generate the decryption key.
 * @returns A promise that resolves when the decryption and writing process is complete.
 * @throws Will throw an error if reading the input file, the decryption process, or writing the output file fails.
 * @example
 * ```typescript
 * decryptAndWrite({ inputFilePath: 'config.env.enc', password: 'mySecretPassword' });
 * // The content of the encrypted environment file "config.env.enc" has been decrypted to "config_decrypted.env".
 * ```
 */
function decryptAndWrite(options: { inputFilePath: string, password: string }): void {
    const outputFilePath = options.inputFilePath.replace('.env.enc', '_decrypted.env').replace(/^_/, '');
    const decrypted = decrypt(options);
    writeFileSync(outputFilePath, decrypted);
    console.log(CHECKMARK, success(`The content of the encrypted environment file "${options.inputFilePath}" has been decrypted to "${outputFilePath}".`));
}

export {encryptAndWrite, decrypt, decryptAndWrite};
