(function () {

    'use strict';

    angular.module('portalApp').factory('PlayerService', ['$resource', 'Server', PlayerService]);

    function PlayerService($resource, Server) {

        return $resource(Server.WeChat + "/wechat/vote/player/:playerId", {}, {

            'list': {
                method: 'GET'
            },
            'get': {
                method: 'GET'
            }

        });

    }
})();