app.controller("LoginController", function($scope, $http, $location, $rootScope, Auth)
		{
			var authenticate = function(credentials, callback)
			{
				var headers = credentials ? {authorization : "Basic " 
					+ btoa(credentials.username + ":" + credentials.password)} : {};
					
				$http.get('logUser', {headers : headers}).success(function(response)
						{
							if(response.name)
							{
								Auth.setUserName(response.name);
								Auth.setAuthority(response.authorities[0]["authority"]);
								console.log(Auth.getAuthority());
							}
							
							callback && callback();
						}).error(function(){
							callback && callback();
						});
			}
			
			authenticate();
			$scope.credentials = {};
			$scope.login = function()
			{
				authenticate($scope.credentials, function(){
					if(Auth.isLoggedIn())
					{
						
						if(Auth.getAuthority() == "ROLE_ADMIN")
						{
							$location.path("/admin/home");
						}
						else if(Auth.getAuthority() == "ROLE_USER")
						{
							$location.path("/user/home");
						}
						$scope.error = false;
						authenticated = true;
					}
					else
					{	
						$location.path("/login");
						$scope.error = true;
					}
				});

			};

		});