'use strict';
angular.module('imageQuizz').controller('StatisticController',
    function ($scope) {
        $scope.chartObject = {};
        $scope.chartObject = {"type": "PieChart"}
        $scope.chartObject.data = {
            "cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "Slices", type: "number"}
            ], "rows": [
                {
                    c: [
                        {v: "Korrekt"},
                        {v: 150}
                    ]
                },
                {
                    c: [
                        {v: "Falsch"},
                        {v: 60}
                    ]
                }
            ]
        };
        $scope.chartObject.options = {
            'title': 'Insgesamt beantwortetet Fragen'
        }
        $scope.chartObject.cssStyle = "height:400px; width:100%";

        $scope.chartObjectColumn = {};
        $scope.chartObjectColumn = {"type": "BarChart"}
        $scope.chartObjectColumn.data = {
            "cols": [
                {id: "t", label: "Topping", type: "string"},
                {id: "s", label: "gelernt", type: "number"},
                {id: "s", label: "offen", type: "number"}
            ], "rows": [
                {
                    c: [
                        {v: "Autos"},
                        {v: 1},
                        {v: 2}
                    ]
                },
                {
                    c: [
                        {v: "Deutsche Sehenswürdigkeiten"},
                        {v: 15},
                        {v: 7}
                    ]
                },
                {
                    c: [
                        {v: "Gefährliche Tiere"},
                        {v: 6},
                        {v: 3}
                    ]
                }
            ]
        };
        $scope.chartObjectColumn.options = {
            'title': 'Gespiele Fragen nach Kategorie',
            'isStacked': 'true',
            'legend': {position: 'bottom', textStyle: {color: 'black', fontSize: 16}},
            vAxis: {ticks: [5, 10, 15, 20]}

        }
        $scope.chartObjectColumn.cssStyle = "height:400px; width:100%;";

        /*
         // $routeParams.chartType == BarChart or PieChart or ColumnChart...
         $scope.chartObject.type = $routeParams.chartType;



         var chart1 = {};
         chart1.type = "ColumnChart";
         chart1.cssStyle = "height:400px; width:100%;";
         chart1.data = {"cols": [
         {id: "month", label: "Month", type: "string"},
         {id: "laptop-id", label: "Laptop", type: "number"},
         {id: "desktop-id", label: "Desktop", type: "number"},
         {id: "server-id", label: "Server", type: "number"},
         {id: "cost-id", label: "Shipping", type: "number"}
         ], "rows": [
         {c: [
         {v: "January"},
         {v: 19, f: "42 items"},
         {v: 12, f: "Ony 12 items"},
         {v: 7, f: "7 servers"},
         {v: 4}
         ]},
         {c: [
         {v: "February"},
         {v: 13},
         {v: 1, f: "1 unit (Out of stock this month)"},
         {v: 12},
         {v: 2}
         ]},
         {c: [
         {v: "March"},
         {v: 24},
         {v: 0},
         {v: 11},
         {v: 6}

         ]}
         ]};

         chart1.options = {
         "title": "Sales per month",
         "isStacked": "true",
         "fill": 20,
         "displayExactValues": true,
         "vAxis": {
         "title": "Sales unit", "gridlines": {"count": 6}
         },
         "hAxis": {
         "title": "Date"
         }
         };

         chart1.formatters = {};

         $scope.chart = chart1;*/
    }
);