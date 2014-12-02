angular.module('imageQuizz', ['ionic'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('modules', {
                url: '/modules',
                templateUrl: 'templates/ModulListView.html',
                controller: 'ModuleListController as mlCtrl'
            })
            .state('question_list', {
                url: '/questionlist/:id',
                templateUrl: 'templates/QuestionListView.html',
                controller: 'QuestionListController as qlCtrl'
            })
            .state('question_view', {
                url: '/questionview',
                templateUrl: 'templates/QuestionView.html',
                controller: 'QuestionController as qCtrl'
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
