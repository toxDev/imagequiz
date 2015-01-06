'use strict';
angular.module('imageQuizz').factory(
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var userRef = rootRef.child(localStorage.getItem('uid'));
        var userRefNg = $firebase(userRef);

        var service = {
            findAll: function () {
                return userRefNg.$asArray();
            },
            update: function (stat) {
                this.findAll().$save(stat);
            },
            persist: function (stat) {
                this.findAll().$add(stat);
            },
            findById: function (id) {
                return this.findAll().$getRecord(id);
            }
        };
        return service;
    });

