import {decrypt} from './crypt.js';
import process from "process";
import dotenv from "dotenv";

export type ConfigOptions = {
    password?: string, envConfigPath?: string, encryptedConfigPath?: string
}

/**
 * Loads configuration settings from environment files. It supports loading from a standard `.env` file,
 * a specified `.env` file, or an encrypted configuration file.
 *
 * @param options - An optional object containing configuration options.
 * @param options.envConfigPath - The path to a `.env` file to be loaded.
 * @param options.encryptedConfigPath - The path to an encrypted configuration file to be decrypted and loaded.
 * @param options.password - The password used to decrypt the encrypted configuration file. If not provided, it defaults to the value of the `QAVAJS_ENV_PASSWORD` environment variable.
 * @throws Will throw an error if reading the input file, the decryption process, or loading the environment variables fails.
 * @example
 * ```typescript
 * // Load configuration from the default .env file
 * await loadConfig();
 *
 * // Load configuration from a specified .env file
 * await loadConfig({ envConfigPath: 'path/to/.env' });
 *
 * // Load configuration from an encrypted file
 * await loadConfig({ encryptedConfigPath: 'path/to/config.env.enc', password: 'mySecretPassword' });
 * ```
 */
export function loadConfig(options?: ConfigOptions) {
    if (!options) dotenv.config();
    if (options?.envConfigPath) dotenv.config({path: options.envConfigPath});
    if (options?.encryptedConfigPath) {
        const decryptedBuffer = decrypt({
            password: options?.password || process.env.QAVAJS_ENV_PASSWORD as string,
            inputFilePath: options.encryptedConfigPath
        });
        Object.assign(process.env, dotenv.parse(decryptedBuffer));
    }
}
