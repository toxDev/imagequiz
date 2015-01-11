'use strict';
angular.module('imageQuizz').factory('StatData',
    function (Stat, Persist) {
        var service = {
            findAllStats: function () {

                if( localStorage.getItem('sync') == 1) {
                    //var stats = Persist.findAll();
                    if (!stats){
                        var stats = [];
                    }
                    localStorage.setItem('stats', JSON.stringify(stats));
                    return stats;
                } else {
                    var stats = localStorage.getItem('stats');
                    if (!stats) {
                        stats = [];
                        localStorage.setItem('stats', JSON.stringify(stats));
                    } else {
                        stats = JSON.parse(stats);
                    }
                    return stats;
                }
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
                if(localStorage.getItem('sync') == 1) {
                    Persist.persist(new Stat(questionID, 0, 0, 0));
                }
            },
            updateStat: function (id, right, wrong, series) {
                var stats = this.findAllStats();

                for(var i = 0; i < stats.length; i++){
                    if(stats[i].questionID == id){
                        stats[i] = new Stat(id,right,wrong,series);
                    }
                }
                localStorage.setItem('stats', JSON.stringify(stats));
                if(localStorage.getItem('sync') == 1){
                    Persist.update(new Stat(id,right,wrong,series));
                }
            }
        };
        return service;
    }
);
