'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData) {

        var letters = $scope.letters = [];
        var currentCharCode = $scope.currentCharCode = 'A'.charCodeAt(0) - 1;
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

        $scope.modules = QuestionData.findAllCategorys();

        $scope.getItemHeight = function (item, index) {
            //Make evenly indexed items be 10px taller, for the sake of example
            return (index % 2) === 0 ? 50 : 60;
        };
    });