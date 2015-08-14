var app = angular.module('rtfmApp');

app.service('threadService', function($http, $q, fb){
    var firebaseRef = new Firebase('https://testingfir.firebaseio.com/');
    this.getThreads = function(){
        return new Firebase (fb.url + '/threads');
    };

    this.getThread = function(threadId){
        return new Firebase (fb.url + '/threads/' + threadId);
    };

    this.getComments = function(threadId){
        return new Firebase (fb.url + '/threads/' + threadId + '/comments');
    }

});