'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope, $state, $stateParams, $rootScope, StatData, $ionicPopup) {

        $rootScope.$viewHistory.backView = null;

        $scope.questionList = QuestionData.findAllQuestionsByCategory($stateParams.id);

        $scope.startQuizzMode = function () {
            for (var i = 0; i < $scope.questionList.length; i++) {
                if(StatData.findAllStats == null || (StatData.findAllStats).length == 0){
                    $state.go('question_view_quizz', {id: $stateParams.id});
                    return;
                }
                if (StatData.findStatByQuestionId($scope.questionList[i].id).actRightSeries < 6
                        && (!($scope.questionList.length == 0)) && $scope.questionList) {
                    $state.go('question_view_quizz', {id: $stateParams.id});
                    return;
                }
            }

            var popup = $ionicPopup.confirm({
                title: 'Du hast alle Fragen gelernt!',
                template: 'Soll der Lern-Zähler zurückgesetzt werden?',
                cancelText: 'Nein',
                okText: 'Ja'
            });
            popup.then(function (res) {
                if (res) {
                    $scope.questionList.forEach(function (question) {
                        StatData.updateStat(question.id, StatData.findStatByQuestionId(question.id).countRight,
                            StatData.findStatByQuestionId(question.id).countWrong, 0);
                    });
                    $state.go('question_view_quizz', {id: $stateParams.id});

                }
            });
        };

        var ref = this;
        $scope.$on('$stateChangeStart',
            function (event) {
                if (ref) {
                }
            });

        this.goToModulList = function () {
            $state.go('tabs.home');
        }

    });
