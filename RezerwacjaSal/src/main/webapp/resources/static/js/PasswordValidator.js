angular.module("app").directive("securePassword", function(){
	return{
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl)
		{
			function myPasswordValidation(ngModelValue)
			{
				if(/[A-Z]/.test(ngModelValue))
					ctrl.$setValidity("upperCaseLetter", true);
				else
					ctrl.$setValidity("upperCaseLetter", false);
				
				if(/[a-z]/.test(ngModelValue))
					ctrl.$setValidity("lowerCaseLetter", true);
				else
					ctrl.$setValidity("lowerCaseLetter", false);
				
				if(/[1-9]/.test(ngModelValue))
					ctrl.$setValidity("number", true);
				else
					ctrl.$setValidity("number", false);
				
				if(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(ngModelValue))
					ctrl.$setValidity("specialCharacter", true);
				else
					ctrl.$setValidity("specialCharacter", false);
				
				return ngModelValue;
			}
			
			scope.$watch(attr.ngModel, function(){
				validate();
			});
			
			attr.$observe("securePassword", function(val){
				validate();
			});
			var validate = function()
			{
				var val1 = ctrl.$viewValue;
				var val2 = attr.securePassword;
				
				ctrl.$setValidity("equals", val1 === val2);
			}
			
			ctrl.$parsers.push(myPasswordValidation);
		}
	};
});