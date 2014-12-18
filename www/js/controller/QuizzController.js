'use strict';
angular.module('imageQuizz').controller('QuizzController',
    function (QuestionData, $scope, $stateParams, $ionicPopup, $ionicNavBarDelegate, StatData) {

        $scope.cur = 0;
        $scope.questionList = QuestionData.findAllQuestionsByCategory($stateParams.id);
        $scope.question = $scope.questionList[$scope.cur];
        $scope.correctAnswers = 0;

        //Hier wird geprüft ob zu jeder Frage bereits ein Statistik Objekt existiert. Wenn nicht
        //wird es hier angelegt
        $scope.questionList.forEach(function (question) {
            if (!StatData.findStatByQuestionId(question.id)) {
                StatData.addStat(question.id);
                console.log("Statistik hinzugefügt");
            }
        });

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
                $scope.correctAnswers += 1;
            } else {
                result = 'Leider Falsch :('
            }

            var popup = $ionicPopup.alert({
                title:result,
                template: 'Deine Antwort: ' + answer +'<br>'+'Richtige Antwort: ' + correctAnswer
            });

            popup.then(function () {
                if($scope.cur == $scope.questionList.length-1){
                    var statisticPopup = $ionicPopup.alert({
                        title:'Runden Statistik',
                        template:'Richtig erkannte Bilder: '+$scope.correctAnswers+'<br>'+
                                    'Von insgesamt: '+$scope.questionList.length
                    });
                    $ionicNavBarDelegate.back();
                } else {
                    $scope.question = $scope.questionList[++$scope.cur];
                }
            })
        }
    });