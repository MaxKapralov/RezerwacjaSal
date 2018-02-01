app.controller("HomeSectionController", function($scope, $location)
		{
			$scope.loginPage = function()
			{
				$location.path("/login");
			};
			$scope.registrationPage = function()
			{
				$location.path("/registration");
			}
			
		});