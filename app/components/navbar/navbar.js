import angular from 'angular'

const navbar = angular.module('app.navbar', [])
navbar.component('navbar', {
		template: require('components/navbar/navbar.html')
});

export default navbar