$(document).ready(function() {
    var socket = io();
    var onlineSocket;
    var user = $('#hidden').text().trim();
    var channel = 'online' + user;
    var channelReq = 'onlineReq' + user;
    var test = "test"
    socket.emit('status', user);


    socket.on(channel, function(users) {
        if (users.req === 'message') {
            console.log('Hello Kid');
        } else {
            for (var i = 0; i < users.length; i++) {
                var p = users[i].first_name + ' ' + users[i].last_name + '.';
                var img = "<img class='online' src='" + users[i].image + "'>";
                var div = "<div class='onlineUser'value ='" + users[i].MemberId + "''>" + img + p + "</div>";
                $('#san').append(div);

            }
        }
    });

    socket.on(user, function(user) {
        if (user.req === 'message') {
            var message = '<p>' + user.msg.message + '</p>';
            console.log(message);
            $('.messenger').append(message);
        } else {
            $('.modal-content').html('');
            var p = '<p>' + user.first_name + ' ' + user.last_name + '. </p>';
            var img = "<img class='onlineModel' src='" + user.image + "'>";
            var mssg = "<button class='messaging' value ='" + user.MemberId + "'> Message </button>"
            var div = "<div class='modal-content >" + img + p + "<div class='messenger'> <input reciever='" + user.MemberId + "' type='text' class='sendMessage'></div>" + mssg + "</div>";
            $('.modal-content').append(div);
            modal.style.display = "block";
        }
    });

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 


    // When the user clicks on <span> (x), close the modal
    $(document).on('click', '.onlineUser', function() {
        var socket = io();
        var friend = $(this).attr('value');
        var data = { 'userReq': friend, 'from': user }
        socket.emit('info', data);
    });

    span.onclick = function() {
        modal.style.display = "none";
    }

    $(document).on('click', '.messaging', function() {
        var socket = io();
        var text = $('.sendMessage').val();
        var reciever = $(this).val();
        var message = { 'message': text, 'from': user, 'to': reciever }
        socket.emit('Message', message)
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
