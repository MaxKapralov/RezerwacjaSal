app.controller("RegistrationFormController", function($scope, $filter, User, $location)
		{
			$scope.userRole = false;
			$scope.login = function()
			{
				$location.path("/login");
			}
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
						role: "ROLE_USER"
						};
				console.log(newUser);
				User.save(newUser, function()
				{
					console.log("User saved");
					$location.path("/login");
					$scope.added = true;
				}, function()
				{
					console.log("User could not be saved");
					$location.path("/registration");
				})
			}
			
		});