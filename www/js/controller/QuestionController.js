'use strict';
angular.module('imageQuizz').controller('QuestionController',
    function (QuestionData, $scope, $stateParams, $ionicPopup, $ionicNavBarDelegate, $timeout, $window, $document) {

        //console.log($document.getElementById('myimg'));

        $scope.actHight = $document.innerHeight;
        /*        if($scope.actHight < 300) {
         $scope.actHight = 300;
         }*/

        $scope.question = QuestionData.findQuestionById($stateParams.id);

        $scope.rightAnswer = "";
        $scope.wrongAnswer = "";

        this.testAnswer = function (answer) {
            var correctAnswer;
            var count = 0;

            $scope.question.options.forEach(function (option) {
                if(option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            var result;

            if(answer === correctAnswer){
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.rightAnswer = option['option'];
                        console.log($scope.rightAnswer);
                        return;
                    }
                });

                result = 'Richtig! Sehr gut :)'
            } else {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.wrongAnswer = answer;
                    }
                    if (option['answer'] == true) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                result = 'Leider Falsch :('
            }

            /*var popup = $ionicPopup.alert({
                title:result,
                template: 'Deine Antwort: ' + answer +'<br>'+'Richtige Antwort: ' + correctAnswer
            });

            popup.then(function () {

             })*/
            $timeout(function () {
                $ionicNavBarDelegate.back()
            }, 2000)

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
