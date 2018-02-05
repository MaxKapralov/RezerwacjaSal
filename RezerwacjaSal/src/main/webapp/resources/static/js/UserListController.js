app.controller("UserListController", function($scope, $http, Logout, $location)
{
	getList();
	
	function getList()
	{
		$http({
			method: "GET",
			url: "userList"
		}).success(function(response){
			$scope.users = response;
			console.log(response);
		});
	}
	
	$scope.mainPage = function()
	{
		$location.path("/admin/home");
	}
	
	$scope.logout = function()
	{
		Logout.go();
	}
	
	
});