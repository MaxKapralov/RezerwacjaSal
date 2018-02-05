var app = angular.module('app', ['ngRoute','ngResource', 'ngMessages']);
app.constant("baseUrl", "http://localhost:8080/RezerwacjaSal");
var authenticated;

app.config(function($routeProvider, $locationProvider, $httpProvider){
    $routeProvider
        .when('/', { redirectTo: '/login'})
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
        .when("/admin/list",{
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
        	templateUrl: "resources/static/views/userHome.html",
        	controller: "UserHomeController"
        })
        .when("/user/bookRoom",{
        	templateUrl: "resources/static/views/bookRoom.html",
        	controller: "BookRoomController"
        })
        .otherwise(
            { redirectTo: '/login'}
        );
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //$locationProvider.html5Mode(true);
});

app.run(function($rootScope, $location, Auth){
	$rootScope.$on('$routeChangeStart', function(event){
		if(!Auth.isLoggedIn())
		{
			if($location.path() == "/login") return;
			else if($location.path() == "/registration") return;
			$location.path("/");
		}
		else
		{
			if($location.path().includes("/admin") && Auth.getAuthority() == "ROLE_USER")
				$location.path("/user/home");
			else if($location.path().includes("/user") && Auth.getAuthority() == "ROLE_ADMIN")
				$location.path("/admin/home");
		}
		
	});
});


