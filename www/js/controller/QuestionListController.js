'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope, $state, $stateParams, $rootScope) {

        $rootScope.$viewHistory.backView = null;

        $scope.questionList = QuestionData.findAllQuestionsByCategory($stateParams.id);

        $scope.startQuizzMode = function () {
            //$state.go('question_view_quizz', {id: $scope.questionList[0].category});
            $state.go('question_view_quizz', {id: $stateParams.id});
        }
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
