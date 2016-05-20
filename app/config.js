import angular from 'angular';
import 'angular-ui-router';
import 'ngmap';
import mainController from 'main/main';
import nhsFactory from 'factories/nhs';
import navbar from 'components/navbar/navbar';
import info from 'components/info/info';

const app = angular.module('app', ['ui.router','ngMap',nhsFactory.name,navbar.name,info.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      template: require('main/main.html'),
      controller: mainController
    })
    .state('about', {
      url: '/about',
      template: require('about/about.html')
    });
    $locationProvider.html5Mode(true);

});

export default app;
