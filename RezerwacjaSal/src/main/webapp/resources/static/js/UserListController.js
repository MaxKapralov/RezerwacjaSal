app.controller("UserListController", function($scope, $http)
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
})