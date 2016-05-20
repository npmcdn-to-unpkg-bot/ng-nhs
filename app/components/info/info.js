import angular from 'angular'

const info = angular.module('app.info', [])
info.component('info', {
	bindings: {
    item: '='
  },
  controller: () => {
		var ctrl = this;
	},
	template: require('components/info/info.html')
});

export default info