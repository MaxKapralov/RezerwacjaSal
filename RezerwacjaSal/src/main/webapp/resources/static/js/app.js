var app = angular.module('app', ['ngRoute','ngResource', 'ngMessages']);
app.constant("baseUrl", "http://localhost:8080/RezerwacjaSal");
var username;
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
        	controller: "AdminController"
        })
        .when('/admin/addRoom',{
        	templateUrl: "resources/static/views/addRoom.html",
        	controller: "AddRoomController"
        })
        .when('/admin/userList',{
        	templateUrl: "resources/static/views/userList.html",
        	controller: "UserListController"
        })
        .when("/admin/addNewUser",{
        	templateUrl: "resources/static/views/adminAddNewUser.html",
        	controller: "AdminAddNewUserController"
        })
        .when("/admin/delRoom",{
        	templateUrl: "resources/static/views/delRoom.html",
        	controller: "DelRoomController"
        })
        .otherwise(
            { redirectTo: '/'}
        );
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);
});

