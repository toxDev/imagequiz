'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function ($scope, $stateParams, $location, $ionicScrollDelegate) {
        /*$scope.categories  = [   {"_id": "1", "name": "Automobil"}, {"_id": "2", "name": "Deutsche Sehenswürdigkeiten"},{"_id": "3", "name": "Magische Orte"},{"_id": "4", "name": "Geografie & Reisen"}];
         var categories = $scope.categories;
         var log = [];

         $scope.alphabet = iterateAlphabet();

         //Sort categories list by first letter of name
         var tmp={};
         for(i=0;i<categories.length;i++){
         var letter=categories[i].name.toUpperCase().charAt(0);
         if( tmp[ letter] ==undefined){
         tmp[ letter]=[]
         }
         tmp[ letter].push( categories[i] );
         }
         $scope.sorted_categories = tmp;

         //Click letter event
         $scope.gotoList = function(id){
         $location.hash(id);
         $ionicScrollDelegate.anchorScroll();
         }

         //Create alphabet object
         function iterateAlphabet()
         {
         var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         var numbers = new Array();
         for(var i=0; i<str.length; i++)
         {
         var nextChar = str.charAt(i);
         numbers.push(nextChar);
         }
         return numbers;
         }$scope.groups = [];
         for (var i=0; i<10; i++) {
         $scope.groups[i] = {
         name: i,
         items: []
         };
         for (var j=0; j<3; j++) {
         $scope.groups[i].items.push(i + '-' + j);
         }
         }

         */
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        /*
         $scope.toggleGroup = function(group) {
         if ($scope.isGroupShown(group)) {
         $scope.shownGroup = null;
         } else {
         $scope.shownGroup = group;
         }
         };
         $scope.isGroupShown = function(group) {
         return $scope.shownGroup === group;
         };*/
        var thisSt = this;
        //Für Zustandswechsel anmelden
        $scope.$on('$stateChangeStart',
            function (event) {
                if (thisSt.searchActive == true) {
                    var saveSearchQuery = localStorage.setItem('saveQuery', JSON.stringify(thisSt.searchQuery));
                }
            });

        this.searchActive = false;
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