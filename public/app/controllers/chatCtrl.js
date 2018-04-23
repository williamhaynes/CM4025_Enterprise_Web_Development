var chatConfig = require('./app/chat/chatConfiguration');       //Configuration Files

var chat = angular.module( 'BasicChat', ['chat'] )
    .controller( 'chat', [ 'Messages', '$scope', function( Messages, $scope ) {
        // Config
        var rltm = chatConfig.rltm;

        // Message Inbox
        $scope.messages = [];
        // Receive Messages
        Messages.receive(function(message) {
            $scope.messages.push(message);
        });
        // Send Messages
        $scope.send = function() {
            Messages.send({
                data: $scope.textbox
            });
    };
}]);