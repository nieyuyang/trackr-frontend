define(['angular',
    'modules/trackr/services/services',
    'modules/trackr/administration/administrationModule',
    'modules/trackr/employee/employeeModule',
    'modules/trackr/supervisor/supervisorModule',
    'angular-translate',
    'angular-translate-loader-url'],
    function(angular, services) {
        'use strict';
        var configFn = ['trackr.administration', 'trackr.employee', 'trackr.supervisor', 'pascalprecht.translate'];
        var trackr = angular.module('trackr', configFn);

        trackr.config(['$stateProvider', function($stateProvider) {
            $stateProvider.
                state('trackr', {
                    url: '/trackr',
                    resolve: {
                        employee: ['trackr.services.employee', function(EmployeeService) {
                            return EmployeeService.loadEmployee();
                        }]
                    },
                    abstract: true,
                    views: {
                        'top-menu@': {
                            templateUrl: '/src/modules/trackr/top-menu.tpl.html',
                            controller: 'base.controllers.navigation'
                        }
                    }
                }).
                state('trackr.home', {
                    url: '',
                    views: {
                        'center@': {
                            templateUrl: '/src/modules/trackr/welcome.tpl.html'
                        }
                    }
                });
        }]);

        services.init(trackr);
        return trackr;
    });