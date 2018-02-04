app.controller("UserListController", function($scope, $http, Logout)
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
		})
	}
	
	$scope.logout = function()
	{
		Logout.go();
	}
})