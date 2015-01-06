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
                //Vergleich in der forEach Schleife funktioniert nicht, daher normale For-Schleife.

                /*
                stats.forEach(function (stat) {
                    if (stat.questionID == id) {
                        return stat;
                    }
                });
                */

                for(var i = 0; i < stats.length; i++){
                    if(stats[i].questionID == id){
                        return stats[i];
                    }
                }
                return false;
            },
            addStat: function (questionID) {
                var stats = this.findAllStats();
                stats.push(new Stat(questionID, 0, 0, 0));
                localStorage.setItem('stats', JSON.stringify(stats));
            },
            updateStat: function (id, right, wrong, series) {
                var stats = this.findAllStats();

                for(var i = 0; i < stats.length; i++){
                    if(stats[i].questionID == id){
                        stats[i] = new Stat(id,right,wrong,series);
                    }
                }
                localStorage.setItem('stats', JSON.stringify(stats));
            }
        };
        return service;
    }
);
