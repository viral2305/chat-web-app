var CryptoJS = require("crypto-js");
const {secret_key} = require("./config");

 const to_Encrypt = (text) => {
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(text),secret_key).toString();
    return encrypted;
};
 const to_Decrypt = (cipher) => {
    var decrypted = CryptoJS.AES.decrypt(cipher,secret_key);
    var decryptedData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};

module.exports = {
    to_Encrypt,
    to_Decrypt,
};