'use strict';
angular.module('imageQuizz').factory('QuestionData',
    function (Question) {
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
                    questions.push(new Question(10, "Deutsche Sehenswürdigkeiten", "img/deutsche_sehenswuerdigkeiten/frauenkirche_muenchen.jpg", "@Photo by DAVID ILIFF. License: CC-BY-SA 3.0", "98,45 Meter hoch",
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

                    /*// Neue Kategorie
                     //http://de.wikipedia.org/wiki/Rotkehlchen#mediaviewer/File:Erithacus_rubecula_(Marek_Szczepanek).jpg
                     questions.push(new Question(100, "Vögel", "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Erithacus_rubecula_%28Marek_Szczepanek%29.jpg/640px-Erithacus_rubecula_%28Marek_Szczepanek%29.jpg", "@FlickrLickr", "Lateinischer Name: Erithacus rubecula",
                     [{
                     "option": "Meise",
                     "answer": true
                     },
                     {
                     "option": "Rotkehlchen",
                     "answer": true
                     },
                     {
                     "option": "Buntspecht",
                     "answer": false
                     },
                     {
                     "option": "Lerche",
                     "answer": false
                     }]
                     ));
                     //http://de.wikipedia.org/wiki/Meisen
                     questions.push(new Question(101, "Vögel", "http://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Parus_major_m.jpg/640px-Parus_major_m.jpg", "@Sławek Staszczuk (photoss [AT] hotmail.co.uk) CC BY-SA 3.0", "Kommen in der nördlichen Hemisphäre und in Afrika vor.",
                     [{
                     "option": "Meise",
                     "answer": true
                     },
                     {
                     "option": "Amsel",
                     "answer": false
                     },
                     {
                     "option": "Star",
                     "answer": false
                     },
                     {
                     "option": "Gimpel",
                     "answer": false
                     }]
                     ));
                     //http://de.wikipedia.org/wiki/Eichelh%C3%A4her
                     questions.push(new Question(102, "Vögel", "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Garrulus_glandarius_B_Luc_Viatour.jpg/640px-Garrulus_glandarius_B_Luc_Viatour.jpg", "@Luc Viatour - own work www.lucnix.be CC BY-SA 3.0", "Vor dem Winter werden umfangreiche Vorräte aus Eicheln und anderen Nussfrüchten angelegt.",
                     [{
                     "option": "Goldammer",
                     "answer": false
                     },
                     {
                     "option": "Buntspecht",
                     "answer": false
                     },
                     {
                     "option": "Elster",
                     "answer": false
                     },
                     {
                     "option": "Eichelhäher",
                     "answer": true
                     }]
                     ));*/


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
                        modules.push(questions[i].category);
                        //console.log(modules);
                    }
                }
                modules.sort();

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