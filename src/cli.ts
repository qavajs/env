import {decryptAndWrite, encryptAndWrite} from "./crypt";
const {Command} = require('commander');
const program = new Command();

program
  .name('crypt-env')
  .description('CLI tool to encrypt and decrypt environment variables files')
  .version('0.1.0');

program.command('encrypt')
  .description('Encrypt a file')
  .argument('<string>', 'Password')
  .option('-f, --file <string>', 'File path to encrypt', '.env')
  .action(async (password: string, options: { file: string }) => {
    await encryptAndWrite({password, inputFilePath: options.file});
  });

program.command('decrypt')
  .description('Decrypt a file')
  .argument('<string>', 'Password')
  .option('-f, --file <string>', 'File path to decrypt', '.env.enc')
  .action(async (password: string, options: { file: string }) => {
    await decryptAndWrite({password, inputFilePath: options.file});
  });

program.parse();