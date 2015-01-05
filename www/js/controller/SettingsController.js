'use strict';
angular.module('imageQuizz').controller('SettingsController',
    function ($ionicModal, StatData, $scope, $ionicPopup) {
        var modules = ["Magische Orte", "Personen der Weltgeschichte"];

        this.saveData = function () {

        }
        $ionicModal.fromTemplateUrl('templates/ImportModulesModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });

        this.openModal = function () {
            $scope.modal.show();
        }
    }
);
