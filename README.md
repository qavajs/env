# Env
The module decrypts and loads environment variables from a `.env.enc` file into process.env as well as variables from a `.env`. 

## Usage
As early as possible in your application, import and call `qavajs-env/loadConfig()`

To upload variables only from .env file:
```typescript
// Load configuration from the default .env file
await loadConfig();

// Load configuration from a specified *.env file
await loadConfig({ envConfigPath: 'path/to/local.env' });

// Load configuration from a default .env.enc encrypted file
await loadConfig({ password: 'mySecretPassword' });

// Load configuration from a specified *.env.enc encrypted file
await loadConfig({ encryptedConfigPath: 'path/to/config.env.enc', password: 'mySecretPassword' });

// Load configuration from both *.env and *.env.enc files
await loadConfig({ envConfigPath: 'path/to/local.env', encryptedConfigPath: 'path/to/local.env.enc', password: 'mySecretPassword' });
```

## CLI tools
The module has a commandline tool to encrypt and decrypt env files in order to provide capability to update .env.enc file according to changes through project.
To encrypt default `.env` from the root folder run the next command in terminal: 
````shell
qavajs-env encrypt 'mySecretPassword'
````
This command will generate .env.enc it the project root folder.

To encrypt an env file with specific name run the next:
````shell
qavajs-env encrypt 'mySecretPassword' -f 'pth/to/my/named.env'
````
The file will be encrypted and saved into the directory.

Another feature is decrypting an `.env.enc` file. This can be helpful if you would like to obtain it's content.
````shell
qavajs-env encrypt 'mySecretPassword'
````

To decrypt an `env.enc` file from a specific directory run the next command:
````shell
qavajs-env encrypt 'mySecretPassword' -f pth/to/my/named.env.enc
````