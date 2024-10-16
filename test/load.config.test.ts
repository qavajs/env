import {describe, test, expect} from 'vitest';
import {loadConfig} from "../src";
import CONSTANTS from "./constants";

const {PASSWORD, VALUE} = CONSTANTS;
const namedConfig = {password: PASSWORD, envConfigPath: 'named.env', encryptedConfigPath: 'named.env.enc'}

describe('load env config', () => {
    test('load default dotenv config', async () => {
      await loadConfig();
      expect(process.env.SECRET).equal(VALUE);
    });

    test('load named dotenv config', async () => {
      await loadConfig(namedConfig);
      expect(process.env.NAMED_SECRET).equal(VALUE);
    });
  }
);

describe('decrypt and load encrypted variables', () => {
    test('decrypt and load encrypted variables with password as argument', async () => {
      await loadConfig({encryptedConfigPath: '.env.enc', password: PASSWORD});
      expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt and load encrypted variables with password from process.env.QAVAJS_ENV_PASSWORD', async () => {
      process.env.QAVAJS_ENV_PASSWORD = PASSWORD;
      await loadConfig({encryptedConfigPath: '.env.enc'});
      expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt and load named encrypted file', async () => {
      await loadConfig(namedConfig);
      expect(process.env.NAMED_DECRYPTED_SECRET).equal(VALUE);
    });

    test('decrypt default file if only password passed', async () => {
      await loadConfig({password: PASSWORD});
      expect(process.env.DECRYPTED_SECRET).equal(VALUE);
    });
  }
);
