'use strict';
angular.module('imageQuizz').factory('Stat',
    function () {
        var Stat = function (countRight, countWrong, actRightSeries, questionID) {
            this.countRight = countRight;
            this.countWrong = countWrong;
            this.actRightSeries = actRightSeries;
            this.questionID = questionID;
        };
        return Stat;
    }
);