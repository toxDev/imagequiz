/**
 * TODO: comment
 */
'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData) {

        var thisSt = this;
        var modules = QuestionData.findAllQuestions(); 

        var tmp = {};
        for (var i = 0; i < modules.length; i++) {
            var letter = modules[i].category.charAt(0);
            if (tmp[letter] == undefined) {
                tmp[letter] = []
            }
            tmp[letter].push(modules[i]);
        }

        /**
         *
         * @type {{}}
         */
        $scope.repeaterObject = tmp;

        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function () {
                if (thisSt.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(thisSt.searchQuery));
                }
            });
        /**
         *
         * @type {boolean}
         */
        $scope.searchActive = false;
        if (localStorage.getItem('saveQuery')) {
            this.searchActive = true;
            this.searchQuery = JSON.parse(localStorage.getItem('saveQuery'));
            localStorage.removeItem('saveQuery');
        }
        /**
         *
         */
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        }
    });