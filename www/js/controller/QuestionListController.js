'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope) {
        $scope.questionList = QuestionData.findAllQuestions();
        console.log($scope.questionList);

    });
