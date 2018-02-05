app.controller("UserHomeController", function($http, $scope, Logout, Auth, $location){
	getCurlUser();
	
	function getCurlUser()
	{
		$http({
			url: "curUser",
			params: {login : Auth.getUserName()},
			method: "GET"
		}).success(function(response){
			console.log(response);
			$scope.username = response.name + " " + response.surname;
		});
	}
	
	$scope.logout = function()
	{
		Logout.go();
	}
	
	$scope.mainPage = function()
	{
		$location.path("/user/home");
	}
	
	$scope.book = function()
	{
		$location.path("/user/bookRoom");
	}
	
});