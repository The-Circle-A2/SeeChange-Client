const io = require("socket.io-client");

const {
  signMessage,
  verifyMessage
} = require('./rsaIntegrityHandler');

let socket;
let exports = {};
let stream;

exports.establishConnection = (that) => {
  var connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

    stream = that;
    //socket = io('ws://seechange-chat.the-circle.designone.nl:80', connectionOptions);
    socket = io('ws://localhost:3000', connectionOptions);
    socket.emit('joinstream', signMessage("", stream, stream.stream._id));

    while (stream.messages.length) {
      stream.messages.pop();
    }

    socket.on('message', (message) => {
      const verified = verifyMessage(message);

      if (verified) {
        if (message.message.stream === stream.stream._id) {
          const lastMessage = stream.messages[stream.messages.length - 1];

          const messageToAdd =
          {
            _id: stream.messages.length + 1,
            name: message.message.username,
            date: message.message.time,
            dateWithMilliSeconds: message.message.timeWithMilliSeconds,
            message: message.message.text,
            info: message.message.info
          };

          if (stream.messages.length === 0) {
            stream.messages.push(messageToAdd);
          } else if (lastMessage !== undefined) {
            if (lastMessage.dateWithMilliSeconds !== message.message.timeWithMilliSeconds) {
              stream.messages.push(messageToAdd);
            }
          }
        }
      }
    });

    socket.on('streamUsers', (message) => {
      if (verifyMessage(message)) {
        stream.stream.viewers = message.message.length.toString();
      }
    });
};

exports.sendMessageToServer = (message) => {
  if (!message) {
    return false;
  }

  socket.emit("chatMessage", signMessage(message, stream, stream.streamId));
};

exports.sendRatingToServer = (rating) => {
  if (!rating) {
    return false;
  }

  socket.emit("Rating", signMessage(rating, stream, stream.streamId));
};

exports.disconnect = () => {
  socket.emit('disconnectUserFromStream', signMessage(socket.id, stream, stream.streamId));
};

export default exports;
