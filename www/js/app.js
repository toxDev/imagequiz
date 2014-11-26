// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('imageQuizz', ['ionic'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('modules', {
                url: '/modules',
                templateUrl: 'templates/MainView.html',
                controller: 'ModuleListController as mlCtrl'
            })
            .state('question_list', {
                url: '/questionlist',
                templateUrl: 'templates/QuestionListView.html',
                controller: 'QuestionListController as qlCtrl'
            });
        $urlRouterProvider.otherwise('/modules');

    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
