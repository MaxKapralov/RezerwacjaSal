app.controller("AdminAddNewUserController", function($scope, $filter, User, $location, Logout)
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
					$location.path("/admin/addNewUser");
					$scope.added = true;
				}, function()
				{
					console.log("User could not be saved");
					$location.path("/admin/addNewUser");
				})
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