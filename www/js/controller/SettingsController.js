'use strict';
angular.module('imageQuizz').controller('SettingsController',
    function ($ionicModal, StatData, $scope, $ionicPopup, QuestionData) {

        $scope.modules = QuestionData.findAllCategorys();

        //checkbox data
        $scope.cloudDataChange = function () {
            console.log('cloud service changed',
                $scope.cloudData.checked);

            if ($scope.cloudData.checked == true) {
                localStorage.setItem('sync', JSON.stringify(1));
            }
            else {
                localStorage.setItem('sync', JSON.stringify(0));
            }
        };

        //variable for checkbox decision
        $scope.cloudData = {checked: false};

        /**
         * Generate a specific user ID for firebase
         * @returns uID for firebase syn and backup
         */
        this.generateUID = function () {

            var uID = localStorage.getItem('uid');

            if (!uID) {
                var uID = Math.floor(Math.random() * 1000000);
                localStorage.setItem('uid', JSON.stringify(uID));
            }
            return uID;
        };

        //Modal View Import
        $ionicModal.fromTemplateUrl('templates/ImportModulesModal.html', {
            id: '1',
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal1 = modal;
        });

        //Modal View Delete Stats
        $ionicModal.fromTemplateUrl('templates/DeleteQuestionStatsModal.html', {
            id: '2',
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal2 = modal;
        });

        /**
         *Open a specific modal
         * @param index from the Modal which would open
         */
        $scope.openModal = function (index) {
            if (index == 1) $scope.modal1.show();
            else $scope.modal2.show();
        };
        /**
         *Close the specific modal
         * @param index from the opened Modal
         */
        $scope.closeModal = function (index) {
            if (index == 1) $scope.modal1.hide();
            else $scope.modal2.hide();
        };

        /**
         * Destroying all Modals
         */
        $scope.$on('$destroy', function () {
            console.log('Destroying modals...');
            $scope.modal1.remove();
            $scope.modal2.remove();
        })
    }
);
