import {describe, expect, test, onTestFinished} from "vitest";
import {encryptAndWrite, decrypt, decryptAndWrite} from '../src/crypt';
import {readFile, rm} from "node:fs/promises";
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
  test('encrypt and write file', async () => {
    await encryptAndWrite({password: PASSWORD, inputFilePath: ENCRYPT_TEST_ENV_PATH});
    const encrypted = await readFile(ENCRYPT_TEST_ENV_ENC_PATH);
    expect(encrypted instanceof Buffer).to.be.true
    onTestFinished(async () => await rm(ENCRYPT_TEST_ENV_ENC_PATH));
  });
});

describe('decrypt', () => {
  test('decrypt and write file', async () => {
    await decryptAndWrite({password: PASSWORD, inputFilePath: DECRYPT_TEST_ENV_ENC_PATH});
    const decrypted = await readFile(DECRYPT_TEST_DECRYPTED_ENV_PATH);
    const {SECRET} = parse(decrypted);
    expect(SECRET).to.equal(VALUE);
    onTestFinished(async () => await rm(DECRYPT_TEST_DECRYPTED_ENV_PATH));
  });
});
