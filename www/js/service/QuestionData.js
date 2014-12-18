'use strict';
angular.module('imageQuizz').factory('QuestionData',
    function (Question, Modul) {
        var service = {
            findAllQuestions: function () {
                var questions = localStorage.getItem('questions');
                if (!questions) {
                    //init storage
                    var questions = [];
                    questions.push(new Question(1, "Gefährliche Raubtiere", "img/gefaehrliche_raubtiere/loewe.jpg", "@FlickrLickr", "Eine gefährliche Raubkatze",
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
                    questions.push(new Question(2, "Gefährliche Raubtiere", "img/gefaehrliche_raubtiere/krokodil.jpg", "@U.S. Fish and Wildlife Service", "Ein gefährliches Reptil",
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
                    questions.push(new Question(3, "Gefährliche Raubtiere", "img/gefaehrliche_raubtiere/python.jpg", "@Mike Wesemann", "Eine Programmiersprache heißt ebenso.",
                        [{
                            "option": "Klapperschlange",
                            "answer": false
                        },
                            {
                                "option": "Blindschleiche",
                                "answer": false
                            },
                            {
                                "option": "Cobra",
                                "answer": false
                            },
                            {
                                "option": "Python",
                                "answer": true
                            }]
                    ));
                    questions.push(new Question(4, "Gefährliche Raubtiere", "img/gefaehrliche_raubtiere/braunbaer.jpg", "@Bobisbob", "Wissenschaftlicher Name Ursus arctos",
                        [{
                            "option": "Braunbär",
                            "answer": true
                        },
                            {
                                "option": "Tedybär",
                                "answer": false
                            },
                            {
                                "option": "Schwarzbär",
                                "answer": false
                            },
                            {
                                "option": "Koalabär",
                                "answer": false
                            }]
                    ));
                    questions.push(new Question(5, "Autos", "img/autos/camaro.jpg", "@Rperiny", "Ein Auto von Chevrolet",
                        [{
                            "option": "Camaro",
                            "answer": true
                        },
                            {
                                "option": "Mustang",
                                "answer": false
                            },
                            {
                                "option": "Challenger",
                                "answer": false
                            },
                            {
                                "option": "GTO",
                                "answer": false
                            }]
                    ));
                    questions.push(new Question(6, "Autos", "img/autos/ford_gt.jpg", "@Amit Belani - Flickr", "Gebaut von 2004 - 2006",
                        [{
                            "option": "Cobra",
                            "answer": false
                        },
                            {
                                "option": "Porsche 911",
                                "answer": false
                            },
                            {
                                "option": "Ford GT",
                                "answer": true
                            },
                            {
                                "option": "GT2",
                                "answer": false
                            }]
                    ));
                    questions.push(new Question(9, "Deutsche Sehenswürdigkeiten", "img/deutsche_sehenswuerdigkeiten/hh_hafen.jpg", "@Sir James", "Im Norden Deutschlands.",
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
                    questions.push(new Question(9, "Deutsche Sehenswürdigkeiten", "img/deutsche_sehenswuerdigkeiten/frauenkirche_muenchen.jpg", "@Photo by DAVID ILIFF. License: CC-BY-SA 3.0", "98,45 Meter hoch",
                        [{
                            "option": "Münchner Frauenkirche",
                            "answer": true
                        },
                            {
                                "option": "Dresdner Dom",
                                "answer": false
                            },
                            {
                                "option": "Frankfurter Dom",
                                "answer": false
                            },
                            {
                                "option": "Limburger Dom",
                                "answer": false
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
                        modules.push(new Modul(i, questions[i].category));
                        console.log(modules);
                    }
                }
                //modules.sort();

                return modules
            },

            findAllQuestionsByCategory: function (category) {
                var questions = this.findAllQuestions();
                var temp_questions = [];
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].category == category) {
                        temp_questions.push(questions[i])
                    }
                }
                return temp_questions;
            },

            findQuestionById: function (id) {
                var questions = this.findAllQuestions();
                var temp_question = [];
                for (var i = 0; i < questions.length; i++) {
                    if (questions[i].id == id) {
                        temp_question = questions[i];
                        break;
                    }
                }
                return temp_question;
            }

        };
        return service;
    });