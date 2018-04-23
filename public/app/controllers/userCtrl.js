/**
 *  User Controller related functions for registration
 */

angular.module('userControllers', ['userServices'])
.controller('regCtrl', function($http, $location, $timeout, User){
    var app = this;
        //Function for register button
        this.regUser = function(regData){

        /**
         * Registration form checks, before sending to server
         * Checks to ensure that password and emails match before sending to server
         */

        //Initialize variables
        var returnMsg = "";                         //String Variable for useful error messages
        var pMatch = false;                         //Boolean to store whether passwords match
        var eMatch = false;                         //Boolean to store whether emails match
        //Clear/set error/success message parameters
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;

        //If the form password field matches the confirm password field
        if(app.regData.password == app.regData.confirmPassword){
            //Make Boolean for passwords match true.
            pMatch = true;
        }
        //Else add text to String variable for return message
        else{
            returnMsg += "Passwords Don't Match";
        }

        //If the form email field matches the confirm email field
        if(app.regData.email == app.regData.confirmEmail) {
            //Make Boolean for email match true.
            eMatch = true;
        }
        //Else add text to String variable for return message
        else{
            returnMsg += " Email Don't Match";
        }

        /**
          * Try to Register the new user
          */

        //If passwords and emails match then attempt to register user
        if(pMatch && eMatch) {
            app.regData.guildname = app.regData.username + "'s Guild";
            User.create(app.regData).then(function(data){
                if(data.data.success){
                    //Create success message & show a loading bar
                    app.loading = false;
                    app.successMsg = data.data.message;
                    //console.log(app.regData.guildname);
                    //Redirect to the homepage after a Timeout
                    $timeout(function(){$location.path('/');}, 1000);
                } else {
                    //Create error message & show a loading bar
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }

            });
        }
        //Else return return message
        else{
            app.loading = false;
            app.errorMsg = returnMsg;
        }
    }
});