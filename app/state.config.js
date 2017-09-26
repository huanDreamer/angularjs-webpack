(function () {
    angular.module('portalApp')
        .config(['$stateProvider', function ($stateProvider) {


            $stateProvider
                .state('app', {
                    abstract: true,
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
                .state('vote', {
                    parent: 'app',
                    url: '/vote',
                    views: {
                        'main@': {
                            templateUrl: require('./vote/vote.html'),
                            controller: 'VoteController'
                        }
                    },
                    resolve: {
                        players: ['PlayerService', '$q', function (PlayerService, $q) {
                            let d = $q.defer();
                            PlayerService.list({}, function (response) {
                                d.resolve(response.data);
                            });
                            return d.promise;
                        }]
                    }
                })
                .state('info', {
                    parent: 'vote',
                    url: '/info/:playerId',
                    views: {
                        'main@': {
                            templateUrl: require('./info/info.html'),
                            controller: 'InfoController'
                        }
                    },
                    resolve: {
                        player: ['PlayerService', '$q', '$stateParams', function (PlayerService, $q, $stateParams) {
                            let d = $q.defer();
                            PlayerService.get({playerId: $stateParams.playerId}, function (response) {
                                d.resolve(response.data);
                            });
                            return d.promise;
                        }]
                    }
                })

        }])
})();