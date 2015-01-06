'use strict'
angular.module('imageQuizz').factory(
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var userRef = rootRef.child(uid);
        var userRefNg = $firebase(userRef);

        var service = {
            findAll: function () {

            },
            updateAll: function () {

            }
        };
    });

