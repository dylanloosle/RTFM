var app = angular.module('rtfmApp');

app.service('threadService', function($http, $q, fb, $firebaseAuth){
    var firebaseRef = new Firebase('https://testingfir.firebaseio.com/');
    var authObj = $firebaseAuth(firebaseRef);

    this.getThreads = function(){
        return new Firebase (fb.url + '/threads');
    };

    this.getThread = function(threadId){
        return new Firebase (fb.url + '/threads/' + threadId);
    };

    this.getComments = function(threadId){
        return new Firebase (fb.url + '/threads/' + threadId + '/comments');
    };

    this.login = function(user, cb){
        authObj.$authWithPassword({
            email: user.email,
            password: user.password
        }).then(function(authData){
            console.log('Logged In! User ID: ' + authData.uid);
            cb(authData);
        }).then(function(err){
            switch (err.code){
                case "INVALID_EMAIL":
                    return 'Invalid e-mail!';
                case "INVALID_PASSWORD":
                    return "Invalid password!";
                default:
                    return "Success!"
            }
        })

    };

    this.register = function(user, cb){
        authObj.$createUser({
            email: user.email,
            password: user.password
        }).then(function(userObj){
            console.log('User created successfully!');
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            });
        }).then(function(authData){
            if(authData){
                authData.timestamp = new Date().toISOString();
                firebaseRef.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
                cb(authData);
            }
            else{
                console.log('Error');
            }
        }).catch(function(error){
            switch(error.code) {
                case "EMAIL_TAKEN":
                    console.log('The new user account cannot be created because the email is already in use.');
                    break;
                case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                default:
                    console.log("Error creating user:", error);
            }

        })

    }

});