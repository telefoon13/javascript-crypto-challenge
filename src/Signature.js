const nacl = require('libsodium-wrappers');

let keyPair = null;

function createKeyPair(){
    keyPair = nacl.crypto_sign_keypair();
}

module.exports = async () => {
    await nacl.ready;

    createKeyPair();

    return Object.freeze({
        verifyingKey: keyPair.publicKey,
        sign: (msg) => {
            return nacl.crypto_sign(msg, keyPair.privateKey)
        }
    })
};