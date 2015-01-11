/**
 * TODO: comment
 */
'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData, $ionicPopup) {

        var thisSt = this;

        /**
         *
         * @returns {{}}
         */
        this.loadList = function () {

            var modules = QuestionData.findAllQuestions();

            var tmp = {};
            for (var i = 0; i < modules.length; i++) {
                var letter = modules[i].category.charAt(0);
                if (tmp[letter] == undefined) {
                    tmp[letter] = []
                }
                tmp[letter].push(modules[i]);
            }
            return tmp;
        };


        /**
         *
         * @type {{}}
         */
        $scope.repeaterObject = this.loadList();

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
        ;
        /**
         *
         */
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        };

        /**
         *
         * @param category
         */
        $scope.deleteCategory = function (category) {
            var popup = $ionicPopup.confirm({
                title: 'Kategorie löschen',
                template: 'Sind Sie sicher das die Kategorie <strong>'+category+'</strong> gelöscht werden soll?' ,
                cancelText: 'Abbruch',
                okText: 'Löschen'
            });
            popup.then(function (res) {
                if (res) {
                    QuestionData.deleteCategory(category);
                    $scope.repeaterObject = thisSt.loadList();
                }
            });
        }
    });