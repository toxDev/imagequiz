'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope, $state) {
        $scope.questionList = QuestionData.findAllQuestions();
        console.log($scope.questionList);

        $scope.startQuizzMode = function () {
            $state.go('question_view_quizz', {id: questionList[0].category})
        }

    });
