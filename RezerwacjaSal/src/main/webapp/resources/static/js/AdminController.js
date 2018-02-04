app.controller("AdminController", function($scope, $rootScope, $location, $http, Auth, Logout){
	
	getCurlUser();
	var id;
	function getCurlUser()
	{
		$http({
			url: "curUser",
			params: {login : Auth.getUserName()},
			method: "GET"
		}).success(function(response){
			console.log(response);
			$scope.username = response.name + " " + response.surname;
			id = response.id;
		});
	}
	
	$scope.addRoom = function()
	{
		$location.path("/admin/addRoom");
	}
	$scope.delRoom = function()
	{
		$location.path("/admin/delRoom");
	}
	$scope.myConfirm = function()
	{
		$location.path("/admin/myConfirm");
	}
	$scope.bookRoom = function()
	{
		$location.path("/admin/bookRoom");
	}
	$scope.addNewUser = function()
	{
		$location.path("/admin/addNewUser");
	}
	$scope.userList = function()
	{
		$location.path("/admin/userList");
	}
	$scope.logout = function()
	{
		Logout.go();
	}
});
