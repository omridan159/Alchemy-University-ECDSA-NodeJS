const secp = require('ethereum-cryptography/secp256k1');
const utils = require('ethereum-cryptography/utils');

const privateKey = secp.utils.randomPrivateKey();

console.log('Private key:', utils.toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

console.log('Public key:', utils.toHex(publicKey));
