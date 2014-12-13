'use strict';
angular.module('imageQuizz').controller('QuestionController',
    function (QuestionData,$scope,$stateParams,$ionicPopup,$ionicNavBarDelegate) {

        $scope.question = QuestionData.findQuestionById($stateParams.id);

        this.testAnswer = function (answer) {
            console.log(answer);
            var correctAnswer;

            $scope.question.options.forEach(function (option) {
                if(option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            console.log(correctAnswer);

            var result;

            if(answer === correctAnswer){
                result = 'Richtig! Sehr gut :)'
            } else {
                result = 'Leider Falsch :('
            }

            var popup = $ionicPopup.alert({
                title:result,
                template: 'Deine Antwort: ' + answer +'<br>'+'Richtige Antwort: ' + correctAnswer
            });

            popup.then(function () {
                $ionicNavBarDelegate.back()
            })
        }
    });
