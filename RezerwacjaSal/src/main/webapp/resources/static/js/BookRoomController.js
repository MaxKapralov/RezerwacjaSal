app.controller("BookRoomController", function($scope, $http, $filter, $rootScope){
	$scope.visibleHours = false;
	getAllRooms();
	
	function getAllRooms()
	{
		$http({
			method: "GET",
			url: "getAllRooms"
		}).success(function(response){
			$scope.rooms = response;
		})
	}
	
	$scope.getFreeHours = function(id, room)
	{
		var date = room.date;
		console.log($filter("date")(date));
		$http({
			method: "GET",
			url: "checkDate", 
			params:{id: id, date: $filter("date")(date)}
		}).success(function(response)
		{
			console.log(response);
			$scope.visibleHours = true;
			room.hours = response;
		});
	}
	
	$scope.bookRoom = function(room)
	{
		var id = room.id;
		var time = room.chosenHour;
		var date = room.date;
		console.log(room.aim);
		$http({
			url: "bookRoom",
			method: "POST",
			params: {idRoom : id, time: time, username: username, date: $filter("date")(date)},
			data: room.aim,
			headers: {"Content_type" : "text/plain"}
		}).success(function(response)
		{
			console.log("Zarezerwowano!");
			$scope.success = true;
		});
		
	}
	
})