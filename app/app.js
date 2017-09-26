(function () {


    'use strict';

    angular.module('portalApp', ['ngResource', 'ui.router', 'ui.bootstrap'])

        .run(['$state', '$rootScope', function ($state, $rootScope) {

            $state.go('welcome');

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {

                console.log(toState);

            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                console.log(toState);
                console.log(fromState);

            });

        }])
        .constant('Server', {
            // WeChat: 'http://silllyfan.ngrok.cc'
            WeChat: 'http://127.0.0.1:10000'
        })
        .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);

})();