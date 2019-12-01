const nacl = require('libsodium-wrappers');

let myKey = null;

function setKey(key){
    if(!key){
        throw 'no key'
    } else {
        myKey = key
    }
}

module.exports = async (key) => {
    await nacl.ready;

    setKey(key);

    return Object.freeze({
        encrypt: (ciphertext, nonce) => {
            return nacl.crypto_secretbox_easy(ciphertext, nonce, key);
        }
    })
};