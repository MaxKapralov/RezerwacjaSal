app.factory('User', ['$resource', function($resource){
	return $resource('http://localhost:8080/ISRSK2/user/:id');
}]);
