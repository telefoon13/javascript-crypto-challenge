const nacl = require('libsodium-wrappers');
const Decryptor = require('./Decryptor');
const Encryptor = require('./Encryptor');

let keyPair = null;

function createKeyPair(){
    keyPair = nacl.crypto_sign_keypair();
}

module.exports = async (peer) => {
    await nacl.ready;

    createKeyPair();

    decryptor = await Decryptor(keyPair.publicKey);
    encryptor = await Encryptor(keyPair.publicKey);

    return Object.freeze({
        publicKey: keyPair.publicKey,
        encrypt: (msg) => {
            return encryptor.encrypt(msg);
        },
        decrypt: (ciphertext, nonce) => {
            return decryptor.decrypt(ciphertext, nonce);
        }
    });
};