(function () {
    angular.module('portalApp')
        .config(['$stateProvider', function ($stateProvider) {


            $stateProvider
                .state('app', {
                    abstract: true,
                    name: 'index',
                    views: {}
                })
                .state('error', {
                    parent: 'app',
                    url: '/error',
                    views: {
                        'main@': {
                            templateUrl: require('./error.html'),
                        }
                    }
                })
                .state('welcome', {
                    parent: 'app',
                    url: '/welcome',
                    views: {
                        'main@': {
                            templateUrl: require('./welcome/welcome.html'),
                            controller: 'WelcomeController'
                        }
                    }
                })
        }])
})();