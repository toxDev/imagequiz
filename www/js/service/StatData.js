'use strict';

angular.module('imageQuizz').factory('StatData',
    function (Stat) {
        var service = {
            findAllStats: function () {
                var stats = localStorage.getItem('stats');
                if (!stats) {
                    var stats = [];
                    localStorage.setItem('stats', JSON.stringify(stats));
                } else {
                    stats = JSON.parse(stats);
                }
                return stats;
            },
            findStatByQuestionId: function (id) {
                var stats = this.findAllStats();
                stats.forEach(function (stat) {
                    if (stat.questionID == id) {
                        return stat;
                    }
                });
                return false;
            },
            addStat: function (questionID) {
                var stats = this.findAllStats();
                stats.push(new Stat(questionID, 0, 0, 0));
                localStorage.setItem('stats', JSON.stringify(stats));
            }
        };
        return service;
    }
);
