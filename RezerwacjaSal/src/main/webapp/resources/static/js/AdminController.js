app.controller("AdminController", function($scope, $rootScope, $location, $http){
	
	getCurlUser();
	var id;
	function getCurlUser()
	{
		$http({
			url: "curUser",
			params: {login : username},
			method: "GET"
		}).success(function(response){
			console.log(response);
			$scope.username = response.name + " " + response.surname;
			id = response.id;
		});
	}
});
