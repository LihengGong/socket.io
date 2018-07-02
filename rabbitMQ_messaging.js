var amqp = require('amqplib/callback_api');

module.exports = rabbitMQMessages;

function rabbitMQMessages(address, callback) {
  amqp.connect(address, function amqpConnectCallback(err, conn) {
    if (err) {
      return callback(err);
    }

    console.log("in amqpConnectCallback");

    conn.createChannel(function(err, ch) {
      if (err) {
        return callback(err);
      }

      ch.assertExchange('messages', 'fanout', {durable: false});

      ch.assertQueue('', {exclusive: true}, function(err, q) {
        if (err) {
          return callback(err);
        }

        ch.bindQueue(q.queue, 'messages', '');

        var options = {
          emitMessage: emitMessage,
          onMessageReceived: onMessageReceived
        };

        ch.consume(q.queue, function(msg) {
          options.onMessageReceived(JSON.parse(msg.content.toString()));
        }, {noAck: true});

        callback(null, options);

        function emitMessage(message) {
          var str = JSON.stringify(message);
          console.log("In emitMessage");
          ch.publish('messages', '', Buffer.alloc(str.length, str));
        }

        function onMessageReceived() {
          console.log('Message received. Nothing to do.');
        }
      });


    });
  });
}
