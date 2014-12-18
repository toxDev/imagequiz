'use strict';
angular.module('imageQuizz').factory('Stat',
    function () {
        var Stat = function (questionID, countRight, countWrong, actRightSeries) {
            this.countRight = countRight;
            this.countWrong = countWrong;
            this.actRightSeries = actRightSeries;
            this.questionID = questionID;
        };
        return Stat;
    }
);