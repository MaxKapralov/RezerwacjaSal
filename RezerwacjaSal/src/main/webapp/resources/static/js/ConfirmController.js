app.controller("ConfirmController", function($scope, $http, $location, Logout){
	
	getRooms();
	
	function getRooms()
	{
		$http({
			method: "GET",
			url: "getConfirms"
		}).success(function(response){
			console.log(response);
			$scope.rooms = response
		});
	}
	
	$scope.accept = function(id, idUser)
	{
		$http({
			method: "POST",
			url: "acceptBook",
			params: {id: id, idUser: idUser}
		}).success(function(){
			$location.path("/admin/myConfirm");
			$scope.accepted = true;
		});
	}
	
	$scope.block = function(id, idUser)
	{
		$http({
			method: "POST",
			url: "blockBook",
			params: {id: id, idUser: idUser}
		}).success(function(){
			$location.path("/admin/myConfirm");
			$scope.blocked = true;
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