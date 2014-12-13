'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, QuestionData) {

        var thisSt = this;
        var modules = QuestionData.findAllQuestions();
        /*[{"id": 1, "category": "Autos"},
         {"id": 2, "category": "Gefährliche Raubtiere"},
         {"id": 3, "category": "Deutsche Sehenswürdigkeiten"},
         {"id": 4, "category": "Magische Orte"}];*/

        var tmp = {};
        for (var i = 0; i < modules.length; i++) {
            var letter = modules[i].category.charAt(0);
            if (tmp[letter] == undefined) {
                tmp[letter] = []
            }
            tmp[letter].push(modules[i]);
        }

        $scope.repeaterObject = tmp;

        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function (event) {
                if (thisSt.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(thisSt.searchQuery));
                }
            });

        $scope.searchActive = false;
        if (localStorage.getItem('saveQuery')) {
            this.searchActive = true;
            this.searchQuery = JSON.parse(localStorage.getItem('saveQuery'));
            localStorage.removeItem('saveQuery');
        }
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        }
    });

/*window.MODULES =
 [{"id": 1, "category": "Autos"},
 {"id": 2, "category": "Gefährliche Raubtiere"},
 {"id": 3, "category": "Deutsche Sehenswürdigkeiten"},
 {"id": 4, "category": "Magische Orte"}];*/

/*var letters = $scope.letters = [];
 var modules = $scope.modules = [];
 var currentCharCode = $scope.currentCharCode = 'A'.charCodeAt(0) - 1;
 //var thisSt = this;

 window.MODULES.sort(function (a, b) {
 return a.category > b.category ? 1 : -1;
 }).forEach(function (Modul) {
 //get the letter of the module
 var modulCharCode = Modul.category.toUpperCase().charCodeAt(0);
 //
 var difference = modulCharCode - currentCharCode;
 for (var i = 1; i <= difference; i++) {
 addLetter(currentCharCode + i);
 }
 currentCharCode = modulCharCode;
 modules.push(Modul);
 });

 //If names ended before Z, add everything up to Z
 for (var i = currentCharCode + 1; i <= 'Z'.charCodeAt(0); i++) {
 addLetter(i);
 }

 function addLetter(code) {
 var letter = String.fromCharCode(code);
 modules.push({
 isLetter: true,
 letter: letter
 });
 letters.push(letter);
 //console.log(letters);
 }

 //Letters are shorter, everything else is 52 pixels
 $scope.getItemHeight = function (item) {
 return item.isLetter ? 40 : 100;
 };
 $scope.getItemWidth = function (item) {
 return '100%';
 };

 var letterHasMatch = {};
 $scope.getModules = function () {
 letterHasMatch = {};
 //Filter contacts by $scope.search.
 //Additionally, filter letters so that they only show if there
 //is one or more matching contact
 return modules.filter(function (item) {
 var itemDoesMatch = !$scope.search || item.isLetter ||
 item.category.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

 //Mark this person's last name letter as 'has a match'
 if (!item.isLetter && itemDoesMatch) {
 var letter = item.category.charAt(0).toUpperCase();
 letterHasMatch[letter] = true;
 }

 return itemDoesMatch;
 }).filter(function (item) {
 //Finally, re-filter all of the letters and take out ones that don't
 //have a match
 if (item.isLetter && !letterHasMatch[item.letter]) {
 return false;
 }
 return true;
 });
 };

 $scope.clearSearch = function () {
 $scope.search = '';
 };});*/