import _ from 'lodash'

var controller = ($scope, toastr, nhsFactory, GeoCoder, NavigatorGeolocation, $log) => {

	$scope.center = [51.5074,-0.1278]

	$scope.selectItem = (event, item) => {
		$scope.selectedItem = item;
	}

	$scope.search = (postcode,selected) => {
		GeoCoder.geocode({address: postcode + ', UK'}).then( (result) => {
	    $scope.center = [parseFloat(result[0].geometry.location.lat()),parseFloat(result[0].geometry.location.lng())]
	    nhsFactory.get(postcode, selected.value)
			.then(result => {
				$scope.items = result;
				toastr.success('Returned ' + result.length + ' result(s)', 'Success');
			}
			, error => {
				toastr.error(error.error, 'Error');
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