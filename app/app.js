(function () {


    'use strict';

    angular.module('portalApp', ['ngResource', 'ui.router', 'ui.bootstrap'])

        .run(function ($state, $rootScope) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {

            });

            $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {

            });

        })
        .constant('Server', {
            WeChat: 'http://wechat.sillyfan.top/api'
            // WeChat: 'http://localhost/api'
        })
        .config(['$qProvider', '$urlRouterProvider', '$injector', function ($qProvider, $urlRouterProvider, $injector) {
            $qProvider.errorOnUnhandledRejections(false);

            $urlRouterProvider.when("", "/welcome");

            $urlRouterProvider.otherwise(function ($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("welcome");
            });

        }]);

})();