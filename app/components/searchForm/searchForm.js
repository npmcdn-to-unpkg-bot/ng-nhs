import angular from 'angular'

var controller = ($scope,$log) => {

	$scope.regex = '^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$'
	
	$scope.types = [
		{
		  id: 1,
		  label: 'Hosptials',
		  value: 'hosptial'
		},
		{
		  id: 2,
		  label: 'Clinics',
		  value: 'clinics'
		},
		{
		  id: 3,
		  label: 'Social Care',
		  value: 'social_care'
		},
		{
		  id: 4,
		  label: 'Pharmacies',
		  value: 'pharmacies'
		},
		{
		  id: 5,
		  label: 'GP Surgeries',
		  value: 'gp_surgeries'
		}
	];

	$scope.selected = $scope.types[0];

	$scope.submit = () => {
		$scope.$parent.search($scope.postcode,$scope.selected); //bindings not working
	}

}

const searchForm = angular.module('app.searchForm', [])
searchForm.component('searchForm', {
  controller: controller,
	template: require('components/searchForm/searchForm.html')
});

export default searchForm