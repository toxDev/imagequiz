'use strict';
angular.module('imageQuizz').factory('StatData',
    function (Stat, FIREBASE_URL, $firebase, $FirebaseObject) {

        var rootRef = new Firebase(FIREBASE_URL);
        var rootUserRef = rootRef.child('users');

        var uID = localStorage.getItem('uid');
        var userDataRef;

        if(!uID){
            console.log("User ID war nicht gesetzt!");
            //console.log(rootUserRef.push().toString());
            userDataRef = new Firebase(rootUserRef.push().toString());
            localStorage.setItem('uid',userDataRef.key());
        } else {
            userDataRef = rootUserRef.child(uID);
            console.log("User ID war bereits gesetzt!");
        }
        //console.log(userDataRef.key());
        var statDataRef = userDataRef.child('statdata');
        var userRefNg = $firebase(statDataRef);
        console.log("Pfad zu Firebase " + userDataRef.toString());

        var service = {
            findAllStats: function () {

                if( localStorage.getItem('sync') == 1) {
                    var userStats = userRefNg.$asArray();
                    userStats.$loaded().then(function (userStats) {
                        console.log(userStats.length);
                    });

                    if (userStats == null || userStats.length == 0) {
                        stats = localStorage.getItem('stats');
                        stats = JSON.parse(stats);
                        userRefNg.$set(stats);
                    }
                } else {
                    var stats = localStorage.getItem('stats');
                    if (!stats) {
                        stats = [];
                        localStorage.setItem('stats', JSON.stringify(stats));
                    } else {
                        stats = JSON.parse(stats);
                    }
                }
                console.log(stats);
                return stats;
            },
            findStatByQuestionId: function (id) {
                var stats = this.findAllStats();

                for(var i = 0; i < stats.length; i++){
                    if(stats[i].questionID == id){
                        return stats[i];
                    }
                }
                return false;
            },
            addStat: function (questionID) {
                var stats = this.findAllStats();
                var temp = [];
                for(var i = 0; i < stats.length; i++){
                    temp.push(new Stat(stats[i].questionID,stats[i].countRight,stats[i].countWrong,stats[i].actRightSeries));
                }
                temp.push(new Stat(questionID, 0, 0, 0));

                if(localStorage.getItem('sync') == 1) {
                    userRefNg.$set(temp);
                } else {
                    localStorage.setItem('stats', JSON.stringify(stats));
                }
            },
            updateStat: function (id, right, wrong, series) {
                var stats = this.findAllStats();
                var temp = [];
                for(var i = 0; i < stats.length; i++){
                    if(stats[i].questionID != id){
                        temp.push(new Stat(stats[i].questionID,stats[i].countRight,stats[i].countWrong,stats[i].actRightSeries));
                    }
                }
                temp.push(new Stat(id,right,wrong,series));

                if(localStorage.getItem('sync') == 1){
                    userRefNg.$set(temp);
                } else {
                    localStorage.setItem('stats', JSON.stringify(temp));
                }
            }
        };
        return service;
    }
);
