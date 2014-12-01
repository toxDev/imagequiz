'use strict';
angular.module('imageQuizz').controller('QuestionListController',
    function (QuestionData, $scope) {
        $scope.testData = QuestionData.findAllQuestions();
        console.log(QuestionData.findAllCategorys());
        this.hallo = "hallo";

    });
