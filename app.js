var app = angular.module('rtfmApp', ['firebase', 'ngRoute']);

app.constant('fb', {
    url: 'https://testingfir.firebaseio.com/'
});
app.config(function($routeProvider){
    $routeProvider
        .when('/login', {
            templateUrl: '/JavaScript/RTFM/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/threads', {
            templateUrl: '/Javascript/RTFM/threads/threads.html',
            controller: 'threadsCtrl',
            resolve: {
                threadsRef: function(threadService){
                   return threadService.getThreads();
                }
            }
        })
        .when('/threads/:threadId', {
            templateUrl: '/Javascript/RTFM/threads/thread.html',
            controller: 'threadCtrl',
            resolve: {

                threadRef: function (threadService, $route) {
                    return threadService.getThread($route.current.params.threadId);


                },
                commentsRef: function (threadService, $route) {
                    return threadService.getComments($route.current.params.threadId);
                }

            }
        })
        .otherwise({
            redirectTo: '/threads'
        })


});