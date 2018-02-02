app.controller("AdminAddNewUserController", function($scope, $filter, User, $location)
		{
			$scope.registration = function()
			{
				var newUser = {
						name: $scope.userName, 
						surname: $scope.userSurname,
						login: $scope.userLogin,
						password: $scope.userPassword,
						passAgain: $scope.passwordAgain,
						email: $scope.userEmail,
						birthday: $filter("date")($scope.userBirthday),
						role: $scope.role
						};
				console.log(newUser);
				User.save(newUser, function()
				{
					console.log("User saved");
					$location.path("/admin/home");
				}, function()
				{
					console.log("User could not be saved");
					$location.path("/admin/addNewUser");
				})
			}
			
		});