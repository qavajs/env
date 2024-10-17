import {describe, test, expect, vi, afterEach} from 'vitest';
import {loadConfig} from "../src";
import CONSTANTS from "./constants";

const {PASSWORD, VALUE} = CONSTANTS;
const namedConfig = {
    password: PASSWORD,
    envConfigPath: 'test/testData/named.env',
    encryptedConfigPath: 'test/testData/named.env.enc'
}

describe('load env config', () => {
    vi.mock('dotenv', async (importOriginal) => {
        const importedOriginal: any = await importOriginal();
        return {
            default: {
                ...importedOriginal,
                config: vi.fn((path) => {
                    if (!path) process.env.SECRET = VALUE;
                    else importedOriginal.config(path)
                })
            }
        }
    });

    test('load default dotenv config', () => {
        loadConfig();
        expect(process.env.SECRET).equal(VALUE);
    });

    test('load named dotenv config', () => {
        loadConfig({envConfigPath: namedConfig.envConfigPath});
        expect(process.env.NAMED_SECRET).equal(VALUE);
    });
});

describe('decrypt and load encrypted variables', () => {
    test('decrypt and load encrypted variables with password as argument', () => {
        loadConfig({encryptedConfigPath: 'test/testData/.env.enc', password: PASSWORD});
        expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt and load encrypted variables with password from process.env.QAVAJS_ENV_PASSWORD', () => {
        process.env.QAVAJS_ENV_PASSWORD = PASSWORD;
        loadConfig({encryptedConfigPath: 'test/testData/.env.enc'});
        expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt and load named encrypted file', () => {
        loadConfig(namedConfig);
        expect(process.env.NAMED_DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt default file if only password passed', () => {
        loadConfig({password: PASSWORD});
        expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });
});
