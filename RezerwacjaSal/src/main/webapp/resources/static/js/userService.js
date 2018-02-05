app.factory('User', ['$resource', function($resource){
	return $resource('http://localhost:8080/RezerwacjaSal/user/:id');
}]);

app.factory("Auth",function(){
	var userName;
	var authority;
	
	return{
		setUserName: function(aUser)
		{
			userName = aUser;
		}, 
		 isLoggedIn: function()
		 {
			 return true ? userName : flase;
		 }, 
		 setAuthority: function(author)
		 {
			 authority = author;
		 },
		 getAuthority: function()
		 {
			 return authority;
		 }, 
		 getUserName: function()
		 {
			 return userName;
		 }
	};
});

app.factory("Logout", function($http, $location, Auth){
	return{
		go: function(){
			$http.post("logout").success(function(){
    		Auth.setUserName(undefined);
    		Auth.setAuthority(undefined);
    		$location.path("/");
    	}).error(function(){
    		Auth.setUserName(undefined);
    		Auth.setAuthority(undefined);
    	});
		}
	};
});