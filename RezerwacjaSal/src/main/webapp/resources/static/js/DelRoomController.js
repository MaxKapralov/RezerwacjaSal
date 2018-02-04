app.controller("DelRoomController", function($scope, $http, Logout){
	
	getAllRooms();
	$scope.deleted = false;
	function getAllRooms()
	{
		$http({
			method: "GET",
			url: "getAllRooms"
		}).success(function(response){
			$scope.rooms = response;
		})
	}
	$scope.del = function(id)
	{
		$http({
			method: "POST",
			url: "delRoomWithId",
			params: {id: id}
		}).success(function(){
			$scope.deleted = true;
		})
	}
	
	$scope.logout = function()
	{
		Logout.go();
	}
	
});