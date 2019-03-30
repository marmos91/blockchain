const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const public = key.getPublic('hex');
const private = key.getPrivate('hex');

console.log();
console.log('Your public key (also your wallet address)\n', public);

console.log();
console.log('Your private key (keep this secret!)\n', private);
