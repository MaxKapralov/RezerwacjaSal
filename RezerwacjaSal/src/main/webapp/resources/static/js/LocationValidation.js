angular.module("app").directive("validLocation", function($http){
	return{
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){
			function myLocationValidation(value)
			{
				$http({
					method: "GET",
					url:"isLocationUniq",
					params: {location: value}
				}).success(function(response){
					if(response == true)
						ctrl.$setValidity("uniqLocation", true);
					else
						ctrl.$setValidity("uniqLocation", false);
				});
				return value;
			}
			ctrl.$parsers.push(myLocationValidation);
		}
	};
});