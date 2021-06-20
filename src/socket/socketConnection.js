const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const streamName = document.getElementById('stream-name');
const userList = document.getElementById('users');

const io = require("socket.io-client");
const JSEncrypt = require('jsencrypt/bin/jsencrypt');
const CryptoJS = require("crypto-js");
let socket;
let exports = {};
let stream;
exports.establishConnection = (that) => {
    var connectionOptions =  {
        "force new connection" : true,
        "reconnectionAttempts": "Infinity", 
        "timeout" : 10000,                  
        "transports" : ["websocket"]
    };

    stream = that;
    socket = io("http://localhost:3000", connectionOptions);
    const userid = Math.floor(Math.random() * 10000001);
    const streamId = Math.floor(Math.random() * 11);
    socket.emit('joinstream', { "username": userid.toString(), "stream": streamId});

    while (stream.items.length) {
      stream.items.pop();
    }

    socket.on('message', (message) => {
      const lastMessage = stream.items[stream.items.length - 1];

      const messageToAdd = 
      {
        _id: stream.items.length + 1,
        name: message.username,
        date: message.time,
        dateWithMilliSeconds: message.timeWithMilliSeconds,
        message: message.text,
      };

      if (stream.items.length === 0) {
        stream.items.push(messageToAdd);
      } else if (lastMessage !== undefined) {
        if (lastMessage.dateWithMilliSeconds !== message.timeWithMilliSeconds) {
          stream.items.push(messageToAdd);
        }
      }
    });

    socket.on('streamUsers', ({ streamFromServer, users }) => {
      stream.stream.viewers = users.length.toString();
    });
};

exports.sendMessageToServer = (message) => {
  if (!message) {
    return false;
  }

  const sign = new JSEncrypt();
  sign.setPrivateKey("-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQDLfU6pzx5ytxZVO4S8SXaW9p0NKp/PTZwVCU//BdeZQNjO88/9Q35qkvP/pJ0O3shI3EKStQPobFDmPqjta50GDFdFA3hzuumj+zUSQumKCznBcAL2qEVXPYYbk25MFePYQXgf6d7yleSGilECUCpfDT13JwxqBkrxEbeebc/4gQIDAQABAoGBAJ3nC66bSQ5NYmgbOmH9Q6fbkH0SEVaE69QrGMdVGjsS5eqZqVDnGebLR8mdTD6ow5Q+Tu6WxoSJ4LD5+I3bjskqaIdjiQKgLNzAC2JBGPafFz78S/TPQHTXVpzQ20WXSX9Kq73FlM2FkuE8QA/8GySTDRsXFBg35s2SJKRdaqkBAkEA9royBNKoiXmLooTjqAUMSqEN/3c1/98oAdFy2v7XnB2U9/AJzzG/ZaS4MEDDD5XGZk8RYggCbpTzHCF3688hsQJBANMjHQgzM2TykIq0XmecZEzxXjZvQ9xgyaUMWq1e0MzMaAYgklWuaFb5IXs3IgeOOZcuhNaIyQJRtDKTkMIrp9ECQQCJtnvcvUhdE36hA9OeINMvhJ2vjfaSDxjhiuq02bG27bwMd+rBv165eStlo4A83riSumdVdGsHFhRsCzJIaKDBAkEAsSo1ojvUVFB1mO3giXBheW7Pbz3N444TpbrIG9IDwtWCNCIAqITAaLqDrbCFjXF6QbF3Jc2BXcDRQ98vCL85AQJAU+F21l+e5S0OrX82d8aw2yvjljdRSIxlwulHdWn5SURnsQgP/kSXypv5bf1ovzVWQgbt9Ek9ROQvcH7MDXVTuA==-----END RSA PRIVATE KEY-----");
  const timestamp = Date.now();
  const signature = sign.sign(message + timestamp, CryptoJS.SHA256, "sha256");

  const messageWithSig = {"message": message, "signature" :signature, "timestamp": timestamp}

   socket.emit('chatMessage', messageWithSig);
};

exports.disconnect = () => {    
  socket.emit('disconnectUserFromStream', socket.id);
};

function formatDate(date){
  date = date.split(' ')[0] + " " + date.split(' ')[1]; 
  return date;
}

export default exports;