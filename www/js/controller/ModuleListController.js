'use strict';
angular.module('imageQuizz').controller('ModuleListController',
    function () {

        this.searchActive = false;

        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        }
    });