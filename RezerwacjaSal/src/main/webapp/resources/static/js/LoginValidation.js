angular.module('app').directive("isUniq", function($http){
	return{
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl)
			{
				function myLoginValidation(ngModelValue)
				{
					$http
					({
						url: "loginIsUniq",
						params: {login: ngModelValue},
						method: "GET"
					}).success(function(response){
						if(response == true)
							ctrl.$setValidity("uniqValidation", true);
						else
							ctrl.$setValidity("uniqValidation", false);
					});
					return ngModelValue;
				}
				ctrl.$parsers.push(myLoginValidation);			
			}
	};
});