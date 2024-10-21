import {decryptAndWrite, encryptAndWrite} from "./crypt";
import {Command} from 'commander';

const program = new Command();

program
    .name('qavajs-env')
    .description('CLI tool to encrypt and decrypt .env files')
    .version('0.1.0');

program.command('encrypt')
    .description('Encrypt a file')
    .argument('<string>', 'Password')
    .option('-f, --file <string>', 'File path to encrypt', '.env')
    .action((password: string, options: { file: string }) => {
        encryptAndWrite({password, inputFilePath: options.file});
    });

program.command('decrypt')
    .description('Decrypt a file')
    .argument('<string>', 'Password')
    .option('-f, --file <string>', 'File path to decrypt', '.env.enc')
    .action((password: string, options: { file: string }) => {
        decryptAndWrite({password, inputFilePath: options.file});
    });

program.parse();
