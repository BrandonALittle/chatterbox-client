// YOUR CODE HERE:
//http://parse.hrr.hackreactor.com/chatterbox/classes/messages/

// POST FORMAT:
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// $.get('http://parse.hrr.hackreactor.com/chatterbox/classes')
// Figure out postman
// Spec runner
// Ajax method for jquery
// Get, post requests

// example POST request:
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

//chatterbox/classes/messages/roles/<objectId>

var app = {};
app.init = function() { // standard node function called to intialize your app
  // set the event listeners
  this.server = 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages';
  $('#send').on('submit', app.handleSubmit);
  app.$rooms = $('chatrooms');
};

app.send = function(message) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: this.server,
    type: 'GET',
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received', data);
      app.renderMessages(data);// trigger an event -> put the messgage to our screen
    },
    error: function (data) {
      console.error('chatterbox: Failed to get message', data);
    }
  });
};



// app.send(message);
// var message = {
//   username: 'Mel Gibson',
//   text: 'It\'s good to be the king of applesauce',
//   roomname: 'lobby'
// };

// //  VARIOUS AJAX ATTEMPTS TO DO IT
//  $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
//     type: 'GET',
//     data: {"order": "-createdAt"},
//     where: {"username":"notjoe"},
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

//clear messages from the dom
app.clearMessages = function() {
  let $chats = $('#chats');
  $chats.children().remove();
};

app.renderMessages = function(object) {

  console.log(object);
  let messages = object.results;
  messages.forEach(function(message) {
    app.renderMessage(message);
  });
};
app.renderMessage = function(message) { // takes in a message object
//createdAt: "2018-01-27T19:01:00.778Z"
//objectId:"wPH1OAjO4C"
//roomname:lobby"
//text:"Your dog is barking Norbie"
//updatedAt:"2018-01-27T19:01:00.778Z"
//username:"the neighbors"
  let timeStamp = message.createdAt;
  let messageText = message.text;
  let username = message.username;
  let $message = $('<li class="message"></li>'); // create a list item
  $message.text(messageText);
  $('#chats').append($message); // render the the $("#chat").""" insert it """

  // and then insert it at end of list
};
app.renderRoom = function(roomname) {
  let $room = $(`<option class="room" value="${roomname}"></option>`);
  $room.text(roomname);
  app.$rooms.append($room);

};
app.handleUsernameClick = function() {

};

app.handleSubmit = function(event) {

  let username = window.location.search.substring(9);
  let messageText = $('.chatInput').val();
  let message = {
    username: username,
    text: messageText,
    roomname: 'lobby'
  };
  app.send(message);
  $('.chatInput').val('');
  event.preventDefault();
};

app.init();

