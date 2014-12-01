'use strict';
angular.module('imageQuizz').factory('QuestionData',
    function (Question) {
        var service = {
            findAllQuestions: function () {
                var questions = localStorage.getItem('questions');
                if (!questions) {
                    //init storage
                    var questions = [];
                    questions.push(new Question(1, "Gefährliche Raubtiere", "http://www.placehold.it/640x480", "ccc", "Eine gefährliche Raubkatze", {
                        "Löwe": true,
                        "Gepard": false,
                        "Huhn": false,
                        "Zige": false
                    }));
                    questions.push(new Question(2, "Gefährliche Raubtiere", "http://www.placehold.it/640x480", "ccc", "Eine gefährliche Seekuh", {
                        "Robbe": true,
                        "Robben": false,
                        "Schweinsteiger": false,
                        "Obama": false
                    }));
                    questions.push(new Question(3, "Deutsche Sehenswürdigkeiten", "http://www.placehold.it/640x480", "ccc", "1100 Tonnen Fracht am Tag", {
                        "Brandenburger Tor": true,
                        "Kölnder Dom": false,
                        "Deutsches Museum": false,
                        "Hamburger Hafen": false
                    }));
                    //Damit daten im lokal Storage abgelegt werden, muss später entfernt werden
                    localStorage.setItem('questions', JSON.stringify(questions));
                } else {
                    questions = JSON.parse(questions);
                }
                return questions;
            },

            findAllCategorys: function () {
                var questions = this.findAllQuestions();
                var modules = [];
                for (var i = 0; i < questions.length; i++) {
                    if (modules.indexOf(questions[i].category) === -1) {
                        modules.push(questions[i].category)
                    }
                }
                return modules;
            }

            //To-Do
            //findById(id) -

        };
        return service;
    });