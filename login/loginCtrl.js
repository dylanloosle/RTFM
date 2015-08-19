var app = angular.module('rtfmApp');

app.controller('loginCtrl', function($scope, threadService, $location){

    var loginCallback = function(user){
        user.uid = user.uid.replace('simplelogin:', '');
        $location.path('/dashboard/' + user.uid)
    };

    $scope.login = function(){
        return threadService.login($scope.details, loginCallback);
    };

    $scope.register = function(){
        return threadService.register($scope.details, loginCallback);
    };

    $scope.status = 'Register';

    $scope.showReg = function(){
        if($scope.status === 'Register'){
            $scope.status = 'Login';
        } else {
            $scope.status = 'Register';
        }
        $scope.reg = !$scope.reg;
    };
});

