'use strict';
angular.module('imageQuizz').controller('QuizzController',
    function (QuestionData, $scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, StatData, $timeout, $document) {

        //Setzt den 'correctRightSeriesCounter' einer Kategorie zurück
        this.removeFullyRememberedQuestions = function (questionList) {
            for (var i = 0; i < questionList.length; i++){
                if(StatData.findStatByQuestionId(questionList[i].id).actRightSeries >= 6){
                    questionList.splice(i,1);
                    i = i-1;
                }
            }
            return questionList;
        };


        //Setzen der ersten Frage, ermitteln der Fragen die noch nicht als gelernt eingestuft sind
        $scope.cur = 0;
        $scope.questionList = this.removeFullyRememberedQuestions(QuestionData.findAllQuestionsByCategory($stateParams.id));
        $scope.question = $scope.questionList[$scope.cur];

        //Ermittelt die aktuelle höhe des Dokuemnts für den View
        $scope.actHight = $document.innerHeight;

        //Hier wird geprüft ob zu jeder Frage bereits ein Statistik Objekt existiert. Wenn nicht
        //wird es hier angelegt
        $scope.questionList.forEach(function (question) {
            if (!StatData.findStatByQuestionId(question.id)) {
                StatData.addStat(question.id);
                console.log("Statistik hinzugefügt");
            }
        });

        //Erkennung der swipe Gesten (Frage vor/zurück)
        $scope.swipeRight = function () {
            $scope.act = --$scope.cur % $scope.complete + 1;
            $scope.question = $scope.questionList[$scope.act - 1];
            $ionicNavBarDelegate.setTitle($scope.act + "/" + $scope.complete);
        };
        $scope.swipeLeft = function () {
            $scope.act = ++$scope.cur % $scope.complete + 1;
            $scope.question = $scope.questionList[$scope.act - 1];
            $ionicNavBarDelegate.setTitle($scope.act + "/" + $scope.complete);
        };

        //Aktelle Anzahl an Fragen und aktuelle Frage
        $scope.complete = $scope.questionList.length;
        $scope.act = 1;

        $ionicNavBarDelegate.setTitle($scope.act + "/" + $scope.complete);

        //Zeigt zu einer Frage für 2500ms den in der Frage hinterlegten Infotext an
        this.toggleInfo = function () {
            var popup = $ionicPopup.alert({
                title: 'Information',
                template: $scope.question.infoText
            });
            $timeout(function () {
                popup.close();
            }, 2500);
        };


        $scope.correctAnswers = 0;



        this.testAnswer = function (answer) {
            var correctAnswer;

            $scope.question.options.forEach(function (option) {
                if(option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            var result;
            var stat = StatData.findStatByQuestionId($scope.question.id);
            var right = stat.countRight;
            var wrong = stat.countWrong;
            var series = stat.actRightSeries;

            if(answer === correctAnswer){
                result = 'Richtig! Sehr gut :)';
                $scope.correctAnswers += 1;
                right += 1;
                series += 1;
            } else {
                result = 'Leider Falsch :(';
                wrong += 1;
                series = 0;
            }

            StatData.updateStat($scope.question.id,right,wrong,series);

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