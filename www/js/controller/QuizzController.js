'use strict';
angular.module('imageQuizz').controller('QuizzController',
    function (QuestionData, $scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, StatData, $timeout, $document) {

        $scope.actHight = $document.innerHeight;

        this.removeFullyRememberedQuestions = function (questionList) {
            for (var i = 0; i < questionList.length; i++){
                if(StatData.findStatByQuestionId(questionList[i].id).actRightSeries >= 6){
                    questionList.splice(i,1);
                    i = i-1;
                }
            }
            return questionList;
        };

        $scope.cur = 0;
        $scope.questionList = this.removeFullyRememberedQuestions(QuestionData.findAllQuestionsByCategory($stateParams.id));
/*
        //Zurücksetzen der Fragen, wenn alle 6 mal richtig beantwortet wurden
        if(!$scope.questionList || $scope.questionList.length == 0){
            var popup = $ionicPopup.confirm({
                title: 'Du hast alle Fragen gelernt!',
                template: 'Soll der Lern-Zähler zurückgesetzt werden?',
                cancelText: 'Nein',
                okText: 'Ja'
            });
            popup.then(function(res) {
                console.log(res);
                if(res){
                    $scope.questionList = QuestionData.findAllQuestionsByCategory($stateParams.id);
                    $scope.questionList.forEach(function (question) {
                        StatData.updateStat(question.id,StatData.findStatByQuestionId(question.id).countRight,
                            StatData.findStatByQuestionId(question.id).countWrong,0);
                    });

                } else {
                    $ionicNavBarDelegate.back();
                }
            });
        }
*/
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
