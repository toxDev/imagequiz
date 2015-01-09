angular.module('imageQuizz').service('ModuleData',
    function ($http, QuestionData) {

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

        this.contains = function (arr, str) {

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == str) {
                    return true;
                }
            }
            return false;
        };

        this.searchModules = function () {

            var modules = localStorage.getItem('modules');
            if (modules == null) {
                modules = [];
            }
            var tempModules = JSON.parse(modules);

            var localCategorys = QuestionData.findAllCategorys();
            var temp = [];
            var finalModules = [];

            for (var i = 0; i < tempModules.length; i++) {
                if (temp.indexOf(tempModules[i].category) === -1) {
                    temp.push(tempModules[i].category);
                }
            }
            for (var i = 0; i < temp.length; i++) {
                if (!this.contains(localCategorys, temp[i])) {
                    finalModules.push(temp[i]);
                }
            }



            //console.log(temp);
            //console.log(localCategorys);

            /* for (var i = 0; i < temp.length; i++) {

                for (var j = 0; j < localCategorys.length; j++) {
                    //console.log("Vergleich: " + temp[i] + ' ' + localCategorys[j] +" erg " );
                    if (this.contains(temp, localCategorys[j])) {
                        console.log("break " + i);
                        //finalModules = temp.slice(i);
                        //console.log("nach vergleich: "+ temp);
                        break;
                    }
                    else {
                        console.log('gepusht');
                        finalModules.push(temp[i]);
                    }
                }
            }
             console.log(finalModules);*/
            return finalModules;
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