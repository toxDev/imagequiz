/**
 * TODO: comment
 */
'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData, $ionicPopup, $timeout, $FirebaseObject, StatData) {

        this.records = QuestionData.findAllQuestions();

        localStorage.setItem('uid', '-JfOYM_xX6QUZKQVdla-');
        //TESTPLACE PERSIST
        //Persist.writeData();
        //Persist.findAllData();
        //Persist.getParentId();
        //console.log(QuestionData.getUserId());
        localStorage.setItem('sync', 0);
        console.log(QuestionData.findAllQuestions());
        localStorage.setItem('sync', 1);
        console.log(QuestionData.findAllQuestions());

        var thisSt = this;
        var modules = QuestionData.findAllQuestions();
        console.log("module " + modules.length);

        modules.$loaded().then(function () {
            console.log(modules.length);
            console.log("hallo");
        });

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

        this.removeFromList = function (category) {
            var stats = StatData.findAllStats();
            var questions = QuestionData.findAllQuestions();

            for (var i = 0; i < questions.length; i++) {

                if (questions[i].category == category) {
                    var id = questions[i].id;
                    for (var j = 0; j < stats.length; j++) {

                        StatData.updateStat(id, 0, 0, 0);
                    }
                }
            }
            QuestionData.deleteCategory(category);
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
                    thisSt.removeFromList(category);
                    $scope.repeaterObject = thisSt.loadList();
                }
            });
        }
    });