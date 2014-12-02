'use strict';
angular.module('imageQuizz').controller('QuestionController',
    function () {
         var Question = function (name) {
            this.name = name;
        };

        var answers = [];

        answers.push(new Question('Antwort 1'));
        answers.push(new Question('Antwort 2'));
        answers.push(new Question('Antwort 3'));
        answers.push(new Question('Antwort 4'));

        this.answers = answers;
    });