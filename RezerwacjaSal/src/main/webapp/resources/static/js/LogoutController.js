app.controller("LogoutController", function($scope, $http, $location, $rootScope){
	
	$scope.logout = function()
	{
		$http.post("logout").success(function(){
    		$rootScope.authenticated = false;
    		$rootScope.username = undefined;
    		$location.path("/");
    	}).error(function(){
    		$rootScope.authenticated = false;
    		$rootScope.username = undefined;
    	});
	}
});