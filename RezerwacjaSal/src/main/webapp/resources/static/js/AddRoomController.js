app.controller("AddRoomController", function($scope, $http, $location, Logout)
{
	$scope.addRoom = function()
	{
		$http({
			method: "POST",
			params: {location : $scope.room.location, permission : $scope.room.permission},
			url:"saveRoom"
		}).success(function(response){
			$scope.success = true;
			$scope.room.location = "";
			$location.path("/admin/addRoom");
		});
	}
	$scope.logout = function()
	{
		Logout.go();
	}
	
	$scope.mainPage = function()
	{
		$location.path("/admin/home");
	}
	
});
