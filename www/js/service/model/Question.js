'use strict';
angular.module('imageQuizz').factory('Question',
    function () {
        var Question = function (id, category, imageLink, imageOwner, infoText, options) {
            this.id = id;
            this.category = category;
            this.imageLink = imageLink;
            this.imageOwner = imageOwner;
            this.infoText = infoText;
            this.options = options
                /*this.options = {
                 "gepard" : true,
                 "loewe": false,
                 "huhn": false
                 }*/;
        };
        return Question;
    }
)
