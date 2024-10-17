"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const crypt_js_1 = require("./crypt.js");
const process_1 = __importDefault(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
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
 * loadConfig();
 *
 * // Load configuration from a specified .env file
 * loadConfig({ envConfigPath: 'path/to/.env' });
 *
 * // Load configuration from an encrypted file
 * loadConfig({ encryptedConfigPath: 'path/to/config.env.enc', password: 'mySecretPassword' });
 * ```
 */
function loadConfig(options) {
    if (!options)
        dotenv_1.default.config();
    if (options === null || options === void 0 ? void 0 : options.envConfigPath)
        dotenv_1.default.config({ path: options.envConfigPath });
    if (options === null || options === void 0 ? void 0 : options.encryptedConfigPath) {
        const decryptedBuffer = (0, crypt_js_1.decrypt)({
            password: (options === null || options === void 0 ? void 0 : options.password) || process_1.default.env.QAVAJS_ENV_PASSWORD,
            inputFilePath: options.encryptedConfigPath
        });
        Object.assign(process_1.default.env, dotenv_1.default.parse(decryptedBuffer));
    }
}
