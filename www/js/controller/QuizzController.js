'use strict';
angular.module('imageQuizz').controller('QuizzController',
    function (QuestionData, $scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, StatData, $timeout, $document) {

        //Setzt den 'correctRightSeriesCounter' einer Kategorie zurück
        this.removeFullyRememberedQuestions = function (questionList) {
            for (var i = 0; i < questionList.length; i++) {
                if (StatData.findStatByQuestionId(questionList[i].id).actRightSeries >= 6) {
                    questionList.splice(i, 1);
                    i = i - 1;
                }
            }
            return questionList;
        };


        //Setzen der ersten Frage, ermitteln der Fragen die noch nicht als gelernt eingestuft sind
        $scope.cur = 0;
        $scope.questionList = this.removeFullyRememberedQuestions(QuestionData.findAllQuestionsByCategory($stateParams.id));
        //Variablen zur Statistikermittlung
        $scope.correctAnswersCount = 0;
        $scope.wrongAnswerCount = 0;
        $scope.workedQuestionCount = 0;
        $scope.learnedQuestionCount = 0;

        $scope.rightAnswer = "";
        $scope.wrongAnswer = "";

        //Ermittelt die aktuelle höhe des Dokuemnts für den View
        $scope.actHight = $document.innerHeight;

        //Hier wird geprüft ob zu jeder Frage bereits ein Statistik Objekt existiert. Wenn nicht
        //wird es hier angelegt
        //TO-DO muss hier entfernt werden, bzw. es muss sichergestellt sein das die Statistik beim Modul import angelegt wird.
        $scope.questionList.forEach(function (question) {
            if (!StatData.findStatByQuestionId(question.id)) {
                StatData.addStat(question.id);
                console.log("Statistik hinzugefügt");
            }
        });

        this.removeFullyRememberedQuestions = function (questionList) {
            questionList.forEach(function (question) {
                if(StatData.findStatByQuestionId(question.id).actRightSeries == 6){
                    questionList.splice(questionList.indexOf(question),1);
                }
            });
            $timeout(function () {
                popup.close();
            }, 2500);
        };

        this.testAnswer = function (answer) {
            var correctAnswer;
            var stat = StatData.findStatByQuestionId($scope.question.id);
            var right = stat.countRight;
            var wrong = stat.countWrong;
            var series = stat.actRightSeries;
            $scope.workedQuestionCount++;

            //Die korrekte Antwort wird gesucht und in 'correctAnswer' gespeichert
            $scope.question.options.forEach(function (option) {
                if(option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            if(answer === correctAnswer){
                $scope.rightAnswer = correctAnswer;
                right += 1;
                series += 1;
                $scope.correctAnswersCount++;
                if (series == 6) {
                    $scope.learnedQuestionCount++;
                }
                $timeout(function () {
                    StatData.updateStat($scope.question.id, right, wrong, series);
                    $scope.rightAnswerAnswer = "";
                    $scope.nextQuestion();
                }, 1000);

            } else {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.wrongAnswer = answer;
                    }
                    if (option['answer'] == true) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                wrong += 1;
                series = 0;
                $scope.wrongAnswerCount++;

                $timeout(function () {
                    StatData.updateStat($scope.question.id, right, wrong, series);
                    $scope.wrongAnswer = "";
                    $scope.rightAnswerAnswer = "";
                    $scope.nextQuestion();
                }, 1000);
            }
        }
    });