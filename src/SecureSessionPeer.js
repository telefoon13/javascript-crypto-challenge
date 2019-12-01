const nacl = require('libsodium-wrappers');
modules.export = async (peer) => {
    await nacl.ready;

};