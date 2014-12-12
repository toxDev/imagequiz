'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData) {
        $scope.modules = QuestionData.findAllCategorys();
        // console.log($scope.modules);
        var thisSt = this;
        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function (event) {
                if (thisSt.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(thisSt.searchQuery));
                }
            });

        $scope.searchActive = false;
        if (localStorage.getItem('saveQuery')) {
            this.searchActive = true;
            this.searchQuery = JSON.parse(localStorage.getItem('saveQuery'));
            localStorage.removeItem('saveQuery');
        }
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        }
    });