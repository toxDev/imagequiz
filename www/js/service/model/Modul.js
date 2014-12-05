/**
 * Created by flo on 05.12.14.
 */
'use strict';
angular.module('imageQuizz').factory('Modul',
    function () {
        var Modul = function (id, category) {
            this.id = id;
            this.category = category;
        };
        return Modul;
    }
)