const CryptoJS=require('crypto-js');
require('../config/config');

const encrypt=async function(plaintext){
    let ciphertext=CryptoJS.AES.encrypt(plaintext.toString(),CONFIG.secretKey).toString();
   return ciphertext;
};
module.exports.encrypt=encrypt;

const decrypt=async function(ciphertext){
    let bytes=CryptoJS.AES.decrypt(ciphertext.toString(),CONFIG.secretKey);
    let plaintext=bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
};
module.exports.decrypt=decrypt;
