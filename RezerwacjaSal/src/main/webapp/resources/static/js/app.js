var app = angular.module('app', ['ngRoute','ngResource', 'ngMessages']);
app.constant("baseUrl", "http://localhost:8080/RezerwacjaSal");
var authenticated;

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
        .when("/admin/bookRoom",{
        	templateUrl: "resources/static/views/bookRoom.html",
        	controller: "BookRoomController"
        })
        .when("/admin/myConfirm", {
        	templateUrl: "resources/static/views/myConfirm.html", 
        	controller: "ConfirmController"
        })
        .when("/user/home", {
        	templateUrl: "resources/static/views/userHome.html"
        })
        .otherwise(
            { redirectTo: '/'}
        );
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);
});


