'use strict';
angular.module('imageQuizz').controller('QuestionController',
    function (QuestionData, $scope, $stateParams, $ionicPopup, $ionicNavBarDelegate, $timeout, $window, $document) {

        //console.log($document.getElementById('myimg'));

        $scope.actHight = $document.innerHeight;
        /*        if($scope.actHight < 300) {
         $scope.actHight = 300;
         }*/

        $scope.question = QuestionData.findQuestionById($stateParams.id);

        this.testAnswer = function (answer) {
            var correctAnswer;

            $scope.question.options.forEach(function (option) {
                if(option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

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
        };

        this.toggleInfo = function () {
            var popup = $ionicPopup.alert({
                title: 'Information',
                template: $scope.question.infoText
            });
            $timeout(function(){
                popup.close();
            }, 2500);
        };
    });
