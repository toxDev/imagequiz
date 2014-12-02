'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope, $state, $stateParams) {
        $scope.questionList = QuestionData.findAllQuestionsByCategory($stateParams.id);

        $scope.startQuizzMode = function () {
            $state.go('question_view_quizz', {id: $scope.questionList[0].category});
        }

    });
