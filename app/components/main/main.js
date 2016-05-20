import _ from 'lodash'

var controller = ($scope, nhsFactory, GeoCoder, NavigatorGeolocation) => {

	$scope.center = [51.5074,-0.1278]

	$scope.selectItem = (event, item) => {
		$scope.selectedItem = item.data;
	}

	$scope.search = (postcode,selected) => {
		GeoCoder.geocode({address: postcode + ', UK'}).then( (result) => {
	    $scope.center = [parseFloat(result[0].geometry.location.lat()),parseFloat(result[0].geometry.location.lng())]
	    nhsFactory.get(postcode, selected.value)
			.then(result => {
				$scope.items = result;
			}
			, error => {
				$scope.error = error;
			})
	  });
	}

}

const main = angular.module('app.main', [])
main.component('main', {
  controller: controller,
	template: require('components/main/main.html')
});

export default main