const JSEncrypt = require("jsencrypt/bin/jsencrypt");
const CryptoJS = require("crypto-js");

function signRating(rating, stream){
    const sign = new JSEncrypt();
    sign.setPrivateKey(stream.private_key);
    const timestamp = Date.now();
    const signature = sign.sign(rating + timestamp, CryptoJS.SHA256, "sha256");

    const ratingWithSig = {
        mark: rating,
        username: stream.username,
        stream: stream.streamKey,
        signature: signature,
        timestamp: timestamp,
    };

    return ratingWithSig;
}

function verifyRating(rating){
    const verify = new JSEncrypt({default_key_size: 512});
    verify.setPublicKey("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzxTYmXtM/LiTlAbW3WQU0NklbXCeKlLVe9M4HaMNqSfG/g+ICoCQ2SDYC5nTAyNWpHQospihuZDrwQQ8Qhz3nQ/Gll7kwHvSVbC9W+BLWv6zUwAzG/nNENgQvX8/7s0yScgmbBZVHfNyYAzIxOMLXFeVtWcEqteGk/UFTprsA8ay8YvugOzsBUWeIC96cYo6OZiIm5T9LPA7KFKHuxX6wqgYNZorySfVc2dJ8KAFd9sf/RSOYt+sxZBpAHAOhcBr/9WhS5X8ZkQT5PIV361uNDhSJmjc7q0oGBM90laqACYNcByik8Em/DWx1fKByjEEdxb2Oqklm6pmKdMk1UcJMQIDAQAB-----END PUBLIC KEY-----");
    const verified = verify.verify(rating.rating + rating.timestamp, rating.signature, CryptoJS.SHA256);

    return verified;
}

module.exports = {
    signRating,
    verifyRating
};
