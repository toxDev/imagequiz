angular.module('imageQuizz', ['ionic', 'ui.utils'])

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
                url: '/questionview/:id',
                templateUrl: 'templates/QuestionView.html',
                controller: 'QuestionController as qCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/SettingView.html',
                controller: 'SettingsController as sCtrl'
            })
            .state('statistic', {
                url: '/statistic',
                templateUrl: 'templates/StatView.html',
                controller: 'StatisticController as statCtrl'
            })
            .state('question_view_quizz', {
                url: '/questionview/quizz/:id',
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
