'use strict';
angular.module('imageQuizz').factory('QuestionData',
    function (Question) {
        var service = {
            findAllQuestions: function () {
                var questions = localStorage.getItem('questions');
                if (!questions) {
                    //init storage
                    var questions = [];
                    questions.push(new Question(1, "Gefährliche Raubtiere", "/img/gefaehrliche_raubtiere/loewe.jpg", "@FlickrLickr", "Eine gefährliche Raubkatze",
                        [{
                            "option": "Löwe",
                            "answer": true
                        },
                            {
                                "option": "Gepard",
                                "answer": false
                            },
                            {
                                "option": "Huhn",
                                "answer": false
                            },
                            {
                                "option": "Ziege",
                                "answer": false
                            }]
                    ));
                    questions.push(new Question(2, "Gefährliche Raubtiere", "/img/gefaehrliche_raubtiere/krokodil.jpg", "@U.S. Fish and Wildlife Service", "Ein gefährliches Reptil",
                        [{
                            "option": "Schildkröte",
                            "answer": false
                        },
                            {
                                "option": "Krokodil",
                                "answer": true
                            },
                            {
                                "option": "Python",
                                "answer": false
                            },
                            {
                                "option": "Eidechse",
                                "answer": false
                            }]
                    ));
                    questions.push(new Question(3, "Deutsche Sehenswürdigkeiten", "http://www.placehold.it/640x480", "ccc", "1100 Tonnen Fracht am Tag",
                        [{
                            "option": "Brandenburger Tor",
                            "answer": false
                        },
                            {
                                "option": "Kölner Dom",
                                "answer": false
                            },
                            {
                                "option": "Deutsches Museum",
                                "answer": false
                            },
                            {
                                "option": "Hamburger Hafen",
                                "answer": true
                            }]
                    ));
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