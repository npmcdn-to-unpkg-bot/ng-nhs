import angular from 'angular';
import toastr from 'angular-toastr'
import ngAnimate from 'angular-animate';
import 'angular-ui-router';
import 'ngmap';
import nhsFactory from 'factories/nhs';
import main from 'components/main/main';
import navbar from 'components/navbar/navbar';
import info from 'components/info/info';
import searchForm from 'components/searchForm/searchForm';

const app = angular.module('app', [
  'ui.router',
  'ngMap',
  ngAnimate,
  toastr,
  nhsFactory.name,
  main.name,
  navbar.name,
  info.name,
  searchForm.name
  ]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      template: '<main></main>'
    })
    .state('about', {
      url: '/about',
      template: require('components/about/about.html')
    });
    $locationProvider.html5Mode(true);

});

export default app;
