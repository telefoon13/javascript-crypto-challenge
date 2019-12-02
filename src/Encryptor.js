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
        encrypt: (msg) => {
            let nonce = nacl.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES);
            return{ ciphertext: nacl.crypto_secretbox_easy(msg, nonce, key), nonce: nonce};
        }
    })
};