'use strict'
angular.module('imageQuizz').factory('Persist',
    function ($firebase, FIREBASE_URL) {

        /*        var rootRef = new Firebase(FIREBASE_URL);
        var userDataRef = rootRef.child('userdata');
        var userRef = userDataRef.child(localStorage.getItem('uid'));

        var userRefNg = $firebase(userRef);
         */
        var service = {
            /*
            findAll: function () {
                return userRefNg.$asArray();
            },
            update: function (stat) {
                this.findAll().$save(stat);
                //TODO last sync time
            },
            persist: function (stat) {
                this.findAll().$add(stat);
             },*/
            findById: function (id) {
                //return this.findAll().$getRecord(id);
            }
        };
        return service;
    });

