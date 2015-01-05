/**
 * Created by flo on 05.01.15.
 */
angular.module('imageQuizz', ['ionic'])
    .controller('LoadingCtrl', function ($scope, $ionicLoading) {
        $scope.show = function () {
            $ionicLoading.show({
                template: 'Loading new Categories! Please wait...'
            });
        };
        $scope.hide = function () {
            $ionicLoading.hide();
        };
    });