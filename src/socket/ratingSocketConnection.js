const io = require("socket.io-client");

const {
  signRating,
  verifyRating
} = require('./ratingIntegrityHandler');

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
    socket = io('ws://localhost:3001', connectionOptions);

    while (stream.rating.length) {
      stream.rating.pop();
    }

    socket.on('rating', (rating) => {
      const verified = verifyRating(rating);

      if (verified) {
        if (rating.rating.stream === stream.stream._id) {
          const lastRating = stream.rating[stream.rating.length - 1];

          const ratingToAdd =
          {
            _id: stream.rating.length + 1,
            name: rating.rating.username,
            date: rating.rating.time,
            dateWithMilliSeconds: rating.rating.timeWithMilliSeconds,
            rating: rating.rating.text,
            info: rating.rating.info
          };

          if (stream.rating.length === 0) {
            stream.rating.push(ratingToAdd);
          } else if (lastRating !== undefined) {
            if (lastRating.dateWithMilliSeconds !== rating.rating.timeWithMilliSeconds) {
              stream.ratings.push(rating);
            }
          }
        }
      }
    });
};

exports.sendRatingToServer = (rating) => {
  if (!rating) {
    return false;
  }

  socket.emit("Rating", signRating(rating, stream, stream.streamId));
};

exports.disconnect = () => {
  socket.emit('disconnectUserFromStream', signRating(socket.id, stream, stream.streamId));
};

export default exports;
