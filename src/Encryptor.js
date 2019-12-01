const nacl = require('libsodium-wrappers');

module.exports = async (key) => {
    await nacl.ready;
    if(!key){
        throw 'no key'
    }
    return Object.freeze({
        encrypt: (ciphertext, nonce) =>{
            return nacl.crypto_secretbox_easy(ciphertext,nonce,key);
        }
    })
};