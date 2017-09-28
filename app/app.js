(function () {


    'use strict';

    angular.module('portalApp', ['ngResource', 'ui.router', 'ui.bootstrap'])

        .run(['$state', '$rootScope', function ($state, $rootScope) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                var ua = window.navigator.userAgent.toLowerCase();

                alert(ua);
                
                if (ua.indexOf('micromessenger') == -1 && toState.name != 'error') {
                    event.preventDefault();
                    $state.go('error');

                }
            });

            $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) !== 'micromessenger') {
                    $state.go('error');
                }
            });

        }])
        .constant('Server', {
            WeChat: 'http://wechat.sillyfan.top/api'
            // WeChat: 'http://127.0.0.1:10000'
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