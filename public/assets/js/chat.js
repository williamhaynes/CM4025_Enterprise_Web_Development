/**
 * This class supports the chat function within the application
 */

jQuery(function($) {
    var socket= io.connect();
    var $messageForm =$('#send-message');
    var $messageBox =$('#message');
    var $chat =$('#messages');
    var textContent = $('#chatUsername').text().substring(0,10);
    //console.log('Chat connected');


    $messageForm.submit(function(e){
        console.log('button Pressed');
        //console.log($messageBox.val);
        e.preventDefault();
        socket.emit('new user', textContent);
        socket.emit('send message', $messageBox.val());      //send message
        $messageBox.val('');                                   //clear message
    });

    socket.on('new message', function(data){
        //console.log('I should be adding a message to chat');
        $chat.append("<div><p style=\"color:blue;display:table-cell;width:80px\">" + data.nick + ": </p><p style=\"color:white;margin:0px;word-break:break-all;display:table-cell;text-align:left !important;padding-left:4px;\">" + data.msg+"</p></div>");
        $chat.scrollTop($chat[0].scrollHeight);
    });
});