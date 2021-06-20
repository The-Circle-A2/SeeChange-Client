const JSEncrypt = require("jsencrypt/bin/jsencrypt");
const CryptoJS = require("crypto-js");

function signMessage(message){
    const sign = new JSEncrypt();
    sign.setPrivateKey(
        "-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQDLfU6pzx5ytxZVO4S8SXaW9p0NKp/PTZwVCU//BdeZQNjO88/9Q35qkvP/pJ0O3shI3EKStQPobFDmPqjta50GDFdFA3hzuumj+zUSQumKCznBcAL2qEVXPYYbk25MFePYQXgf6d7yleSGilECUCpfDT13JwxqBkrxEbeebc/4gQIDAQABAoGBAJ3nC66bSQ5NYmgbOmH9Q6fbkH0SEVaE69QrGMdVGjsS5eqZqVDnGebLR8mdTD6ow5Q+Tu6WxoSJ4LD5+I3bjskqaIdjiQKgLNzAC2JBGPafFz78S/TPQHTXVpzQ20WXSX9Kq73FlM2FkuE8QA/8GySTDRsXFBg35s2SJKRdaqkBAkEA9royBNKoiXmLooTjqAUMSqEN/3c1/98oAdFy2v7XnB2U9/AJzzG/ZaS4MEDDD5XGZk8RYggCbpTzHCF3688hsQJBANMjHQgzM2TykIq0XmecZEzxXjZvQ9xgyaUMWq1e0MzMaAYgklWuaFb5IXs3IgeOOZcuhNaIyQJRtDKTkMIrp9ECQQCJtnvcvUhdE36hA9OeINMvhJ2vjfaSDxjhiuq02bG27bwMd+rBv165eStlo4A83riSumdVdGsHFhRsCzJIaKDBAkEAsSo1ojvUVFB1mO3giXBheW7Pbz3N444TpbrIG9IDwtWCNCIAqITAaLqDrbCFjXF6QbF3Jc2BXcDRQ98vCL85AQJAU+F21l+e5S0OrX82d8aw2yvjljdRSIxlwulHdWn5SURnsQgP/kSXypv5bf1ovzVWQgbt9Ek9ROQvcH7MDXVTuA==-----END RSA PRIVATE KEY-----"
    );
    const timestamp = Date.now();
    const signature = sign.sign(message + timestamp, CryptoJS.SHA256, "sha256");

    const messageWithSig = {
        message: message,
        signature: signature,
        timestamp: timestamp,
    };

    return messageWithSig;
}

function verifyMessage(msg){
    const verify = new JSEncrypt({default_key_size: 512});
    verify.setPublicKey("-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiR3875y761+typ4UH7qgDI+Rwyqkh9BiRydylaAvthjSJ1Uc8ywOLcwr4FxlpXuTufsxCW7FN44maY5kAD6KK2n85haJGnU5FgqYn30Jkzwbt8m9cxpUDn4oMP6kP/x0t/vfajfYcmhR+ljqzGEWezjJ0RF+QC2UIzRDZxV2liwIDAQAB-----END PUBLIC KEY-----");
    const verified = verify.verify(msg.message + msg.timestamp, msg.signature, CryptoJS.SHA256);

    return verified;
}

module.exports = {
    signMessage,
    verifyMessage
};