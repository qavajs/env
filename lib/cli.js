"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypt_1 = require("./crypt");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .name('crypt-env')
    .description('CLI tool to encrypt and decrypt environment variables files')
    .version('0.1.0');
program.command('encrypt')
    .description('Encrypt a file')
    .argument('<string>', 'Password')
    .option('-f, --file <string>', 'File path to encrypt', '.env')
    .action((password, options) => {
    (0, crypt_1.encryptAndWrite)({ password, inputFilePath: options.file });
});
program.command('decrypt')
    .description('Decrypt a file')
    .argument('<string>', 'Password')
    .option('-f, --file <string>', 'File path to decrypt', '.env.enc')
    .action((password, options) => {
    (0, crypt_1.decryptAndWrite)({ password, inputFilePath: options.file });
});
program.parse();
