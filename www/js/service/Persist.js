'use strict'
angular.module('imageQuizz').factory('Persist',
    function ($firebase, FIREBASE_URL, QuestionData) {

        var rootRef = new Firebase('imagequizzmapp.firebaseIO.com/users');

        var uID = localStorage.getItem('uid');

        var userDataRef;
        if(!uID){
            console.log("User ID war nicht gesetzt!");
            userDataRef = rootRef.push();
        } else {
            userDataRef = rootRef.child(uID);
            console.log("User ID war bereits gesetzt!");
        }

        var userRefNg = $firebase(userDataRef);
        console.log("Pfad zu Firebase " + userDataRef.toString());

        //var userDataRef = rootRef.child('Hallo Test');
/*        if(!localStorage.getItem('uid')){
            var userDataRef = rootRef.push();
            localStorage.setItem('uid', userDataRef);
        } else {
            userDataRef = localStorage.getItem('uid');
        }*/


        /*
        var userRef = userDataRef.child(localStorage.getItem('uid'));
*/

        var service = {
            getUserId: function () {
                return userDataRef.key();
            },
            writeData: function(){
                //rootRef.set({'name':'Anreas','alter':20});

                userDataRef.set(QuestionData.findAllQuestions());
            },
            findAllData: function(){
                return userRefNg.$asArray();
            },
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

