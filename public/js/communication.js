(
  function(){
    var messsageInput = '#chat-input';
    var messageSubmit = '#chat-send';
    var messageList = '#chat-list';

    var socket = io();

    $(messsageInput).keyup(function(event) {
      if (event.keyCode === 13) {
        $(messageSubmit).click();
      }
    });

    $(messageSubmit).click(function() {

      var msg = $(messsageInput).val();
      if(!msg) {
        return;
      }

      sendMessage(msg);
      $(messsageInput).val('');
    });

    socket.on('message', displayMessage);

    function sendMessage(msg) {
      socket.emit('message', msg);
    }

    function displayMessage(msg) {
      $(messageList).append(getMessageHTML(msg));
    }

    function getMessageHTML(msg) {
      console.log(msg.data);
      return '<li class="chat-message"><strong>' + msg.text
             + '</strong>&nbsp;<i class=\"msg-date\">'
             + moment(new Date(msg.data)).format('MM/DD/YYYY, hh:mm:ss a')
             + '</i>'
             + '</li>';
    }
  }
)();
