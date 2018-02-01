var app = angular.module('app', ['ngRoute','ngResource', 'ngMessages']);
app.constant("baseUrl", "http://localhost:8080/RezerwacjaSal");

app.config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
        .when('/', {
        	templateUrl: 'resources/static/views/home.html',
        	controller: 'HomeSectionController'
        })
        .when('/registration',{
        	templateUrl: 'resources/static/views/registration.html',
        	controller: 'RegistrationFormController'
        })
        .when('/login', {
        	templateUrl:'resources/static/views/login.html',
        	controller: 'LoginController'
        })
        .when('/admin/home', {
        	templateUrl:"resources/static/views/adminHome.html",
        	controller: "AdminHomeController"
        })
        .otherwise(
            { redirectTo: '/'}
        );
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);

});
