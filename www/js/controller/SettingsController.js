/**
 * Der SettingsController ist zuständig für den SettingsView der App. Er kümmert sich zum Beispiel um die Abhandlung
 * der beiden Modale und ihrer Funktionen. Desweiteren kann man mit diesm Controller weitere Kategorien(Module) hinzufügen,
 * die Statistiken zurücksetzen und die Benutzerdaten über ein Firebase backend sichern.
 *
 * @author <Florian Kolb>
 * @email <florian.kolb@mni.thm.de>
 */
'use strict';
angular.module('imageQuizz').controller('SettingsController',
    function ($ionicModal, StatData, $scope, $ionicPopup, $ionicNavBarDelegate, QuestionData, ModuleData, $state) {

        $ionicNavBarDelegate.setTitle("Einstellungen");
        $scope.modules = QuestionData.findAllCategorys();

        /**
         * Die Funktion cloudDataChange fragt den Wert der Checkbox ab und bei
         * einer änderung dieses Wertes, wir die variable "sync" dementsprechend geändert.
         */
        $scope.cloudDataChange = function () {
            //$scope.cloudData.checked;

            if ($scope.cloudData.checked) {
                //localStorage.setItem('sync', JSON.stringify(1));
                $scope.idPopup();
            }
            else {
                //localStorage.setItem('sync', JSON.stringify(0));
                $scope.confirmPopup();
            }
        };

        /**
         * Die Variable cloudData legt einen festen Wert von der Checkbox entscheidung fest.
         * @type {{checked: boolean}}
         */

        if (localStorage.getItem('sync') == 1) {
            $scope.cloudData = {checked: true};
        }
        else {
            $scope.cloudData = {checked: false};
        }


        $scope.user = {ID: null};


        /**
         * Generate a specific user ID for firebase
         * @returns uID for firebase syn and backup
         */
        $scope.getUID = function () {

            return localStorage.getItem('uid');
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
            if (index == 1) {
                ModuleData.load();
                $scope.importModules = ModuleData.searchModules();
                // $scope.modules = ModuleData.searchModules();
                $scope.modal1.show()
            }
            else {
                $scope.modal2.show()
            }
            ;
        };
        /**
         * TODO: comment
         */
        $scope.import = function () {

            var modules = JSON.parse(localStorage.getItem('modules'));
            var importM = $scope.importModules;

            for (var i = 0; i < importM.length; i++) {
                if (importM[i].checked) {
                    for (var j = 0; j < modules.length; j++) {
                        if (modules[j].category == importM[i].category) {
                            QuestionData.addQuestion(modules[j]);
                        }
                    }
                }
            }
            $scope.closeModal(1);
            $state.go('tabs.home');
        };

        $scope.updateStats = function (category) {
            console.log(category);
            var localStats = localStorage.getItem('stats');
            var questionsByCat = QuestionData.findAllQuestionsByCategory(category);
            var resetM = $scope.modules;


            console.log(localStats);
            console.log(questionsByCat);
            console.log(resetM);

            if (resetM.checked) {

                for (var i = 0; i < localStats.length; i++) {
                    var id = questionsByCat.id;

                    if (id === localStats.id) {
                        localStats.actRightSeries = 0;
                    }
                }
                localStorage.setItem('stats', localStats);
            }
            $scope.closeModal(2);
        };

        $scope.idPopup = function () {
            var popupSync = $ionicPopup.show({

                template: '<input type="text" ng-model="user.ID" placeholder="{{getUID()}}">',
                title: 'Bitte geben sie eine userID ein',
                subTitle: 'Wenn sie keine besitzen einfach auf <br>weiter</br>',
                scope: $scope,
                buttons: [
                    {
                        text: 'Abbrechen',
                        onTap: function () {
                            $scope.cloudData.checked = false;
                        }
                    },

                    {
                        text: '<strong>weiter</strong>',
                        type: 'button-positive',
                        onTap: function () {
                            if (!$scope.user.ID) {
                                localStorage.setItem('sync', 1);
                                return $scope.getUID();
                            } else {
                                localStorage.setItem('uid', $scope.user.ID);
                                localStorage.setItem('sync', 1);
                                return $scope.user.ID;
                            }
                        }
                    }

                ]
            });


            $scope.confirmPopup = function () {
                var popupConfirm = $ionicPopup.show({
                    title: 'Sind sie sich wirklich sicher?',
                    subTitle: 'Ansonsten einfach nochmal Mutti fragen',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Abbrechen',
                            onTap: function () {
                                $scope.cloudData.checked = true;
                            }
                        },

                        {
                            text: '<strong>Ok</strong>',
                            type: 'button-positive',
                            onTap: function () {
                                $scope.cloudData.checked = false;
                                localStorage.setItem('sync', 0);
                            }
                        }]
                })
            }
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
            $scope.modal1.remove();
            $scope.modal2.remove();
        })
    }
);
