'use strict';
angular.module('imageQuizz').controller('QuestionController',
    function (QuestionData,$scope,$stateParams) {

        $scope.question = QuestionData.findQuestionById($stateParams.id);
    });
