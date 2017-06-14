var socket = io();
var channel = 'Channel' + 2;

$('form').submit(function() {
    var usersPost = $('#two');
    if (usersPost) {
        socket.emit('public', usersPost.val());
        userPost.val('');
        return false;
    };
});



socket.on('public', function(msg) {
    var div = $('<div>');
    div.addClass('three');
    
    $('#messages').prepend()
});
