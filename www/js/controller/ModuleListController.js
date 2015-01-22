/**
 * TODO: comment
 */
'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData, $ionicPopup, StatData, $state) {

        //variable auf this objekt
        var self = this;

        /**
         *TODO: comment
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
         *TODO: comment
         * @type {{}}
         */
        $scope.repeaterObject = this.loadList();

        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function () {
                if (self.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(self.searchQuery));
                }
            });

        /**
         *TODO: comment
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
         *TODO: comment
         */
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        };

        /**
         * TODO: commnet
         * @param category
         */
        this.removeFromList = function (category) {
            var stats = StatData.findAllStats();
            var questions = QuestionData.findAllQuestions();

            for (var i = 0; i < questions.length; i++) {

                if (questions[i].category == category) {
                    var id = questions[i].id;
                    for (var j = 0; j < stats.length; j++) {
                        //StatData.removeQuestStat(id);
                        StatData.updateStat(id, 0, 0, 0);
                    }
                }
            }
            QuestionData.deleteCategory(category);
        };

        /**
         *TODO: comment
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
                    self.removeFromList(category);
                    $scope.repeaterObject = self.loadList();
                }
            });
        }

        /**
         * TODO: comment
         */
        $scope.goImport = function () {
            $state.go('tabs.settings');
        }
    });