var socket = io.connect();
function singleChat( $scope, socket ){
    
    $scope.userName = "test";
    $scope.messages = [{"name":"Bot", "content":"Welcome to chat."}];
    
    $scope.sendMessage = function(){
        
        var board = document.getElementById('message_board'),
            message = document.forms['sendMessage'].elements['message'].value,
            object = {"name" : $scope.userName, "content" : message};
        
        document.forms['sendMessage'].elements['message'].focus();
        document.forms['sendMessage'].elements['message'].value = "";
        
        $scope.messages.push( object );
        socket.emit('send', object );
        
        board.scrollTop = board.scrollHeight;
    };
    socket.on( 'converse', function(data){
        $scope.messages.push(data); 
    });
}

function ticTacToeCtrl( $scope, socket ){
    $scope.addMark = function(index){
        console.log( index );
        console.log( $scope.squares[index] );
    }
    $scope.squares = [1,2,3,4,5,6,7,8,9];
    
}

app.controller('testCtrl',function($scope){
    
    
     
});