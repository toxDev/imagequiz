angular.module('imageQuizz').service('ModuleData',
    function ($http, Question) {

        this.load = function () {

            var url = 'https://www.googledrive.com/host/0B0qhk0Zibw_FUEtTY2NaREppM00';
            var modules = [];

            var promise = $http.get(url);
            promise.success(function (data, status) {
                // status 200 == ok new data
                if (status == 200 && angular.isArray(data)) {
                    console.log(data);
                    modules = JSON.parse(data);
                    console.log(modules);
                    return status;
                }
            }).error(function (data, status) {
                return status
            });
        };

        this.findAll = function () {

            if (!modules) {
                modules = [];
                localStorage.setItem('modules', JSON.stringify(modules));

            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };
    });