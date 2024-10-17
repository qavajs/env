import {describe, expect, test, onTestFinished} from "vitest";
import {encryptAndWrite, decryptAndWrite} from '../src/crypt';
import {readFileSync, rmSync} from "node:fs";
import {parse} from "dotenv";
import CONSTANTS from "./constants";

const {
    PASSWORD,
    VALUE,
    ENCRYPT_TEST_ENV_PATH,
    ENCRYPT_TEST_ENV_ENC_PATH,
    DECRYPT_TEST_DECRYPTED_ENV_PATH,
    DECRYPT_TEST_ENV_ENC_PATH
} = CONSTANTS;

describe('encrypt', () => {
    test('encrypt and write file', () => {
        encryptAndWrite({password: PASSWORD, inputFilePath: ENCRYPT_TEST_ENV_PATH});
        const encrypted = readFileSync(ENCRYPT_TEST_ENV_ENC_PATH);
        expect(encrypted instanceof Buffer).to.be.true
        onTestFinished(() => rmSync(ENCRYPT_TEST_ENV_ENC_PATH));
    });
});

describe('decrypt', () => {
    test('decrypt and write file', () => {
        decryptAndWrite({password: PASSWORD, inputFilePath: DECRYPT_TEST_ENV_ENC_PATH});
        const decrypted = readFileSync(DECRYPT_TEST_DECRYPTED_ENV_PATH);
        const {SECRET} = parse(decrypted);
        expect(SECRET).to.equal(VALUE);
        onTestFinished(() => rmSync(DECRYPT_TEST_DECRYPTED_ENV_PATH));
    });
});
