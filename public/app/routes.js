/**
 * Main Public Routing File
 */

var app = angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider){
       //When the users type in the default location, provide them a file we want to provide them
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
        })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/contact', {
                templateUrl: 'app/views/pages/contact.html'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html',
                authenticated: false
            })
            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register',
                authenticated: false
            })
            .when('/privacy',{
                templateUrl: 'app/views/pages/legal/privacy.html'
            })
            /**
             * Logged in Routes
             * Have authenticated: true, this makes routes only accessible when logged in - ie navigating to route/logout will return to home page if not logged in
             */
            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html',
                authenticated: true
            })
            .when('/myGuild',{
                templateUrl: 'app/views/pages/users/account/myGuild.html',
                controller: 'guildCtrl',
                controllerAs: 'guild',
                authenticated: true
            })
            .when('/myHeroes',{
                templateUrl: 'app/views/pages/users/account/myHeroes.html',
                controller: 'adventurerCtrl',
                controllerAs: 'adventurers',
                authenticated: true
            })
            .when('/myMarketplace',{
                templateUrl: 'app/views/pages/users/account/myMarketplace.html',
                controller: 'adventurerCtrl',
                controllerAs: 'adventurers',
                authenticated: true
            })
            .when('/myAccount',{
                templateUrl: 'app/views/pages/users/account/myAccount.html',
                authenticated: true
            })
            .when('/battleMap',{
                templateUrl: 'app/views/pages/users/account/battleMap.html',
                controller: 'adventurerCtrl',
                controllerAs: 'adventurers',
                authenticated: true
            })
            .when('/leaderboard',{
                templateUrl: 'app/views/pages/users/account/leaderboard.html',
                controller: 'leaderCtrl',
                controllerAs: 'leaderboard',
                authenticated: true
            })

            /**
             * Administrator Routes
             * Have authenticated: true, this makes routes only accessible when logged in - ie navigating to route/logout will return to home page if not logged in
             */
            .when('/adventurerManagement',{
                templateUrl: 'app/views/pages/admin/adventurerManagement.html',
                administrator: true
            })
            .when('/userManagement',{
                templateUrl: 'app/views/pages/admin/userManagement.html',
                administrator: true
            })

            /**
             * If unknown url typed, forces to homepage route - catchall
             */
            .otherwise({
                redirectTo: '/'
            });
        //$locationProvider allows you to rebase the url, so that you don't get localhost:8080/#/home.html but rather localhost:8080/home.html
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

/**
 * Route Controls - manages the authenticated system, limiting routing to relevant users depending on their state (signed in)
 */
app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        if(next.$$route.authenticated == true){                 //If the route needs authentication
            if(!Auth.isLoggedIn()){                             //If the user is not logged in
                event.preventDefault();                         //Prevent them going to the templateUrl route (ie the default route)
                $location.path('/');                            //Send them to the homepage
            }
        }
        else if(!next.$$route.authenticated == false){          //If the route doesn't need authenication
            if(Auth.isLoggedIn()){                              //If the user is logged in
                event.preventDefault();                         //Prevent them going to the templateUrl route (ie the default route)
                $location.path('/')                             //Send them to the homepage
            }
        }
        else if(!next.$$route.administrator == true){          //If the route doesn't need authenication
            if(!Auth.isAdministrator()){                        //If the user is not admin
                event.preventDefault();                         //Prevent them going to the templateUrl route (ie the default route)
                $location.path('/')                             //Send them to the homepage
            }
        }

    });
}]);
