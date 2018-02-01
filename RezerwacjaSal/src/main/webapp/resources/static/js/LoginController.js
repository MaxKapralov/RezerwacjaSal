app.controller("LoginController", function($scope, $http, $location, $rootScope)
		{
			var authenticate = function(credentials, callback)
			{
				var headers = credentials ? {authorization : "Basic " 
					+ btoa(credentials.username + ":" + credentials.password)} : {};
					
				$http.get('logUser', {headers : headers}).success(function(response)
						{
							if(response.name)
							{
								$rootScope.authenticated = true;
								$rootScope.username = response.name;
								console.log("Data success ");
								$rootScope.authority = response.authorities[0]["authority"];
							}
							else
							{
								$rootScope.authenticated = false;
								console.log("Data error " + response);
							}
							callback && callback();
						}).error(function(){
							console.log("Error");
							$rootScope.authenticated = false;
							callback && callback();
						});
			}
			
			authenticate();
			$scope.credentials = {};
			$scope.login = function()
			{
				authenticate($scope.credentials, function(){
					if($rootScope.authenticated)
					{
						if($rootScope.authority = "ROLE_ADMIN")
						{
							$location.path("/admin/home");
							$rootScope.authority = "";
						}
						else if($rootScope.authority = "ROLE_USER")
						{
							$location.path("/user/home");
							$rootScope.authority = "";
						}
						$scope.error = false;
					}
					else
					{	
						$location.path("/login");
						$scope.error = true;
					}
				});
				
				/*$http({
					url: "/ISRSK2/getUserWithLogin",
					method: "GET",
					params: {username: $scope.credentials.username}
				}).success(function(response){
					console.log("Success " + response);
				}).error(function(response){
					console.log("Error " + response);
				});*/
			};

		});