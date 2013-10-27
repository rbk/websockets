var myApp = angular.module('myApp', []); // No dependencies, hence the empty array

// A factory is a service you can inject into a controller

// This would be good for building api's
myApp.factory('Data', function(){
	return { fname: "Richard", lname: "Keller", alpha: "abcdefghijklmnopqrstuvwxyz" };
});


// Filters are awesome
myApp.filter('reverse', function(Data){
	return function( text ) {
		return text.split("").reverse().join("");
	}
})


// Learn tests later



function firstCtrl( $scope, Data ){
	$scope.data = Data;
}
function secondCtrl( $scope, Data ){
	$scope.data = Data;
}


var socket = io.connect('htt://localhost');


    
socket.on('welcome2', function( data ){
    
});

document.getElementById('sendMessage').addEventListener('click', function(){
    
//    document.forms['message'].focus();
    document.forms['sendMessage'].elements[0].value = "test";
    document.forms['sendMessage'].elements[0].focus;
    return false;
})

//console.log( document.forms['sendMessage'].elements[0].value = "test" )

//(function(){
//    console.log( 'Auto called function?' ) 
//})

//document.forms['sendMessage'].elements['mytextfield'].focus();
//console.log( document.forms )
console.log( document.forms ['sendMessage'].elements )

// var socket = io.connect('http://localhost');
//  socket.on('news', function (data) {
//    console.log(data);
//    socket.emit('my other event', { my: 'data' });
//  });

