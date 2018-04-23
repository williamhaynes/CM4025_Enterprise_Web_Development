/**
 * Main Configuration File for app
 * Creates the user App module for index.html, and pulls in supporting appRoutes module from routes.js
 * Create angular module('nameOfModule', [Dependencies]) - Dependencies, anything that you want to use and inject, animations, cookies etc
 */

angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authorizationServices', 'adventurerController', 'adventurerServices', 'guildController', 'guildServices', 'leaderController', 'leaderboardServices'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});