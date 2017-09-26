(function () {

    'use strict';

    angular.module('portalApp').factory('VoteService', ['$resource', 'Server', VoteService]);

    function VoteService($resource, Server) {

        return $resource(Server.WeChat + "/wechat/vote/:playerId", {}, {

            'vote': {
                method: 'POST'
            },
            'getHistory': {
                method: 'GET',
                url: Server.WeChat + "/wechat/vote/history"
            }
        });

    }
})();