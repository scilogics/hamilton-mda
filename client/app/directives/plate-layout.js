/**
 * Plate Directive
 */

angular
	.module('hamiltonApp')
	.directive('pltLayout', pltLayout);
	
function pltLayout() {
	var directive = {
		transclude: true,
		template: '<div class="grid col-lg-6 col-md-6 col-sm-6" ng-transclude></div>',
		restrict: 'EA'
	};
	return directive;
	
	function link(scope, element, attrs) {
        /* */
    }
};