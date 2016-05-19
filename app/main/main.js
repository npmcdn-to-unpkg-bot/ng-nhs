import _ from 'lodash'

export default function($scope, $log, $state, nhsFactory, GeoCoder, NavigatorGeolocation) {

	$scope.isDone = false
	$scope.searchWithPostcode = false
	$scope.currentState = $state.current
	$scope.regex = '^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$'

	$scope.center = [0,0]

	$scope.search = () => {
		if($scope.selected){
			$scope.searchWithPostcode ? $scope.findPostcode() : $scope.findGeo()
		}
	}

	$scope.findGeo = () => {
		NavigatorGeolocation.getCurrentPosition()
   .then(function(position) {
     	var lat = position.coords.latitude
     	var lng = position.coords.longitude
     	$scope.center = [lat,lng];
     	GeoCoder.geocode({address: lat +', '+ lng}).then( (result) => {
     		nhsFactory.get(result[4].address_components[0].long_name,$scope.selected.value)
				.then(result => {
					$scope.items = result;
					$scope.isDone = true;
				}
				, error => {
					$scope.error = error;
					$scope.isDone = false;
				})
     	});
   });
	}

	$scope.findPostcode = () => {
		GeoCoder.geocode({address: $scope.postcode + ', UK'}).then( (result) => {
	    $scope.center = [parseFloat(result[0].geometry.location.lat()),parseFloat(result[0].geometry.location.lng())]
	    nhsFactory.get($scope.postcode,$scope.selected.value)
			.then(result => {
				$scope.items = result;
				$scope.isDone = true;
			}
			, error => {
				$scope.error = error;
				$scope.isDone = false;
			})
	  });
	}

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
		},
		{
		  id: 6,
		  label: 'Dental Practices',
		  value: 'dental_practices'
		},
	];

	$scope.selected = $scope.types[0];

	$scope.selectItem = function(){
		$scope.selectedItem = this.item.data;
	}

}
