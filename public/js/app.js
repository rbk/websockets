"use_strict";

var app = angular.module('chatApplication', []); // No dependencies, hence the empty array
var socket = io.connect('http://localhost');


// A factory is a service you can inject into a controller

// This would be good for building api's
app.factory('Data', function(){
	return { fname: "Richard", lname: "Keller", alpha: "abcdefghijklmnopqrstuvwxyz" };
});

app.factory('socket', function ($rootScope) {
 var socket = io.connect();
 return {
   on: function (eventName, callback) {
     socket.on(eventName, function () {  
       var args = arguments;
       $rootScope.$apply(function () {
         callback.apply(socket, args);
       });
     });
   },
   emit: function (eventName, data, callback) {
     socket.emit(eventName, data, function () {
       var args = arguments;
       $rootScope.$apply(function () {
         if (callback) {
           callback.apply(socket, args);
         }
       });
     })
   }
 };
});


// Filters are awesome
app.filter('reverse', function(Data){
	return function( text ) {
		return text.split("").reverse().join("");
	}
})


// Learn tests later



socket.on('welcome', function( data ){
        console.log( data.message )
});