angular.module('imageQuizz').service('ModuleData',
    function ($http, Question) {

        this.load = function () {

            var url = 'https://www.googledrive.com/host/0B0qhk0Zibw_FWE5HS0xGWlEzeDA';
            var modules = [];
            var promise = $http.get(url);

            promise.success(function (data, status) {
                // status 200 == ok new data
                if (status == 200 && angular.isArray(data)) {
                    localStorage.setItem('modules', JSON.stringify(data));
                    return status;
                }
            }).error(function (data, status) {
                return status
            });
        };

        this.searchModules = function () {
            var modules = localStorage.getItem('modules');
            var questions = localStorage.getItem('questions');

            var temp = modules.concat(questions);
            console.log(temp);
            localStorage.setItem('questions', JSON.stringify(temp));
            console.log(localStorage.getItem('questions'));
            //return temp;
        };

        this.findAll = function () {
            var modules = localStorage.getItem('modules');
            if (!modules) {
                modules = [];
                localStorage.setItem('modules', JSON.stringify(modules));

            } else {
                modules = JSON.parse(modules);
            }
            return modules;
        };
    });