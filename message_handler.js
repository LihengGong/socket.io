var rabbitMQHandler = require('./rabbitMQ_messaging');

module.exports = messageHandler;

function messageHandler(io) {
  console.log('io.on');
  io.on('connection', websocketConnect);

  function websocketConnect(socket) {
    console.log('New connection');

    socket.on('disconnect', socketDisconnect);
    socket.on('message', socketMessage);

    function socketDisconnect(e) {
      console.log('Disconnect ', e);
    }

    function socketMessage(text) {
      var message = {text: text, data: new Date()};
      io.emit('message', message);
    }
  }

  function onMessageReceived(message) {
    io.emit('message', message)
  }
}
